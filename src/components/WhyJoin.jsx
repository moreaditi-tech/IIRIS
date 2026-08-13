import { motion } from "framer-motion";
import { BookOpen, Wrench, Users, Lightbulb, ChevronRight } from "lucide-react";

const reasons = [
  { icon: <BookOpen className="w-8 h-8" />, title: "LEARN", desc: "Explore IoT, embedded systems and robotics." },
  { icon: <Wrench className="w-8 h-8" />, title: "BUILD", desc: "Create real hardware projects." },
  { icon: <Users className="w-8 h-8" />, title: "COLLABORATE", desc: "Work with students from different domains." },
  { icon: <Lightbulb className="w-8 h-8" />, title: "INNOVATE", desc: "Turn ideas into working solutions." }
];

export default function WhyJoin() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/3">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6 leading-none"
            >
              Don't just <span className="text-gray-500">use</span> technology.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 neon-text">Build it.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-mono mb-8"
            >
              For SY students ready to take the leap from theory to practice. Join the IIRIS IoT Club and shape the future of connected devices.
            </motion.p>
            
            <motion.a
              href="#join"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-background bg-primary hover:bg-white transition-colors duration-300 group interactive"
            >
              JOIN IIRIS <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-xl hover:border-primary/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                <div className="mb-6 text-primary">{reason.icon}</div>
                <h3 className="text-2xl font-bold font-mono text-white mb-2">{reason.title}</h3>
                <p className="text-gray-400">{reason.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
