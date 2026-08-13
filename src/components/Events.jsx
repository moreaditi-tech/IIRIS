import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { events } from "../data/events";

export default function Events() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    <section id="events" className="py-24 relative overflow-hidden bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase mb-4">Events</h2>
            <div className="w-16 h-[2px] bg-[#00d2ff]"></div>
          </motion.div>
          
          <div className="hidden md:flex gap-2">
            <button 
              onClick={() => scroll("left")} 
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors interactive ${canScrollLeft ? 'border-white/30 text-white hover:border-[#00d2ff] hover:text-[#00d2ff]' : 'border-white/10 text-white/20 cursor-not-allowed'}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll("right")} 
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors interactive ${canScrollRight ? 'border-white/30 text-white hover:border-[#00d2ff] hover:text-[#00d2ff]' : 'border-white/10 text-white/20 cursor-not-allowed'}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Timeline */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-6 pb-12 pt-4 hide-scrollbar snap-x snap-mandatory"
        >
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: Math.min(idx * 0.1, 0.4) }}
              className="snap-center shrink-0 w-[85vw] md:w-[350px] group flex flex-col h-full relative"
            >
              {/* Timeline Connector */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 z-0"></div>
              <div className="absolute top-[-4px] left-4 w-[9px] h-[9px] rounded-full bg-[#050505] border-2 border-[#00d2ff] z-10 group-hover:bg-[#00d2ff] group-hover:shadow-[0_0_10px_#00d2ff] transition-all"></div>
              
              <div className="mt-8 bg-[#111] border border-white/5 rounded-lg overflow-hidden flex flex-col flex-grow hover:border-[#00d2ff]/30 transition-colors duration-300">
                <div className="h-48 relative overflow-hidden bg-black">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-[10px] font-mono text-[#00d2ff] mb-2 tracking-widest uppercase">
                    EVENT 0{event.id}
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase">{event.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
