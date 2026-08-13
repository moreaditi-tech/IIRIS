import { useState, useEffect } from "react";
import BootSequence from "./components/BootSequence";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Categories from "./components/Categories";
import ProjectsGallery from "./components/ProjectsGallery";
import Events from "./components/Events";
import Achievements from "./components/Achievements";
import Team from "./components/Team";
import Leadership from "./components/Leadership";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isBooting) {
    return <BootSequence onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-x-hidden">
      {!isMobile && <CustomCursor />}
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Categories />
        <ProjectsGallery />
        <Events />
        <Achievements />
        <Leadership />
        <Team />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
