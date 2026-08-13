import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  const [isActivated, setIsActivated] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Subtle mouse parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 20, // max 20px movement
      y: (clientY / innerHeight - 0.5) * 20
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="home" 
      className="relative w-full h-[100svh] overflow-hidden bg-[#020202] flex flex-col md:flex-row items-center justify-between"
    >
      {/* Dark Subtle Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      {/* Moving Cyan Signal Line in Background */}
      <motion.div 
        animate={{ y: ["-100vh", "100vh"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/4 w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-[#00d2ff]/30 to-transparent z-0 pointer-events-none"
      />

      {/* Activation Pulse Effect */}
      {isActivated && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[#00d2ff] mix-blend-screen pointer-events-none z-[60]"
        />
      )}

      {/* Left Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-20 flex flex-col items-start justify-center w-full md:w-1/2 h-full p-8 md:p-16 lg:p-24 pt-32 md:pt-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 font-mono text-xs md:text-sm tracking-widest text-gray-500 uppercase flex items-center gap-3"
        >
          <div className="w-8 h-[1px] bg-[#00d2ff]/50"></div>
          PCCOE • Department of Computer Engineering
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl font-mono text-[#00d2ff] tracking-widest mb-6 uppercase"
        >
          IoT Intelligence & Robotics Innovation Society
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase leading-tight"
        >
          Where software<br/>meets hardware.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-gray-400 font-sans text-lg md:text-xl max-w-md mb-12"
        >
          Where software meets hardware, and innovation meets creativity through actual implementation.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <a href="#projects" className="group relative inline-flex items-center justify-center px-8 py-3 font-mono text-sm font-bold text-[#050505] bg-white hover:bg-[#00d2ff] transition-colors duration-300 interactive">
            EXPLORE PROJECTS <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#team" className="group relative inline-flex items-center justify-center px-8 py-3 font-mono text-sm font-bold text-white border border-white/20 hover:border-[#00d2ff] transition-colors duration-300 interactive">
            MEET THE TEAM
          </a>
        </motion.div>
      </motion.div>

      {/* Right Video / Hero Visual */}
      <div className="relative z-10 w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center overflow-hidden">
        
        {/* Soft edge fade for integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202] z-20 pointer-events-none md:bg-gradient-to-l md:from-transparent md:to-[#020202]"></div>

        <motion.div 
          animate={{ 
            x: mousePosition.x, 
            y: mousePosition.y 
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="relative w-full h-[90%] md:h-[95%] cursor-pointer group interactive flex items-center justify-center overflow-hidden rounded-lg"
          onClick={() => {
            setIsActivated(true);
            setTimeout(() => setIsActivated(false), 2000);
          }}
        >
          {/* Subtle Glow Behind Video */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full blur-[100px] transition-all duration-700 pointer-events-none z-0 ${isActivated ? 'bg-[#00d2ff]/40' : 'bg-[#00d2ff]/10'}`}></div>

          <video
            src="/videos/ROBOT.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`absolute top-0 left-0 w-full h-[115%] object-cover object-top z-10 transition-all duration-700 ${isActivated ? 'brightness-125' : 'brightness-90 group-hover:brightness-100'}`}
            poster="/images/LOGO_transparent.png" // Fallback poster
          />

          {/* Hover interaction overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
            <div className="bg-black/60 backdrop-blur-md border border-[#00d2ff]/50 px-6 py-2 rounded-full text-[#00d2ff] font-mono text-sm tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(0,210,255,0.2)]">
              IIRIS ROBOTICS CORE
            </div>
          </div>

          {/* Minimal Status Indicators */}
          <div className="absolute bottom-8 right-8 z-30 flex flex-col items-end pointer-events-none">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${isActivated ? 'bg-[#00d2ff] animate-pulse shadow-[0_0_10px_#00d2ff]' : 'bg-gray-500'}`}></div>
              <span className={`font-mono text-[10px] tracking-widest uppercase ${isActivated ? 'text-[#00d2ff]' : 'text-gray-500'}`}>
                {isActivated ? "SYSTEM ONLINE" : "STANDBY"}
              </span>
            </div>
            <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">IoT CORE</div>
            <div className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">SENSOR LINK</div>
          </div>
          
          {/* Thin animated line connecting to robot */}
          <motion.div 
            className="absolute top-1/4 right-0 w-32 h-[1px] bg-gradient-to-r from-transparent to-[#00d2ff]/50 z-30 pointer-events-none hidden md:block"
            animate={{ width: isActivated ? ["0px", "200px"] : "100px", opacity: isActivated ? [0, 1, 0] : 0.5 }}
            transition={{ duration: 1.5, repeat: isActivated ? Infinity : 0 }}
          />
        </motion.div>
      </div>

    </section>
  );
}
