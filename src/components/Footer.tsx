import { Phone, Mail, MapPin, ChevronRight, Award, ShieldCheck, HeartPulse, Clock, MessageCircle } from "lucide-react";

interface FooterProps {
  onScrollToCalculator: () => void;
  onScrollToDiagnostics: () => void;
  onScrollToContact: () => void;
  onOpenShop?: () => void;
}

export default function Footer({
  onScrollToCalculator,
  onScrollToDiagnostics,
  onScrollToContact,
  onOpenShop,
}: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-slate-950 to-slate-900 text-slate-300 pt-16 border-t-4 border-teal-600 relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Top visual value badges bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-white/5 text-slate-300 font-bold font-sans">
          <div className="flex items-center gap-2.5 text-xs">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <div>
              <span className="block text-white uppercase tracking-wider">Licensed & Insured</span>
              <span className="text-[10px] text-slate-400 font-normal">Full compliance coverage</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <Award className="w-5 h-5 text-teal-400" />
            <div>
              <span className="block text-white uppercase tracking-wider">EPA Certified</span>
              <span className="text-[10px] text-slate-400 font-normal">Eco refrigerant standards</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <HeartPulse className="w-5 h-5 text-teal-400" />
            <div>
              <span className="block text-white uppercase tracking-wider">5-Year Warranty</span>
              <span className="text-[10px] text-slate-400 font-normal">On all premium hardware</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <Clock className="w-5 h-5 text-teal-400" />
            <div>
              <span className="block text-white uppercase tracking-wider">24/7 Service Line</span>
              <span className="text-[10px] text-slate-400 font-normal">Rapid technical response</span>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
          
          {/* Col 1: Knowledge base (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Technical Division
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> IT Infrastructure Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> Network Structured Cabling
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> Server Room Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> Cloud Migration & Backup
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> Cyber Security Management
                </a>
              </li>
              <li>
                <button onClick={onScrollToCalculator} className="hover:text-white transition-colors flex items-center gap-1.5 text-left font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> AC Pricing Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Quick links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Quick Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> About Zentrixcore
                </a>
              </li>
              <li>
                <button onClick={onScrollToDiagnostics} className="hover:text-white transition-colors flex items-center gap-1.5 text-left font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> HVAC Trouble Diagnostic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenShop?.()}
                  className="hover:text-white transition-colors flex items-center gap-1.5 font-medium text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> IT Accessories Shop
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> Accessibility Statements
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5 font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> Privacy & Cookies Protocol
                </a>
              </li>
              <li>
                <button onClick={onScrollToContact} className="hover:text-white transition-colors flex items-center gap-1.5 text-left font-medium">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" /> Schedule Survey Now
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Get In Touch (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Get In Touch
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <a href="tel:+254723121163" className="hover:text-white block font-semibold">+254 723 121 163</a>
                  <span className="text-[10px] text-slate-500 block font-sans">Primary Support Line</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/254723121163?text=Hello%20Zentrixcore%20IT%20Solutions,%20I'm%20interested%20in%20your%20services." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white font-semibold text-slate-300 flex items-center gap-1"
                >
                  WhatsApp: 0723 121 163
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <a href="mailto:zentrixcoreitsolutions@gmail.com" className="hover:text-white font-semibold">zentrixcoreitsolutions@gmail.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400 font-sans leading-relaxed">
                  123 Business Avenue, Tech District, CA 90210
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: About ZENTRIXCORE (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">
              About ZENTRIXCORE
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Zentrixcore IT Solutions is a premium IT Consultancy and Service provider delivering complex system integrations and climate management for modern offices, laboratories, and mission-critical server environments.
            </p>
            <div className="pt-2 border-t border-white/5">
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                Trusted by 500+ businesses since 2010.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright strip */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© Copyright Zentrixcore IT Solutions Ltd. 2026 - All Rights Reserved</p>
          <div className="flex flex-wrap justify-center gap-4 font-semibold">
            <button onClick={() => onOpenShop?.()} className="hover:text-slate-300">About us</button>
            <button onClick={() => onOpenShop?.()} className="hover:text-slate-300">IT Shop</button>
            <a href="#" className="hover:text-slate-300">Knowledge Base</a>
            <a href="#" className="hover:text-slate-300">Accessibility</a>
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
