import { motion } from "framer-motion";

export default function Leadership() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase mb-4">Our Guidance</h2>
          <div className="w-16 h-[2px] bg-[#00d2ff] mx-auto md:mx-0"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 justify-center md:justify-start">
          {/* HOD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 bg-[#0a0a0a] p-6 rounded-lg border border-white/5 flex-1"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border border-[#00d2ff]/30">
              <img 
                src="/images/hod.jpg" 
                alt="HOD" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#00d2ff] mb-1 tracking-widest uppercase">HEAD OF DEPARTMENT</div>
              <h3 className="text-xl font-bold text-white mb-1">[NAME TO BE ADDED]</h3>
              <p className="text-gray-400 text-xs font-mono">Computer Engineering, PCCOE</p>
            </div>
          </motion.div>

          {/* Coordinator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 bg-[#0a0a0a] p-6 rounded-lg border border-white/5 flex-1"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 border border-[#00d2ff]/30">
              <img 
                src="/images/coordinator.jpg" 
                alt="Dr. Smita Kahirnar" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div>
              <div className="text-[10px] font-mono text-[#00d2ff] mb-1 tracking-widest uppercase">CLUB COORDINATOR</div>
              <h3 className="text-xl font-bold text-white mb-1">Dr. Smita Kahirnar</h3>
              <p className="text-gray-400 text-xs font-mono">IIRIS IoT Club</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
