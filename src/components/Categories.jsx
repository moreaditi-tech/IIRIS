import { motion } from "framer-motion";

const categories = [
  "ROBOTICS",
  "IoT SYSTEMS",
  "AUTOMATION",
  "AI + IoT",
  "EMBEDDED SYSTEMS"
];

export default function Categories() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#050505] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-[10px] font-mono text-[#00d2ff] tracking-[0.3em] uppercase mb-4">Focus Areas</h2>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase">What we build</h3>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="px-6 py-4 md:px-10 md:py-6 bg-[#0a0a0a] border border-white/5 hover:border-[#00d2ff]/30 rounded flex items-center justify-center group interactive transition-colors duration-300"
            >
              <span className="font-mono text-sm md:text-base font-bold text-gray-400 group-hover:text-white tracking-widest uppercase transition-colors">
                {cat}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
