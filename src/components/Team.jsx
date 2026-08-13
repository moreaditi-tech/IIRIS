import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { team } from "../data/team";

const filters = [
  "ALL",
  "LEADERSHIP",
  "PROJECTS",
  "DESIGN",
  "RESEARCH",
  "MARKETING",
  "MANAGEMENT",
  "DEVELOPMENT"
];

export default function Team() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredTeam = activeFilter === "ALL" 
    ? team 
    : team.filter(member => member.category === activeFilter);

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase mb-4">Team</h2>
            <div className="w-16 h-[2px] bg-[#00d2ff]"></div>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 rounded interactive border ${
                  activeFilter === filter 
                    ? "bg-[#00d2ff] text-black border-[#00d2ff]" 
                    : "bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/30"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredTeam.map((member) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={member.id}
                className="bg-[#050505] border border-white/5 hover:border-[#00d2ff]/50 rounded-lg p-4 flex items-center gap-4 group transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                {/* Thin cyan line animation on hover */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="w-12 h-12 rounded overflow-hidden shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300 bg-[#111] flex items-center justify-center">
                  {/* Real Image Slot */}
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  {/* Fallback */}
                  <div className="w-full h-full bg-[#111] text-[#00d2ff] text-[8px] font-mono flex items-center justify-center text-center p-1" style={{display: member.image ? 'none' : 'flex'}}>
                    PHOTO
                  </div>
                </div>
                
                <div className="flex flex-col flex-grow">
                  <h4 className="text-white font-bold text-sm truncate">{member.name}</h4>
                  <p className="text-[#00d2ff] font-mono text-[10px] uppercase tracking-wider mt-0.5">{member.position}</p>
                  
                  {/* Hover expansion data */}
                  <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 mt-1">
                    <p className="text-gray-500 font-mono text-[9px] uppercase tracking-wider">{member.department}</p>
                    <p className="text-gray-500 font-mono text-[9px] uppercase tracking-wider">{member.division}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
