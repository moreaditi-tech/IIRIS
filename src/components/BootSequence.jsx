import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootMessages = [
  "IIRIS SYSTEM",
  "INITIALIZING...",
  "CONNECTING SENSORS...",
  "IoT CORE ONLINE",
  "SYSTEM READY"
];

export default function BootSequence({ onComplete }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (currentMessageIndex < bootMessages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, 300); // Fast sequence
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 500); // Short pause on "SYSTEM READY"
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black font-mono text-cyan-400"
    >
      <div className="relative flex flex-col items-start w-64">
        {bootMessages.map((msg, idx) => (
          <AnimatePresence key={idx}>
            {idx <= currentMessageIndex && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="my-1 text-sm md:text-base"
              >
                {"> "}
                {msg}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-3 h-5 bg-cyan-400 mt-2"
        />
      </div>
    </motion.div>
  );
}
