import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Events", href: "#events" },
    { name: "Achievements", href: "#achievements" },
    { name: "Team", href: "#team" },
    { name: "Upcoming Events", href: "#upcoming-events" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#050505]/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          
          <a href="#home" className="flex items-center gap-2 interactive group hover:opacity-80 transition-opacity">
            <div className="relative rounded-lg p-1 group-hover:shadow-[0_0_15px_#00d2ff] transition-shadow duration-500 border border-transparent group-hover:border-[#00d2ff]/30">
              <img src="/images/LOGO_transparent.png" alt="IIRIS Logo" className="h-8 md:h-10 object-contain drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]" />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs font-mono font-medium text-gray-400 hover:text-white uppercase tracking-widest transition-colors interactive relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#00d2ff] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <a 
              href="#footer"
              className="px-6 py-2 border border-white/20 text-xs font-mono font-bold text-white hover:bg-white hover:text-black hover:border-white transition-all interactive uppercase tracking-widest"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white interactive"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-black text-xl tracking-tighter text-white">IIRIS</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white"
                aria-label="Close mobile menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-white uppercase"
                >
                  {link.name}
                </a>
              ))}
              <div className="w-12 h-[2px] bg-[#00d2ff] my-4"></div>
              <a 
                href="#footer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-[#00d2ff] uppercase"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
