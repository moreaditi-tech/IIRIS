import { motion } from "framer-motion";
import { teamData } from "../data/team";

export default function Team() {
  return (
    <section id="team" className="relative w-full py-24 bg-[#020202] overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-[#00d2ff]/50"></div>
            <h2 className="text-[#00d2ff] font-mono text-sm tracking-widest uppercase">The Core</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Team
          </h3>
        </motion.div>

        {/* 4 Cards Per Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.15 }}
              className="group relative bg-[#0a0a0a] border border-white/5 p-4 md:p-5 flex flex-col interactive overflow-hidden transition-all duration-500 hover:border-[#00d2ff]/50 hover:shadow-[0_0_20px_rgba(0,210,255,0.05)]"
            >
              {/* Image Area - 60% of card roughly */}
              <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 bg-[#111]">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iNSIgZmlsbD0iIzMzMyIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SU1BR0UgVE8gQkUgQURERUQ8L3RleHQ+PC9zdmc+";
                  }}
                />
                
                {/* Thin cyan border overlay */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#00d2ff]/40 transition-colors duration-500 pointer-events-none"></div>
                
                {/* Technical Label (appears on hover) */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-md border border-[#00d2ff]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none translate-y-2 group-hover:translate-y-0">
                  <span className="font-mono text-[9px] text-[#00d2ff] tracking-widest uppercase">IIRIS MEMBER</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="relative z-10 flex flex-col flex-grow">
                <h4 className="text-xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-white transition-colors duration-300">
                  {member.name}
                </h4>
                <h5 className="text-gray-400 font-mono text-xs tracking-widest uppercase mb-3 group-hover:text-[#00d2ff] transition-colors duration-300">
                  {member.role}
                </h5>
                <p className="text-gray-600 font-mono text-[10px] tracking-wider uppercase mt-auto">
                  {member.department}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
