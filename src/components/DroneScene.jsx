import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import DroneModel from "./DroneModel";

export default function DroneScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-transparent pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance" }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00d2ff" />
        
        {/* Adds natural reflections to the model */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          {/* Adjust scale and position based on mobile vs desktop */}
          <group position={isMobile ? [0, -1, 0] : [2, -0.5, 0]}>
            <DroneModel scale={isMobile ? 0.6 : 1.2} isMobile={isMobile} />
          </group>
        </Suspense>
      </Canvas>
      
      {/* Loading indicator that will be hidden when model loads (handled by Suspense if needed, but a simple overlay works too) */}
    </div>
  );
}
