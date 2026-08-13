import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle } from "lucide-react";
import { projects, projectCategories } from "../data/projects";

export default function ProjectLab() {
  const [selectedCategory, setSelectedCategory] = useState(projectCategories[0].id);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(
    (p) => p.category === projectCategories.find((c) => c.id === selectedCategory)?.name
  );

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono neon-text uppercase">IIRIS Project Lab</h2>
          <div className="w-24 h-1 bg-primary mt-4"></div>
          <p className="mt-4 text-gray-400 font-mono">ENGAGE DASHBOARD_</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="w-full lg:w-1/4 flex flex-col space-y-2">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-left px-6 py-4 font-mono transition-all duration-300 border-l-2 interactive ${
                  selectedCategory === cat.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/5"
                }`}
              >
                <span className="text-xs opacity-50 mr-4">{cat.id}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Projects Display */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="wait">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedProject(project)}
                      className="glass-panel p-1 rounded-xl cursor-pointer group interactive"
                    >
                      <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-[#111]">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                          <PlayCircle className="w-12 h-12 text-primary" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold font-mono text-white mb-2">{project.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full h-64 flex items-center justify-center border border-dashed border-white/20 rounded-xl"
                  >
                    <p className="font-mono text-gray-500">NO_DATA_FOUND_IN_THIS_SECTOR</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-surface border border-primary/30 w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,210,255,0.15)] flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:text-primary transition-colors z-10 interactive"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto bg-[#111] relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none"></div>
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="text-xs font-mono text-primary mb-2 tracking-widest">{selectedProject.category}</div>
                <h3 className="text-3xl font-bold font-mono text-white mb-6">{selectedProject.title}</h3>
                
                <p className="text-gray-300 mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-mono text-gray-500 mb-3">TECH_STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full border border-primary/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-mono text-gray-500 mb-2">DEVELOPED_BY</h4>
                  <p className="text-gray-300 font-mono text-sm">{selectedProject.team}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
