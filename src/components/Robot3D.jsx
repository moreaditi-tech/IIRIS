import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Trail } from "@react-three/drei";
import * as THREE from "three";

export default function Robot3D({ isActivated, setIsActivated }) {
  const baseRef = useRef();
  const lowerArmRef = useRef();
  const upperArmRef = useRef();
  const wristRef = useRef();
  const targetChipRef = useRef();
  
  const { mouse, viewport } = useThree();
  const [hovered, setHovered] = useState(false);
  
  const animState = useRef({ startTime: 0 });

  useEffect(() => {
    if (isActivated) {
      animState.current.startTime = performance.now() / 1000;
    }
  }, [isActivated]);

  const darkMetal = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1a1a1a", metalness: 0.8, roughness: 0.2 }), []);
  const lightMetal = useMemo(() => new THREE.MeshStandardMaterial({ color: "#333333", metalness: 0.9, roughness: 0.4 }), []);
  const accentColor = isActivated ? "#00d2ff" : "#003333";
  const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: isActivated ? 1.5 : 0.2 }), [isActivated, accentColor]);
  const chipMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: (hovered || isActivated) ? "#00d2ff" : "#113344", emissive: "#00d2ff", emissiveIntensity: isActivated ? 2 : hovered ? 1 : 0.2 }), [isActivated, hovered]);

  useFrame((state) => {
    let targetYaw, targetLowerPitch, targetUpperPitch;
    const t = (performance.now() / 1000) - animState.current.startTime;

    if (!isActivated) {
      const targetX = (mouse.x * viewport.width) / 8;
      const targetY = (mouse.y * viewport.height) / 8 + 1;
      targetYaw = targetX * 0.5;
      targetLowerPitch = THREE.MathUtils.clamp(targetY * -0.2 + 0.5, -0.5, 1.0);
      targetUpperPitch = THREE.MathUtils.clamp(targetY * -0.2 - 0.5, -1.5, 0.5);
      
      if (targetChipRef.current) {
        targetChipRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime) * 0.1;
        targetChipRef.current.position.x = 2 + Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
        targetChipRef.current.position.z = 2;
        targetChipRef.current.rotation.y += state.delta * 0.5;
        targetChipRef.current.rotation.x += state.delta * 0.2;
      }
    } else {
      if (t < 1.5) {
        targetYaw = -Math.PI / 4; 
        targetLowerPitch = 0.6;
        targetUpperPitch = -0.3;
      } else if (t < 3.5) {
        targetYaw = Math.PI / 3;
        targetLowerPitch = -0.2;
        targetUpperPitch = -0.5;
        
        if (targetChipRef.current && wristRef.current) {
          const wristWorld = new THREE.Vector3();
          wristRef.current.getWorldPosition(wristWorld);
          targetChipRef.current.position.copy(wristWorld);
          targetChipRef.current.position.y -= 0.1; 
        }
      } else {
        targetYaw = Math.PI / 4;
        targetLowerPitch = 0.5;
        targetUpperPitch = -1.0;
        
        if (targetChipRef.current) {
          targetChipRef.current.position.set(-2.5, 0.35, 0);
          targetChipRef.current.rotation.set(0, 0, 0);
        }
      }
    }

    if (baseRef.current && lowerArmRef.current && upperArmRef.current && wristRef.current) {
      baseRef.current.rotation.y = THREE.MathUtils.damp(baseRef.current.rotation.y, targetYaw, 3, state.delta);
      lowerArmRef.current.rotation.x = THREE.MathUtils.damp(lowerArmRef.current.rotation.x, targetLowerPitch, 3, state.delta);
      upperArmRef.current.rotation.x = THREE.MathUtils.damp(upperArmRef.current.rotation.x, targetUpperPitch, 3, state.delta);
      wristRef.current.rotation.x = THREE.MathUtils.damp(wristRef.current.rotation.x, -targetLowerPitch - targetUpperPitch, 3, state.delta);
    }
  });

  return (
    <group position={[0, -2, 0]}>
      <mesh material={darkMetal} position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.2, 1.5, 0.5, 32]} />
      </mesh>
      
      <group ref={baseRef} position={[0, 0.5, 0]}>
        <mesh material={lightMetal} position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.8, 1.0, 0.4, 32]} />
        </mesh>
        
        <mesh material={darkMetal} position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
        </mesh>
        <mesh material={accentMaterial} position={[0, 0.8, 0.65]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        </mesh>
        <mesh material={accentMaterial} position={[0, 0.8, -0.65]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
        </mesh>

        <group ref={lowerArmRef} position={[0, 0.8, 0]}>
          <mesh material={lightMetal} position={[0, 1.5, 0]}>
            <boxGeometry args={[0.6, 3, 0.6]} />
          </mesh>

          <mesh material={darkMetal} position={[0, 3.2, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.4, 1.0, 32]} />
          </mesh>
          <mesh material={accentMaterial} position={[0, 3.2, 0.55]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          </mesh>
          <mesh material={accentMaterial} position={[0, 3.2, -0.55]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          </mesh>

          <group ref={upperArmRef} position={[0, 3.2, 0]}>
            <mesh material={lightMetal} position={[0, 1.2, 0]}>
              <boxGeometry args={[0.4, 2.4, 0.4]} />
            </mesh>

            <group ref={wristRef} position={[0, 2.6, 0]}>
              <mesh material={darkMetal} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 0.8, 32]} />
              </mesh>
              
              <mesh material={lightMetal} position={[0, 0.4, 0]}>
                <boxGeometry args={[0.6, 0.2, 0.6]} />
              </mesh>
              <mesh material={darkMetal} position={[-0.2, 0.7, 0]}>
                <boxGeometry args={[0.1, 0.6, 0.2]} />
              </mesh>
              <mesh material={darkMetal} position={[0.2, 0.7, 0]}>
                <boxGeometry args={[0.1, 0.6, 0.2]} />
              </mesh>
              
              <group position={[0, 0.5, 0]}>
                <Trail 
                  width={isActivated ? 8 : 2} 
                  color={accentColor} 
                  length={15} 
                  decay={2} 
                  local={false}
                >
                  <mesh>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color={accentColor} />
                  </mesh>
                </Trail>
              </group>
            </group>
          </group>
        </group>
      </group>

      <mesh 
        ref={targetChipRef}
        position={[2, 1.5, 2]} 
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isActivated) setIsActivated(true);
        }}
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        <mesh>
          <boxGeometry args={[0.42, 0.1, 0.42]} />
          <primitive object={chipMaterial} attach="material" />
        </mesh>
      </mesh>
      
      <group position={[-2.5, 0.2, 0]}>
        <mesh material={darkMetal}>
           <cylinderGeometry args={[0.6, 0.7, 0.4, 32]} />
        </mesh>
        <mesh material={accentMaterial} position={[0, 0.15, 0]}>
           <boxGeometry args={[0.45, 0.05, 0.45]} />
        </mesh>
      </group>

      <ContactShadows position={[0, 0, 0]} opacity={0.7} scale={15} blur={2} far={4} color="#000000" />
    </group>
  );
}
