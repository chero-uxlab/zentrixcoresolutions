import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  Globe,
  Settings,
  CloudLightning,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { CartItem } from "../types";

interface NavbarProps {
  cart: CartItem[];
  onOpenShop: () => void;
  onScrollToCalculator: () => void;
  onScrollToDiagnostics: () => void;
  onScrollToContact: () => void;
  selectedServiceId: string | null;
  onSelectService: (serviceId: string | null) => void;
  isShopView?: boolean;
}

export default function Navbar({
  cart,
  onOpenShop,
  onScrollToCalculator,
  onScrollToDiagnostics,
  onScrollToContact,
  selectedServiceId,
  onSelectService,
  isShopView = false,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const toggleMobileAccordion = (section: string) => {
    setMobileAccordion(prev => prev === section ? null : section);
  };

  // Track page scroll to add background blur to nav
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update dynamic local time in the topbar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleMobileNavClick = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  const handleServiceSelect = (id: string | null) => {
    onSelectService(id);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="w-full z-40 relative">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-950 to-slate-900 text-slate-300 py-2.5 px-4 text-xs font-medium border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 md:gap-6 justify-center sm:justify-start">
            <a
              href="tel:+254723121163"
              className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>+254 723 121 163</span>
            </a>
            <a
              href="mailto:zentrixcoreitsolutions@gmail.com"
              className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-orange-400" />
              <span>zentrixcoreitsolutions@gmail.com</span>
            </a>
            {currentTime && (
              <span className="hidden md:flex items-center gap-1.5 text-slate-400 border-l border-white/10 pl-4 font-mono">
                <Globe className="w-3 h-3 text-teal-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>UTC Time: {currentTime}</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <a 
                href="https://wa.me/254723121163?text=Hello%20Zentricore%20IT%20Solutions,%20I'm%20interested%2520in%2520your%2520services." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1 rounded text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1" 
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500/10 text-emerald-400" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1 rounded hover:text-teal-400 transition-colors" 
                aria-label="X (formerly Twitter)"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-1 rounded hover:text-teal-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-1 rounded hover:text-teal-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="p-1 rounded hover:text-teal-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded border border-teal-500/20">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              <span>24/7 Corporate Hotlines</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Sticky Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "sticky top-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100 py-3"
            : "bg-white border-b border-slate-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo Brand Block */}
          <button onClick={() => handleServiceSelect(null)} className="flex items-center gap-3 group text-left">
            <img 
              src="https://cdn.oreateai.com/aiimage/upload/3f836624f12288644ee1490b/38f73a8810f84f40b1c731f8556948c1.png" 
              alt="Zentricore IT Solutions" 
              referrerPolicy="no-referrer"
              className="h-11 w-auto rounded-lg object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-lg font-extrabold text-slate-900 tracking-wider leading-none font-sans group-hover:text-teal-700 transition-colors">
                ZENTRICORE
              </span>
              <span className="text-[9px] font-semibold text-slate-400 tracking-wider uppercase mt-1 leading-none">
                IT Solutions Private Ltd
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-0.5">
            <li>
              <button
                onClick={() => handleServiceSelect(null)}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-2.5 rounded-lg transition-colors ${
                  !selectedServiceId ? "text-teal-700 bg-teal-50" : "text-slate-700 hover:text-teal-600 hover:bg-slate-50"
                }`}
              >
                Home
              </button>
            </li>

            {/* Dropdown 1: MSP */}
            <li
              className="relative"
              onMouseEnter={() => setActiveDropdown("msp")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-teal-600 uppercase tracking-wider px-3 py-2.5 rounded-lg transition-colors">
                <span>MSP</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {activeDropdown === "msp" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-4 z-50 grid grid-cols-1 gap-1"
                  >
                    <div className="px-4 pb-1 border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Infrastructure & Security
                    </div>
                    <button onClick={() => handleServiceSelect("it-infrastructure")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">IT Infrastructure</button>
                    <button onClick={() => handleServiceSelect("network-cabling")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Network Cabling</button>
                    <button onClick={() => handleServiceSelect("server-room-setup")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Server Room Setup</button>
                    <button onClick={() => handleServiceSelect("network-rack-installation")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Network Rack Installation</button>
                    <button onClick={() => handleServiceSelect("endpoint-security")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Endpoint Security</button>
                    <button onClick={() => handleServiceSelect("email-security")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Email Security</button>
                    <button onClick={() => handleServiceSelect("cloud-security")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Cloud Security</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Dropdown 2: Cloud */}
            <li
              className="relative"
              onMouseEnter={() => setActiveDropdown("cloud")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-teal-600 uppercase tracking-wider px-3 py-2.5 rounded-lg transition-colors">
                <span>Cloud</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {activeDropdown === "cloud" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-4 z-50 grid grid-cols-1 gap-1"
                  >
                    <div className="px-4 pb-1 border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Cloud Migration & Support
                    </div>
                    <button onClick={() => handleServiceSelect("cloud-migration")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Cloud Migration</button>
                    <button onClick={() => handleServiceSelect("cloud-backup")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Cloud Backup</button>
                    <button onClick={() => handleServiceSelect("office-365")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Office 365</button>
                    <button onClick={() => handleServiceSelect("azure-services")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Azure Services</button>
                    <button onClick={() => handleServiceSelect("managed-it-support")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Managed IT Support</button>
                    <button onClick={() => handleServiceSelect("remote-monitoring")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">Remote Monitoring</button>
                    <button onClick={() => handleServiceSelect("it-consulting")} className="text-left px-5 py-2 text-xs font-semibold text-slate-700 hover:text-teal-600 hover:bg-teal-50/50">IT Consulting</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Dropdown 3: Solutions */}
            <li
              className="relative"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-teal-600 uppercase tracking-wider px-3 py-2.5 rounded-lg transition-colors">
                <span>Solutions</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {activeDropdown === "solutions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-[540px] bg-white rounded-xl shadow-xl border border-slate-100 p-4 z-50 grid grid-cols-2 gap-x-6 gap-y-4"
                  >
                    <div>
                      <div className="pb-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-2">
                        Hardware Procurement
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button onClick={() => handleServiceSelect("servers-storage")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Servers & Storage</button>
                        <button onClick={() => handleServiceSelect("workstations")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Workstations</button>
                        <button onClick={() => handleServiceSelect("networking-equipment")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Networking Equipment</button>
                        <button onClick={() => handleServiceSelect("ups-power-solutions")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">UPS & Power Solutions</button>
                        <button onClick={() => handleServiceSelect("printers-copiers")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Printers & Copiers</button>
                      </div>
                    </div>
                    <div>
                      <div className="pb-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-2">
                        Enterprise Software
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button onClick={() => handleServiceSelect("microsoft-licensing")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Microsoft Licensing</button>
                        <button onClick={() => handleServiceSelect("antivirus-solutions")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Antivirus Solutions</button>
                        <button onClick={() => handleServiceSelect("backup-software")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Backup Software</button>
                        <button onClick={() => handleServiceSelect("crm-solutions")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">CRM Solutions</button>
                        <button onClick={() => handleServiceSelect("erp-systems")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">ERP Systems</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Dropdown 4: VoIP & Mission Critical */}
            <li
              className="relative"
              onMouseEnter={() => setActiveDropdown("voip")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-teal-600 uppercase tracking-wider px-3 py-2.5 rounded-lg transition-colors">
                <span>VoIP & Critical</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {activeDropdown === "voip" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-[440px] bg-white rounded-xl shadow-xl border border-slate-100 p-4 z-50 grid grid-cols-2 gap-x-6 gap-y-4"
                  >
                    <div>
                      <div className="pb-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-2">
                        IP Telephony
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button onClick={() => handleServiceSelect("on-premise-voip")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">On-Premise VoIP</button>
                        <button onClick={() => handleServiceSelect("cloud-based-voip")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Cloud Based VoIP</button>
                        <button onClick={() => handleServiceSelect("call-center-software")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Call Center Software</button>
                      </div>
                    </div>
                    <div>
                      <div className="pb-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-2">
                        Mission Critical AD
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <button onClick={() => handleServiceSelect("critical-power-solutions")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Critical Power Solutions</button>
                        <button onClick={() => handleServiceSelect("servers-and-storage")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Servers and Storage</button>
                        <button onClick={() => handleServiceSelect("windows-server-deployment")} className="text-left text-xs font-semibold text-slate-700 hover:text-teal-600">Windows Server Deployment</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Dropdown 5: Environmental HVAC */}
            <li
              className="relative"
              onMouseEnter={() => setActiveDropdown("hvac")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-teal-600 uppercase tracking-wider px-3 py-2.5 rounded-lg transition-colors">
                <span className="text-teal-700 font-extrabold">HVAC & Lab</span>
                <ChevronDown className="w-3.5 h-3.5 text-teal-700" />
              </button>

              <AnimatePresence>
                {activeDropdown === "hvac" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-teal-100 py-3 z-50"
                  >
                    <div className="px-4 pb-2 border-b border-teal-50 text-[9px] font-bold text-teal-700 uppercase tracking-wider">
                      Climate-Control Solutions
                    </div>
                    <div className="p-1 space-y-0.5">
                      <button onClick={() => handleServiceSelect("air-conditioning-installation")} className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-teal-700 hover:bg-teal-50/40 rounded-lg transition-all">Air Conditioning</button>
                      <button onClick={() => handleServiceSelect("cold-room-solutions")} className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-teal-700 hover:bg-teal-50/40 rounded-lg transition-all">Cold Room Solutions</button>
                      <button onClick={() => handleServiceSelect("ventilation-duct-installation")} className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-teal-700 hover:bg-teal-50/40 rounded-lg transition-all">Ventilation & Ducting</button>
                      <button onClick={() => handleServiceSelect("laboratory-equipment-installation")} className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-600 hover:text-teal-700 hover:bg-teal-50/40 rounded-lg transition-all">Laboratory & Fume Hoods</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <button
                onClick={onOpenShop}
                className={`text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-colors flex items-center gap-1 ${
                  isShopView 
                    ? "text-teal-700 bg-teal-50" 
                    : "text-slate-700 hover:text-teal-600 hover:bg-slate-50"
                }`}
                id="navbar-shop-button"
              >
                IT Shop
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  isShopView 
                    ? "bg-teal-200 text-teal-850" 
                    : "bg-orange-100 text-orange-700"
                }`}>
                  {isShopView ? "ACTIVE" : "NEW"}
                </span>
              </button>
            </li>
          </ul>

          {/* Action Tools: Shopping Cart & Estimator CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Cart Pill */}
            <button
              onClick={onOpenShop}
              className="p-2.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-teal-600 transition-colors relative"
              id="shopping-cart-pill"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-600 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalCartItems}
                </span>
              )}
            </button>

            <button
              onClick={onScrollToCalculator}
              className="px-4 py-2.5 bg-gradient-to-r from-teal-800 to-teal-700 hover:from-teal-700 hover:to-teal-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
              id="get-estimate-navbar-btn"
            >
              Get Custom Quote
            </button>
          </div>

          {/* Mobile Hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Open mobile menu"
            id="mobile-hamburger-btn"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900 z-50 cursor-pointer lg:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-full max-w-xs bg-white shadow-2xl z-50 flex flex-col h-full lg:hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img 
                    src="https://cdn.oreateai.com/aiimage/upload/3f836624f12288644ee1490b/38f73a8810f84f40b1c731f8556948c1.png" 
                    alt="Zentricore IT Solutions" 
                    referrerPolicy="no-referrer"
                    className="h-7 w-auto object-contain"
                  />
                  <span className="font-bold text-slate-900 text-sm">ZENTRICORE Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
                  id="mobile-close-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="space-y-2">
                  <button
                    onClick={() => handleServiceSelect(null)}
                    className="w-full text-left py-2 font-bold text-sm text-slate-700 hover:text-teal-600 block"
                  >
                    Home
                  </button>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Quick Tools
                  </div>
                  <button
                    onClick={() => handleMobileNavClick(onScrollToCalculator)}
                    className="w-full text-left py-2 font-bold text-sm text-slate-700 hover:text-teal-600 block"
                  >
                    Interactive Estimator
                  </button>
                  <button
                    onClick={() => handleMobileNavClick(onScrollToDiagnostics)}
                    className="w-full text-left py-2 font-bold text-sm text-slate-700 hover:text-teal-600 block"
                  >
                    Troubleshooting Diagnoser
                  </button>
                  <button
                    onClick={() => handleMobileNavClick(onOpenShop)}
                    className={`w-full text-left py-2 font-bold text-sm flex items-center justify-between block ${
                      isShopView ? "text-teal-700 font-extrabold" : "text-slate-700 hover:text-teal-600"
                    }`}
                  >
                    <span>Browse IT Shop</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isShopView ? "bg-teal-100 text-teal-800" : "bg-teal-50 text-teal-700"
                    }`}>
                      {isShopView ? "SHOP ACTIVE" : "GO TO SHOP"}
                    </span>
                  </button>
                </div>

                {/* 1. IT & MSP (Infrastructure & Security) */}
                <div className="border-t border-slate-100 pt-4">
                  <button
                    onClick={() => toggleMobileAccordion("msp")}
                    className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 py-1"
                  >
                    <span>Infrastructure & Security (MSP)</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileAccordion === "msp" ? "rotate-180 text-teal-600" : "text-slate-400"}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "msp" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-1 pl-2 mt-2"
                      >
                        <button onClick={() => handleServiceSelect("it-infrastructure")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">IT Infrastructure</button>
                        <button onClick={() => handleServiceSelect("network-cabling")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Network Cabling</button>
                        <button onClick={() => handleServiceSelect("server-room-setup")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Server Room Setup</button>
                        <button onClick={() => handleServiceSelect("network-rack-installation")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Network Rack Installation</button>
                        <button onClick={() => handleServiceSelect("endpoint-security")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Endpoint Security (EDR)</button>
                        <button onClick={() => handleServiceSelect("email-security")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Email Security</button>
                        <button onClick={() => handleServiceSelect("cloud-security")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Cloud Security</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Cloud Migration & Support */}
                <div className="border-t border-slate-100 pt-4">
                  <button
                    onClick={() => toggleMobileAccordion("cloud")}
                    className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 py-1"
                  >
                    <span>Cloud Migration & Support</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileAccordion === "cloud" ? "rotate-180 text-teal-600" : "text-slate-400"}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "cloud" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-1 pl-2 mt-2"
                      >
                        <button onClick={() => handleServiceSelect("cloud-migration")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Cloud Migration</button>
                        <button onClick={() => handleServiceSelect("cloud-backup")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Cloud Backup</button>
                        <button onClick={() => handleServiceSelect("office-365")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Office 365</button>
                        <button onClick={() => handleServiceSelect("azure-services")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Azure Services</button>
                        <button onClick={() => handleServiceSelect("managed-it-support")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Managed IT Support</button>
                        <button onClick={() => handleServiceSelect("remote-monitoring")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Remote Monitoring</button>
                        <button onClick={() => handleServiceSelect("it-consulting")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">IT Consulting</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Hardware & Software Procurement */}
                <div className="border-t border-slate-100 pt-4">
                  <button
                    onClick={() => toggleMobileAccordion("solutions")}
                    className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 py-1"
                  >
                    <span>Procurement & Solutions</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileAccordion === "solutions" ? "rotate-180 text-teal-600" : "text-slate-400"}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "solutions" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-1 pl-2 mt-2"
                      >
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 mt-1">Hardware Procurement</div>
                        <button onClick={() => handleServiceSelect("servers-storage")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Servers & Storage</button>
                        <button onClick={() => handleServiceSelect("workstations")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Workstations</button>
                        <button onClick={() => handleServiceSelect("networking-equipment")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Networking Equipment</button>
                        <button onClick={() => handleServiceSelect("ups-power-solutions")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">UPS & Power Solutions</button>
                        <button onClick={() => handleServiceSelect("printers-copiers")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Printers & Copiers</button>
                        
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 mt-2.5">Enterprise Software</div>
                        <button onClick={() => handleServiceSelect("microsoft-licensing")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Microsoft Licensing</button>
                        <button onClick={() => handleServiceSelect("antivirus-solutions")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Antivirus Solutions</button>
                        <button onClick={() => handleServiceSelect("backup-software")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Backup Software</button>
                        <button onClick={() => handleServiceSelect("crm-solutions")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">CRM Solutions</button>
                        <button onClick={() => handleServiceSelect("erp-systems")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">ERP Systems</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. VoIP & Critical Support */}
                <div className="border-t border-slate-100 pt-4">
                  <button
                    onClick={() => toggleMobileAccordion("voip")}
                    className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 py-1"
                  >
                    <span>VoIP & Critical Support</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileAccordion === "voip" ? "rotate-180 text-teal-600" : "text-slate-400"}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "voip" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-1 pl-2 mt-2"
                      >
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 mt-1">IP Telephony</div>
                        <button onClick={() => handleServiceSelect("on-premise-voip")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">On-Premise VoIP</button>
                        <button onClick={() => handleServiceSelect("cloud-based-voip")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Cloud Based VoIP</button>
                        <button onClick={() => handleServiceSelect("call-center-software")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Call Center Software</button>
                        
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 mt-2.5">Mission Critical AD</div>
                        <button onClick={() => handleServiceSelect("critical-power-solutions")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Critical Power Solutions</button>
                        <button onClick={() => handleServiceSelect("servers-and-storage")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Servers & Storage</button>
                        <button onClick={() => handleServiceSelect("windows-server-deployment")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-0.5 pl-1 font-semibold">Windows Server Deployment</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. Climate Controls & HVAC */}
                <div className="border-t border-slate-100 pt-4">
                  <button
                    onClick={() => toggleMobileAccordion("hvac")}
                    className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 py-1"
                  >
                    <span>HVAC & Lab Environmental</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileAccordion === "hvac" ? "rotate-180 text-teal-600" : "text-slate-400"}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === "hvac" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-1 pl-2 mt-2"
                      >
                        <button onClick={() => handleServiceSelect("air-conditioning-installation")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Air Conditioning</button>
                        <button onClick={() => handleServiceSelect("cold-room-solutions")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Cold Room Solutions</button>
                        <button onClick={() => handleServiceSelect("ventilation-duct-installation")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Ventilation & Ductwork</button>
                        <button onClick={() => handleServiceSelect("laboratory-equipment-installation")} className="block w-full text-left text-xs text-slate-600 hover:text-teal-600 py-1 font-semibold">Lab Equipment & Fume Hoods</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer Panel */}
              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
                <a
                  href="tel:+254723121163"
                  className="w-full py-2.5 bg-teal-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-2 transition-all hover:bg-teal-500"
                >
                  <Phone className="w-4 h-4" /> Call 0723 121 163
                </a>
                <a
                  href="https://wa.me/254723121163?text=Hello%20Zentricore%20IT%20Solutions,%20I'm%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center justify-center gap-2 transition-all hover:bg-emerald-500"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" /> WhatsApp Chat
                </a>
                <p className="text-[10px] text-center text-slate-400">
                  Certified Corporate IT Support & Engineering.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
