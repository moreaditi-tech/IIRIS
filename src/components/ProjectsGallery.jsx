import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import ImageModal from "./ImageModal";
import { projects } from "../data/projects";

// Simple helper to generate an IoT diagram based on technologies
const generateDiagram = (technologies) => {
  if (!technologies) return ["IDEA", "IMPLEMENTATION"];
  const techStr = technologies.join(" ").toLowerCase();
  
  let flow = ["SENSOR"];
  if (techStr.includes("arduino") || techStr.includes("esp") || techStr.includes("mcu")) flow.push("MICROCONTROLLER");
  if (techStr.includes("python") || techStr.includes("opencv") || techStr.includes("tensorflow") || techStr.includes("ai")) flow.push("PROCESSOR");
  if (techStr.includes("cloud") || techStr.includes("supabase") || techStr.includes("wifi")) flow.push("CLOUD");
  if (techStr.includes("react") || techStr.includes("dashboard") || techStr.includes("web") || techStr.includes("app")) flow.push("INTERFACE");
  if (techStr.includes("motor") || techStr.includes("servo") || techStr.includes("pump") || techStr.includes("buzzer") || techStr.includes("led")) flow.push("ACTUATOR");
  
  if (flow.length === 1) flow.push("ACTION");
  return flow;
};

// Robust Image Component that handles errors via React state
const ProjectImage = ({ src, title, className }) => {
  const [error, setError] = useState(false);
  
  return (
    <>
      {!error && (
        <img 
          src={src} 
          alt={title} 
          loading="lazy"
          decoding="async"
          className={className}
          onError={() => setError(true)}
        />
      )}
      {error && (
        <div className="absolute inset-0 bg-[#111] flex flex-col items-center justify-center">
          <div className="text-[#00d2ff] opacity-50 mb-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          </div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-gray-600 uppercase text-center px-4">IIRIS PROJECT LAB</div>
        </div>
      )}
    </>
  );
};

export default function ProjectsGallery() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
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
    <section id="projects" className="py-24 relative overflow-hidden bg-[#050505]">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-mono text-[#00d2ff] tracking-[0.3em] uppercase mb-4">Project Lab</h2>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">Real Implementation</h3>
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

        {/* Gallery */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar snap-x snap-mandatory"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: Math.min(idx * 0.1, 0.5) }}
              onClick={() => setSelectedProject(project)}
              className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-[#0a0a0a] border border-white/5 hover:border-[#00d2ff]/30 rounded-lg overflow-hidden group cursor-pointer transition-all duration-300 flex flex-col interactive"
            >
              <div className="relative h-48 overflow-hidden bg-[#111] flex items-center justify-center">
                <ProjectImage 
                  src={project.image} 
                  title={project.title} 
                  className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700" 
                />
                
                {/* Data line animation on hover */}
                <div className="absolute bottom-0 left-0 h-[1px] bg-[#00d2ff] w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-[10px] font-mono text-[#00d2ff] mb-2 tracking-widest uppercase">
                  PROJECT {project.id}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-tight">
                  {project.title}
                </h3>
                
                <div className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4 line-clamp-1">
                  {project.creators}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies?.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-[9px] font-mono px-2 py-1 bg-white/5 border border-white/5 rounded text-gray-400 uppercase">
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="text-[9px] font-mono px-2 py-1 bg-transparent text-gray-600 uppercase">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-[#020202]/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#050505] border border-white/10 w-full max-w-6xl max-h-full overflow-y-auto rounded-xl flex flex-col md:flex-row relative shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-[#00d2ff]/20 rounded-full text-white hover:text-[#00d2ff] transition-colors z-20 interactive"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Image & Architecture */}
              <div className="w-full md:w-2/5 flex flex-col border-r border-white/5 bg-[#0a0a0a]">
                <div 
                  className="h-64 md:h-80 bg-[#111] relative overflow-hidden flex items-center justify-center cursor-pointer"
                  onClick={() => setFullScreenImage(selectedProject.image)}
                >
                  <ProjectImage 
                    src={selectedProject.image} 
                    title={selectedProject.title} 
                    className="w-full h-full object-cover opacity-100" 
                  />
                </div>

                {/* IoT Architecture Diagram */}
                <div className="p-8 flex-grow">
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Architecture Flow</h4>
                  
                  <div className="flex flex-col gap-4 relative">
                    <div className="absolute top-4 bottom-4 left-3 w-[1px] bg-gradient-to-b from-[#00d2ff] via-[#00d2ff]/30 to-transparent"></div>
                    
                    {generateDiagram(selectedProject.technologies).map((node, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 + 0.2 }}
                        key={i} 
                        className="flex items-center gap-4 relative z-10"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#050505] border border-[#00d2ff] flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse"></div>
                        </div>
                        <span className="font-mono text-xs text-white uppercase tracking-widest">{node}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Side: Details */}
              <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col bg-[#050505]">
                <div className="text-[10px] font-mono text-[#00d2ff] mb-2 tracking-widest uppercase">PROJECT {selectedProject.id}</div>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight uppercase">{selectedProject.title}</h3>
                
                <div className="mb-8">
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Creators</h4>
                  <p className="text-sm font-medium text-white">{selectedProject.creators}</p>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-[10px] font-mono uppercase tracking-wider rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8 flex-grow">
                  <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">Description</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-2xl">
                    {selectedProject.description}
                  </p>
                </div>
                
                <div className="flex gap-4 mt-auto border-t border-white/5 pt-6">
                  {selectedProject.externalLink && (
                    <a href={selectedProject.externalLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-2 border border-[#00d2ff]/30 text-xs font-mono font-bold text-[#00d2ff] hover:bg-[#00d2ff] hover:text-black transition-all interactive uppercase tracking-widest">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                    </a>
                  )}
                  {selectedProject.driveLink && (
                    <a href={selectedProject.driveLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-6 py-2 border border-white/10 text-xs font-mono text-gray-300 hover:bg-white/10 transition-all interactive uppercase tracking-widest">
                      <ExternalLink className="w-4 h-4 mr-2" /> Project Files
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ImageModal selectedImage={fullScreenImage} setSelectedImage={setFullScreenImage} />
    </section>
  );
}
