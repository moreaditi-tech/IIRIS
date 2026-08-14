import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html, Clone } from "@react-three/drei";
import * as THREE from "three";

export default function DroneModel({ scale = 1, isMobile = false, onActivate }) {
  const group = useRef();
  const droneMesh = useRef();
  const scanCone = useRef();
  const particlesRef = useRef();
  
  const { nodes, materials } = useGLTF("/models/Drone.glb");
  const { pointer, clock, viewport } = useThree();
  
  const [isActivated, setIsActivated] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  // Animation state refs to avoid rerenders
  const targetRotation = useRef(new THREE.Vector2(0, 0));
  const activationTime = useRef(0);
  
  // Create trajectory curve (SENSE -> CONNECT -> PROCESS -> ACT)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 0, 1),
      new THREE.Vector3(-1.5, 1.5, -1),
      new THREE.Vector3(1, 2, -1.5),
      new THREE.Vector3(2, -0.5, 0),
      new THREE.Vector3(1, -1.5, 1.5),
      new THREE.Vector3(-1, -1, 2),
      new THREE.Vector3(-2, 0, 1), // loop
    ], true, 'chordal', 0.5);
  }, []);

  // Create particles for the trajectory
  const particleCount = isMobile ? 30 : 60;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({ t: i / particleCount, speed: 0.1 + Math.random() * 0.1 });
    }
    return temp;
  }, [particleCount, isMobile]);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
    return () => { document.body.style.cursor = 'auto'; };
  }, [hovered]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isActivated) {
      setIsActivated(true);
      if (onActivate) onActivate();
      activationTime.current = clock.elapsedTime;
      // Reset after 2 seconds
      setTimeout(() => setIsActivated(false), 2000);
    }
  };

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // 1. Cursor Tracking (damped)
    // Map pointer (-1 to 1) to rotation angles
    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, (pointer.x * Math.PI) / 6, 0.05);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, (pointer.y * Math.PI) / 8, 0.05);

    if (group.current) {
      // Base rotation from pointer
      group.current.rotation.y = targetRotation.current.x;
      group.current.rotation.x = -targetRotation.current.y;
      
      // Base positional shift from pointer
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * 0.5, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, pointer.y * 0.5, 0.05);
    }

    // 2. Drone Idle Hovering (only when not fully activated)
    let floatOffset = 0;
    if (!isActivated) {
      floatOffset = Math.sin(t * 1.5) * 0.15;
    } else {
      // When activated, quickly dampen the float
      floatOffset = THREE.MathUtils.lerp(floatOffset, 0, 0.1);
    }

    if (droneMesh.current) {
      droneMesh.current.position.y = floatOffset;
      // Slight tilt while floating
      droneMesh.current.rotation.z = Math.sin(t * 1.2) * 0.02;
    }

    // 3. Sensor Scan Effect
    if (scanCone.current) {
      // Pulse alpha
      const scanAlpha = isActivated ? 0.8 : 0.2 + Math.sin(t * 4) * 0.1;
      scanCone.current.material.opacity = scanAlpha;
      
      // Scan movement based on cursor but slightly delayed
      scanCone.current.position.x = Math.sin(t * 2) * 0.05;
      scanCone.current.position.z = Math.cos(t * 2) * 0.05;
    }

    // 4. Data Trajectory Particles
    if (particlesRef.current) {
      particles.forEach((p, i) => {
        // Update position along curve
        let currentSpeed = p.speed;
        if (isActivated) currentSpeed *= 3; // Speed up when activated
        
        p.t += delta * currentSpeed;
        if (p.t > 1) p.t = 0;
        
        const pos = curve.getPointAt(p.t);
        dummy.position.copy(pos);
        
        // Scale based on activation
        const s = isActivated ? 1.5 : 1.0;
        dummy.scale.set(s, s, s);
        
        dummy.updateMatrix();
        particlesRef.current.setMatrixAt(i, dummy.matrix);
      });
      particlesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Extract the main scene/mesh from the GLTF
  // Using nodes.Scene or nodes.OSG_Scene depending on the exact GLTF structure
  const modelRoot = nodes.Scene || nodes.OSG_Scene || Object.values(nodes)[0];

  return (
    <group 
      ref={group} 
      scale={scale}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      <group ref={droneMesh}>
        {/* Actual GLB Model */}
        <Clone object={modelRoot} />

        {/* Sensor Scan Cone (placed relative to drone) */}
        <mesh ref={scanCone} position={[0, -0.5, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.5, 3, 32, 1, true]} />
          <meshBasicMaterial 
            color="#00d2ff" 
            transparent={true} 
            opacity={0.2} 
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
          {/* Faint grid overlay for scan effect */}
          <meshBasicMaterial 
            color="#ffffff" 
            transparent={true} 
            opacity={0.05} 
            wireframe={true}
          />
        </mesh>
        
        {/* Activation Cyan Pulse Inside Drone */}
        {isActivated && (
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial 
              color="#00d2ff" 
              transparent={true} 
              opacity={0.3} 
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}
      </group>

      {/* Thin Cyan Data Trajectory Tube */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.01, 8, true]} />
        <meshBasicMaterial color="#00d2ff" transparent opacity={isActivated ? 0.8 : 0.3} />
      </mesh>

      {/* Trajectory Particles */}
      <instancedMesh ref={particlesRef} args={[null, null, particleCount]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ffffff" />
      </instancedMesh>

      {/* Activation HUD */}
      {isActivated && (
        <Html position={[1, 1, 0]} center zIndexRange={[100, 0]}>
          <div className="flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-2 mb-2 bg-black/60 px-4 py-2 rounded border border-[#00d2ff]/40 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse"></div>
              <span className="font-mono text-xs text-[#00d2ff] uppercase tracking-widest whitespace-nowrap">System Online</span>
            </div>
            <div className="bg-black/60 px-4 py-2 rounded border border-white/10 backdrop-blur-md">
              <div className="font-mono text-[10px] text-gray-300 uppercase tracking-widest whitespace-nowrap">IIRIS Core</div>
              <div className="font-mono text-[10px] text-green-400 uppercase tracking-widest whitespace-nowrap mt-1">Sensor Link Active</div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload("/models/Drone.glb");
