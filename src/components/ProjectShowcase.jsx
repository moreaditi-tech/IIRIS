import { motion } from "framer-motion";
import { ArrowRight, Bot, Cpu, Wifi, Brain, Shield } from "lucide-react";

const showcaseCategories = [
  { id: 1, title: "ROBOTICS", desc: "Interactive robotic systems and automation.", icon: <Bot className="w-8 h-8" /> },
  { id: 2, title: "SMART SYSTEMS", desc: "Connected devices and intelligent environments.", icon: <Wifi className="w-8 h-8" /> },
  { id: 3, title: "EMBEDDED SYSTEMS", desc: "Microcontrollers, sensors and hardware.", icon: <Cpu className="w-8 h-8" /> },
  { id: 4, title: "AI + IoT", desc: "Intelligent systems combining AI with connected devices.", icon: <Brain className="w-8 h-8" /> },
  { id: 5, title: "AUTOMATION", desc: "Systems that sense, decide and act automatically.", icon: <Shield className="w-8 h-8" /> }
];

export default function ProjectShowcase() {
  return (
    <section className="py-24 relative overflow-hidden bg-surface border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono neon-text uppercase">What We Build</h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        <div className="flex overflow-x-auto gap-6 pb-12 hide-scrollbar snap-x snap-mandatory">
          {showcaseCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="snap-center shrink-0 w-[300px] md:w-[400px] group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <div className="glass-panel p-8 rounded-2xl h-[400px] flex flex-col border border-white/5 group-hover:border-primary/50 transition-colors duration-500 relative z-10">
                <div className="mb-8 w-16 h-16 rounded-full bg-surface border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300">
                  {cat.icon}
                </div>
                
                <h3 className="text-2xl font-bold font-mono text-white mb-4 uppercase">{cat.title}</h3>
                <p className="text-gray-400 flex-grow">{cat.desc}</p>
                
                <a href="#projects" className="interactive mt-8 flex items-center text-primary font-mono text-sm uppercase font-bold tracking-widest hover:text-white transition-colors">
                  EXPLORE <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
