import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import ImageModal from "./ImageModal";
import { achievements } from "../data/achievements";

export default function Achievements() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase mb-4">Achievements</h2>
            <div className="w-16 h-[2px] bg-[#00d2ff]"></div>
          </motion.div>
          
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scroll("left")} 
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors interactive ${canScrollLeft ? 'border-white/30 text-white hover:border-[#00d2ff] hover:text-[#00d2ff]' : 'border-white/10 text-white/20 cursor-not-allowed'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll("right")} 
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors interactive ${canScrollRight ? 'border-white/30 text-white hover:border-[#00d2ff] hover:text-[#00d2ff]' : 'border-white/10 text-white/20 cursor-not-allowed'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Showcase */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-8 pb-8 hide-scrollbar snap-x snap-mandatory"
        >
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: Math.min(idx * 0.1, 0.4) }}
              className="snap-center shrink-0 w-[85vw] md:w-[600px] bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row items-center rounded-lg overflow-hidden group hover:border-[#00d2ff]/30 transition-all duration-300"
            >
              <div 
                className="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden bg-black shrink-0 cursor-pointer"
                onClick={() => setSelectedImage(achievement.image)}
              >
                <img 
                  src={achievement.image} 
                  alt={achievement.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover opacity-100 transition-opacity duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6 md:p-8 flex flex-col justify-center flex-grow w-full relative">
                {/* Subtle robotic arm pointer animation on hover */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#00d2ff]/20 pointer-events-none hidden md:block">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </div>
                
                <div className="text-[10px] font-mono text-[#00d2ff] mb-2 tracking-widest uppercase flex items-center">
                  <Trophy className="w-3 h-3 mr-2" /> {achievement.id} // HIGHLIGHT
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 uppercase">{achievement.title}</h3>
                <h4 className="text-sm font-bold text-gray-300 mb-4">{achievement.recipient}</h4>
                
                <p className="text-sm text-gray-400 font-sans mb-2">{achievement.details}</p>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider bg-white/5 p-2 rounded inline-block self-start mt-auto">
                  {achievement.event}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
    </section>
  );
}
