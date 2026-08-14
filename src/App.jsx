import { useState, useEffect, lazy, Suspense } from "react";
import BootSequence from "./components/BootSequence";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const About = lazy(() => import("./components/About"));
const Categories = lazy(() => import("./components/Categories"));
const ProjectsGallery = lazy(() => import("./components/ProjectsGallery"));
const Events = lazy(() => import("./components/Events"));
const Achievements = lazy(() => import("./components/Achievements"));
const UpcomingEvents = lazy(() => import("./components/UpcomingEvents"));
const Team = lazy(() => import("./components/Team"));
const Leadership = lazy(() => import("./components/Leadership"));
const CallToAction = lazy(() => import("./components/CallToAction"));
const Footer = lazy(() => import("./components/Footer"));

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
        <Suspense fallback={<div className="h-20 w-full"></div>}>
          <About />
          <Categories />
          <ProjectsGallery />
          <Events />
          <Achievements />
          <UpcomingEvents />
          <Leadership />
          <Team />
          <CallToAction />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="h-20 w-full"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
