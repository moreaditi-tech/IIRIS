import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ErrorBoundary from "./ErrorBoundary";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import DroneModel from "./DroneModel";

const REGISTRATION_LINK = "#";

export default function CallToAction() {
  return (
    <section id="join" className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#020202] border-t border-white/5">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-80 cursor-pointer">
        <ErrorBoundary>
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }} gl={{ powerPreference: "high-performance" }} dpr={[1, 2]}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00d2ff" />
            <directionalLight position={[-10, 10, -5]} intensity={1.5} color="#ffffff" />
            <pointLight position={[0, -2, 2]} intensity={2} color="#00d2ff" distance={10} />
            <pointLight position={[0, 2, -2]} intensity={1} color="#ffffff" distance={10} />
          
          <Suspense fallback={null}>
            <group position={[0, -1, 0]}>
              <DroneModel scale={1.2} />
            </group>
          </Suspense>
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
          />
          </Canvas>
        </ErrorBoundary>
      </div>



    </section>
  );
}
