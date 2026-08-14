import { useState } from "react";
import { motion } from "framer-motion";
import ImageModal from "./ImageModal";
import { Calendar, Clock, MapPin, Users, ArrowRight, CircleDot } from "lucide-react";
import { upcomingEvents } from "../data/upcomingEvents";

export default function UpcomingEvents() {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!upcomingEvents || upcomingEvents.length === 0) return null;

  const event = upcomingEvents[0]; // For now, display the first upcoming event

  return (
    <section id="upcoming-events" className="relative w-full min-h-screen py-32 bg-[#020202] flex items-center justify-center overflow-hidden">
      
      {/* Background Technical Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-[#00d2ff]/50"></div>
            <h2 className="text-[#00d2ff] font-mono text-sm tracking-widest uppercase">Transmissions</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Upcoming Events
          </h3>
        </motion.div>

        {/* Featured Event Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#00d2ff]/30 transition-colors duration-500"
        >
          {/* Subtle Ambient Glow inside card */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d2ff]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image Area */}
            <div 
              className="w-full lg:w-[45%] relative aspect-video lg:aspect-auto overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(event.image)}
            >
              <div className="absolute inset-0 bg-[#050505] flex items-center justify-center p-4 md:p-8">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              
              {/* Image Overlay Grid */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuMSIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNDBoNDBWMHoiLz48L2c+PC9zdmc+')] opacity-20 mix-blend-overlay pointer-events-none"></div>
              
              {/* Small Sensor Node UI Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                <CircleDot className="w-3 h-3 text-[#00d2ff] animate-pulse" />
                <span className="text-[10px] font-mono text-[#00d2ff] uppercase tracking-widest">Sensor Node Active</span>
              </div>
            </div>

            {/* Right: Content Area */}
            <div className="w-full lg:w-[55%] p-8 lg:p-12 xl:p-16 flex flex-col justify-center relative">
              
              {/* Background data lines */}
              <div className="absolute top-0 bottom-0 left-8 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none hidden lg:block"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse shadow-[0_0_8px_#00d2ff]"></span>
                  <span className="text-[10px] font-mono text-white tracking-widest uppercase">Upcoming</span>
                </div>

                <h4 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
                  {event.title}
                </h4>
                
                <h5 className="text-lg md:text-xl font-mono text-[#00d2ff] uppercase tracking-wide mb-6">
                  {event.subtitle}
                </h5>

                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
                  {event.description}
                </p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 mb-10 font-mono text-sm">
                  <div className="flex items-start gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-[#00d2ff] shrink-0" />
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Date</div>
                      <div className="uppercase">{event.date}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-[#00d2ff] shrink-0" />
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Time</div>
                      <div className="uppercase">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-[#00d2ff] shrink-0" />
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Venue</div>
                      <div className="uppercase">{event.venue}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-gray-300">
                    <Users className="w-5 h-5 text-[#00d2ff] shrink-0" />
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Who Can Join</div>
                      <div className="uppercase">{event.audience}</div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                    <div className={`w-2 h-2 rounded-full ${event.status === 'OPEN' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : event.status === 'CLOSED' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                    <span className={event.status === 'OPEN' ? 'text-green-500' : event.status === 'CLOSED' ? 'text-red-500' : 'text-yellow-500'}>
                      Registration {event.status}
                    </span>
                  </div>

                  <a 
                    href={event.registrationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-mono text-sm font-bold text-[#050505] bg-[#00d2ff] hover:bg-white transition-all duration-300 interactive shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] w-full sm:w-auto"
                  >
                    REGISTER NOW <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
    </section>
  );
}
