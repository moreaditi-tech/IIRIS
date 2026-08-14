import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import ErrorBoundary from "./ErrorBoundary";
import ModelErrorBoundary from "./ModelErrorBoundary";
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
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance" }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
        >
          {/* Local lighting to replace external HDR */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#00d2ff" />
          <pointLight position={[0, -2, 2]} intensity={2} color="#00d2ff" distance={10} />
          <pointLight position={[0, 2, -2]} intensity={1} color="#ffffff" distance={10} />

        <ModelErrorBoundary>
          <Suspense fallback={null}>
            {/* Adjust scale and position based on mobile vs desktop */}
            <group position={isMobile ? [0, -1, 0] : [2, -0.5, 0]}>
              <DroneModel scale={isMobile ? 0.6 : 1.2} isMobile={isMobile} />
            </group>
          </Suspense>
        </ModelErrorBoundary>
        </Canvas>
      </ErrorBoundary>
      
      {/* Loading indicator that will be hidden when model loads (handled by Suspense if needed, but a simple overlay works too) */}
    </div>
  );
}
