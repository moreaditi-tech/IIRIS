import { motion } from "framer-motion";

const guidanceData = [
  {
    name: "Dr. Sonali Patil",
    role: "HOD",
    department: "Department of Computer Engineering",
    image: "/images/hod.jpg",
  },
  {
    name: "Dr. Smita Khairnar",
    role: "IIRIS Club Coordinator",
    department: "Department of Computer Engineering",
    image: "/images/coordinator.jpg",
  }
];

export default function Leadership() {
  return (
    <section id="guidance" className="relative w-full py-24 bg-[#050505] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-[#00d2ff]/50"></div>
            <h2 className="text-[#00d2ff] font-mono text-sm tracking-widest uppercase">Institutional Support</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Guidance
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {guidanceData.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-[#0a0a0a] border border-white/10 p-6 flex flex-col interactive overflow-hidden transition-all duration-500 hover:border-[#00d2ff]/50"
            >
              {/* Subtle hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#00d2ff]/0 to-[#00d2ff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Data line animation on hover */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#00d2ff] group-hover:w-full transition-all duration-700 ease-out z-10 pointer-events-none"></div>
              
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-[#111]">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iNSIgZmlsbD0iIzMzMyIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SU1BR0UgVE8gQkUgQURERUQ8L3RleHQ+PC9zdmc+";
                  }}
                />
                
                {/* Thin cyan border appears on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#00d2ff]/30 transition-colors duration-500 pointer-events-none"></div>
              </div>

              <div className="relative z-10 flex flex-col flex-grow">
                <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-[#00d2ff] transition-colors duration-300">
                  {member.name}
                </h4>
                <h5 className="text-[#00d2ff] font-mono text-sm tracking-widest uppercase mb-4">
                  {member.role}
                </h5>
                <p className="text-gray-500 font-mono text-xs tracking-wider uppercase mt-auto">
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
