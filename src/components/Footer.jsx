import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-16">
          
          {/* Brand */}
          <div className="w-full lg:w-1/3">
            <a href="#home" className="flex items-center gap-2 mb-6 group inline-flex hover:opacity-80 transition-opacity">
              <div className="relative rounded-lg p-2 group-hover:shadow-[0_0_20px_#00d2ff] transition-shadow duration-500 border border-transparent group-hover:border-[#00d2ff]/30">
                <img src="/images/LOGO_transparent.png" alt="IIRIS Logo" className="h-10 md:h-14 object-contain drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]" />
              </div>
            </a>
            
            <p className="text-gray-400 font-sans text-sm max-w-sm leading-relaxed mb-4">
              Where software meets hardware, and innovation meets creativity through actual implementation.
            </p>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              IoT CLUB • PCCOE<br/>Department of Computer Engineering
            </p>
          </div>

          {/* Links */}
          <div className="w-full lg:w-2/3 flex flex-wrap justify-between gap-8">
            <div>
              <h4 className="text-white font-mono font-bold mb-6 tracking-widest text-xs uppercase">Navigation</h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Projects', 'Events', 'Achievements', 'Team', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors text-sm interactive">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-mono font-bold mb-6 tracking-widest text-xs uppercase">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00d2ff] hover:bg-[#00d2ff]/10 transition-all interactive">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00d2ff] hover:bg-[#00d2ff]/10 transition-all interactive">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00d2ff] hover:bg-[#00d2ff]/10 transition-all interactive">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-mono">
            &copy; {currentYear} IIRIS IoT Club, PCCOE. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs font-mono text-gray-600">
            <span>Designed for Innovation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
