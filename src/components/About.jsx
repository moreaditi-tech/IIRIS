import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const nodes = [
  { id: "IDEA", label: "IDEA" },
  { id: "SENSOR", label: "SENSOR" },
  { id: "CODE", label: "CODE" },
  { id: "DEVICE", label: "DEVICE" },
  { id: "DATA", label: "DATA" },
  { id: "ACTION", label: "ACTION" },
];

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={sectionRef} id="about" className="py-32 relative bg-[#020202] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-6">
            Where software<br/>meets hardware.
          </h2>
          <p className="text-gray-400 font-sans text-lg md:text-xl max-w-2xl mx-auto">
            Innovation meets creativity through actual implementation.
          </p>
        </motion.div>

        {/* Vertical IoT Sequence */}
        <div className="relative w-full flex flex-col items-center py-10">
          {/* Connecting Line (Background) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/5 z-0"></div>
          
          {/* Animated Signal Line */}
          <motion.div 
            style={{ 
              scaleY: scrollYProgress,
              transformOrigin: "top"
            }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#00d2ff] via-[#00d2ff] to-transparent z-10 shadow-[0_0_15px_#00d2ff]"
          ></motion.div>

          <div className="flex flex-col gap-16 md:gap-24 relative z-20 w-full">
            {nodes.map((node, index) => {
              // Calculate activation range for each node based on scroll
              const start = index / nodes.length;
              const end = (index + 1) / nodes.length;
              
              const opacity = useTransform(scrollYProgress, [start - 0.1, start], [0.3, 1]);
              const color = useTransform(scrollYProgress, [start - 0.1, start], ["#333", "#00d2ff"]);
              const scale = useTransform(scrollYProgress, [start - 0.1, start, start + 0.1], [0.8, 1.2, 1]);
              const glow = useTransform(scrollYProgress, [start - 0.1, start], ["0px 0px 0px rgba(0,210,255,0)", "0px 0px 20px rgba(0,210,255,0.5)"]);

              return (
                <div key={node.id} className={`flex items-center w-full ${index % 2 === 0 ? 'justify-start md:justify-end md:pr-[50%] pr-[50%]' : 'justify-end md:justify-start md:pl-[50%] pl-[50%]'} relative`}>
                  
                  {/* Node Dot positioned exactly in center */}
                  <motion.div 
                    style={{ backgroundColor: color, scale, boxShadow: glow }}
                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-black z-30"
                  />
                  
                  {/* Label */}
                  <motion.div 
                    style={{ opacity }}
                    className={`font-mono text-xl md:text-3xl font-black tracking-widest text-white uppercase ${index % 2 === 0 ? 'mr-8 text-right' : 'ml-8 text-left'}`}
                  >
                    {node.label}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
