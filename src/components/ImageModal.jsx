import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ImageModal({ selectedImage, setSelectedImage }) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12 bg-[#020202]/90 backdrop-blur-md cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-full flex items-center justify-center cursor-default"
          >
            <button 
              onClick={() => setSelectedImage(null)}
              aria-label="Close full screen view"
              className="absolute -top-12 right-0 md:-right-12 p-2 bg-black/50 hover:bg-[#00d2ff]/20 rounded-full text-white hover:text-[#00d2ff] transition-colors z-20 interactive"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Full screen view" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg border border-white/10 shadow-2xl" 
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
