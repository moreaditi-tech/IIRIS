import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Mail, MapPin, Terminal } from "lucide-react";

const REGISTRATION_LINK = "#"; 

export default function CallToAction() {
  const [isActivated, setIsActivated] = useState(false);
  const [terminalText, setTerminalText] = useState("AWAITING CONNECTION...");

  const handleConnect = () => {
    setIsActivated(true);
    setTerminalText("INITIALIZING SECURE HANDSHAKE...");
    setTimeout(() => setTerminalText("ESTABLISHING IoT LINK..."), 800);
    setTimeout(() => setTerminalText("SYSTEM ONLINE. READY TO TRANSMIT."), 1600);
  };

  return (
    <section id="join" className="relative w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#020202] border-t border-white/5 py-24">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      
      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[120px] transition-all duration-1000 z-0 pointer-events-none ${isActivated ? 'bg-[#00d2ff]/10' : 'bg-[#00d2ff]/5'}`}></div>

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
          
          {/* Left Side: Terminal / Contact Info */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-[10px] font-mono text-[#00d2ff] tracking-[0.3em] uppercase mb-4">Transmission Core</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6 leading-tight">
                Connect.<br/>Innovate.<br/>Build.
              </h3>
              <p className="text-gray-400 font-sans text-lg">
                Join the most active hardware and software club at PCCOE. Let's build the future together.
              </p>
            </motion.div>

            {/* Interactive Terminal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`border transition-all duration-500 rounded-lg overflow-hidden bg-[#0a0a0a] ${isActivated ? 'border-[#00d2ff]/50 shadow-[0_0_30px_rgba(0,210,255,0.1)]' : 'border-white/10'}`}
            >
              <div className="bg-[#111] px-4 py-2 flex items-center border-b border-white/5">
                <Terminal className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">IIRIS.SECURE.COMMS</span>
                <div className="ml-auto flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isActivated ? 'bg-green-500' : 'bg-green-500/20'}`}></div>
                </div>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#00d2ff]">{'>'}</span>
                  <span className={`transition-colors duration-500 ${isActivated ? 'text-white' : 'text-gray-500'} animate-pulse`}>
                    {terminalText}
                  </span>
                </div>
                
                <AnimatePresence>
                  {isActivated && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.5, delay: 1.6 }}
                      className="flex flex-col gap-4 mt-6 border-t border-white/5 pt-6"
                    >
                      <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors interactive group">
                        <Mail className="w-5 h-5 text-[#00d2ff] group-hover:scale-110 transition-transform" />
                        <span className="tracking-wider">contact@iiris-pccoe.org</span>
                      </a>
                      <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors interactive group">
                        <MapPin className="w-5 h-5 text-[#00d2ff] group-hover:scale-110 transition-transform" />
                        <span className="tracking-wider">PCCOE, Nigdi, Pune</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          
          {/* Right Side: Visual CTA */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md aspect-square flex items-center justify-center"
            >
              {/* Animated Rings */}
              <div className={`absolute inset-0 border rounded-full transition-all duration-1000 ${isActivated ? 'border-[#00d2ff]/30 scale-100 animate-[spin_10s_linear_infinite]' : 'border-white/5 scale-90'}`}></div>
              <div className={`absolute inset-4 border rounded-full transition-all duration-1000 delay-100 ${isActivated ? 'border-[#00d2ff]/20 scale-100 animate-[spin_15s_linear_infinite_reverse]' : 'border-white/5 scale-90'}`}></div>
              <div className={`absolute inset-8 border border-dashed rounded-full transition-all duration-1000 delay-200 ${isActivated ? 'border-[#00d2ff]/10 scale-100 animate-[spin_20s_linear_infinite]' : 'border-white/5 scale-90'}`}></div>
              
              {/* Center Connection Node */}
              {!isActivated ? (
                <button 
                  onClick={handleConnect}
                  className="relative z-10 w-32 h-32 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center hover:border-[#00d2ff] hover:shadow-[0_0_30px_rgba(0,210,255,0.2)] transition-all duration-300 group interactive"
                >
                  <span className="font-mono text-[10px] text-white tracking-[0.2em] group-hover:text-[#00d2ff] transition-colors">INITIATE</span>
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <img src="/images/LOGO_transparent.png" alt="IIRIS Logo" className="h-12 object-contain mb-6 drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]" />
                  
                  <a
                    href={REGISTRATION_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center px-8 py-3 font-mono text-sm font-bold text-[#050505] bg-[#00d2ff] hover:bg-white transition-all duration-300 interactive shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
                  >
                    JOIN IIRIS <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
