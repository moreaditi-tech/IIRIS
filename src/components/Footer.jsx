import { Mail } from "lucide-react";
import { FaLinkedin, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { contacts } from "../data/contact";

export default function Footer() {
  return (
    <footer id="footer" className="relative w-full bg-[#020202] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      
      {/* Subtle Technical Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00d2ff]/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: IIRIS Brand */}
          <div className="flex flex-col">
            <a href="#home" className="flex items-center gap-2 mb-6 group inline-flex hover:opacity-80 transition-opacity">
              <div className="relative rounded-lg p-2 group-hover:shadow-[0_0_20px_#00d2ff] transition-shadow duration-500 border border-transparent group-hover:border-[#00d2ff]/30">
                <img src="/images/LOGO_transparent.png" alt="IIRIS Logo" className="h-10 md:h-12 object-contain drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]" />
              </div>
            </a>
            
            <h4 className="text-white font-black uppercase tracking-tight text-lg mb-4">
              IIRIS — IoT Intelligence &<br/>Robotics Innovation Society
            </h4>
            
            <p className="text-gray-400 font-sans text-sm max-w-sm leading-relaxed mb-6">
              Where software meets hardware, and innovation meets creativity through actual implementation.
            </p>

            <div className="font-mono text-xs text-gray-500 tracking-widest uppercase space-y-1">
              <div>IoT CLUB • PCCOE</div>
              <div>Department of Computer Engineering</div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col lg:pl-12">
            <h4 className="text-[#00d2ff] font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-[#00d2ff]"></div>
              Navigation
            </h4>
            <nav className="flex flex-col space-y-3">
              {['Home', 'About', 'Projects', 'Events', 'Achievements', 'Team', 'Upcoming Events'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-gray-400 hover:text-white font-mono text-sm uppercase tracking-wider transition-colors inline-flex w-fit interactive group"
                >
                  <span className="text-[#00d2ff] opacity-0 group-hover:opacity-100 mr-2 transition-all -translate-x-2 group-hover:translate-x-0">{'>'}</span>
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact / Club Team */}
          <div className="flex flex-col">
            <h4 className="text-[#00d2ff] font-mono text-sm tracking-widest uppercase mb-6 flex items-center gap-2">
              <div className="w-4 h-[1px] bg-[#00d2ff]"></div>
              Contact
            </h4>
            
            <div className="space-y-6">
              {/* Secretary */}
              <div>
                <h5 className="text-white font-mono text-xs uppercase tracking-widest mb-1">{contacts.secretary.role}</h5>
                <div className="text-gray-300 font-bold mb-1">{contacts.secretary.name}</div>
                <a href={`mailto:${contacts.secretary.email}`} className="text-gray-500 hover:text-[#00d2ff] transition-colors text-sm break-all interactive">
                  {contacts.secretary.email}
                </a>
              </div>

              {/* Co-Secretary */}
              <div>
                <h5 className="text-white font-mono text-xs uppercase tracking-widest mb-1">{contacts.coSecretary.role}</h5>
                <div className="text-gray-300 font-bold mb-1">{contacts.coSecretary.name}</div>
                <a href={`mailto:${contacts.coSecretary.email}`} className="text-gray-500 hover:text-[#00d2ff] transition-colors text-sm break-all interactive">
                  {contacts.coSecretary.email}
                </a>
              </div>

              {/* General Inquiries */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-gray-400 text-xs mb-2">For collaborations, workshops and club queries:</p>
                <a href={`mailto:${contacts.clubEmail}`} className="text-[#00d2ff] hover:text-white transition-colors text-sm break-all font-mono interactive">
                  {contacts.clubEmail}
                </a>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
          
          <div className="text-gray-600 font-mono text-xs uppercase tracking-widest text-center md:text-left">
            © 2026 IIRIS IoT Club • PCCOE
          </div>

          <div className="text-white font-black text-sm uppercase tracking-[0.2em] opacity-80 text-center">
            Connect • Innovate • Build
          </div>

          {/* Social Links Secondary */}
          <div className="flex items-center gap-4 text-gray-500">
            <a href="#" className="hover:text-[#00d2ff] transition-colors interactive"><FaInstagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#00d2ff] transition-colors interactive"><FaLinkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#00d2ff] transition-colors interactive"><FaYoutube className="w-5 h-5" /></a>
            <a href="#" className="hover:text-[#00d2ff] transition-colors interactive"><FaGithub className="w-5 h-5" /></a>
            <a href={`mailto:${contacts.clubEmail}`} className="hover:text-[#00d2ff] transition-colors interactive"><Mail className="w-5 h-5" /></a>
          </div>

        </div>
      </div>
    </footer>
  );
}
