import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator as CalcIcon, Activity, Sparkles, Sliders, MessageCircle } from "lucide-react";
import { ProductItem, CartItem } from "./types";
import { SERVICES } from "./data";

// Import modular components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import ServicesGrid from "./components/ServicesGrid";
import ServiceDetailsList from "./components/ServiceDetailsList";
import Calculator from "./components/Calculator";
import Diagnostics from "./components/Diagnostics";
import TestimonialsAndFaq from "./components/TestimonialsAndFaq";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ShopPage from "./components/ShopPage";
import ServiceLandingPage from "./components/ServiceLandingPage";
import KnowledgeBase from "./components/KnowledgeBase";
import LiveChat from "./components/LiveChat";
import CookieBanner from "./components/CookieBanner";
import AboutSection from "./components/AboutSection";
import MSPFeatures from "./components/MSPFeatures";

export default function App() {
  // Shopping Cart state
  const [isShopView, setIsShopView] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Selected Service Page ID (displays high-fidelity matching landing page when active)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // Interactive scroll highlight
  const [activeDetailsSectionId, setActiveDetailsSectionId] = useState<string | null>(null);

  // Form filling channel
  const [preFilledInquiry, setPreFilledInquiry] = useState("");

  // Tools Tab Switcher: "calculator" or "diagnostics"
  const [activeSuiteTab, setActiveSuiteTab] = useState<"calculator" | "diagnostics">("calculator");

  // Scroll Actions
  const handleScrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToDetails = (serviceId: string) => {
    setActiveDetailsSectionId(serviceId);
    handleScrollToElement(`details-card-${serviceId}`);
  };

  // Cart Handlers
  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const match = prev.find((item) => item.product.id === product.id);
      if (match) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Bundle cart items into contact form text inquiry
  const handleApplyCartToQuote = () => {
    const itemsDescription = cart
      .map((item) => `- ${item.product.name} (Qty: ${item.quantity})`)
      .join("\n");
    const formattedMessage = `I would like to receive a proposal including these shop accessory additions:\n${itemsDescription}\nPlease contact me to finalize configuration.`;
    
    setPreFilledInquiry(formattedMessage);
    setIsShopView(false);
    setTimeout(() => handleScrollToElement("zentrix-contact-form"), 150);
  };

  const handleScheduleFromDiagnostics = (symptomLabel: string) => {
    const formattedMessage = `I completed your online Diagnostics checklist.\nReported Issue/Symptom: ${symptomLabel}\nPlease dispatch a certified technician to inspect my systems.`;
    
    setPreFilledInquiry(formattedMessage);
    handleScrollToElement("zentrix-contact-form");
  };

  const handlePreFillFromCalculator = (calcMsg: string) => {
    setPreFilledInquiry(calcMsg);
    handleScrollToElement("zentrix-contact-form");
  };

  const handleSelectServiceFromLanding = (serviceId: string | null) => {
    setSelectedServiceId(serviceId);
    setIsShopView(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedService = SERVICES.find(s => s.id === selectedServiceId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none antialiased">
      
      {/* 1. Sticky Corporate Header with full service link parameters */}
      <Navbar
        cart={cart}
        onOpenShop={() => {
          setIsShopView(true);
          setSelectedServiceId(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onScrollToCalculator={() => {
          setSelectedServiceId(null); // Return to home view
          setIsShopView(false);
          setActiveSuiteTab("calculator");
          setTimeout(() => handleScrollToElement("hvac-interactive-suite"), 100);
        }}
        onScrollToDiagnostics={() => {
          setSelectedServiceId(null); // Return to home view
          setIsShopView(false);
          setActiveSuiteTab("diagnostics");
          setTimeout(() => handleScrollToElement("hvac-interactive-suite"), 100);
        }}
        onScrollToContact={() => {
          setIsShopView(false);
          setSelectedServiceId(null);
          setTimeout(() => handleScrollToElement("zentrix-contact-form"), 100);
        }}
        selectedServiceId={selectedServiceId}
        onSelectService={handleSelectServiceFromLanding}
        isShopView={isShopView}
      />

      {/* Conditionally Render either the Selected Service Landing Page, Shop Page, OR the complete Home Landing Layout */}
      <AnimatePresence mode="wait">
        {selectedService ? (
          <motion.div
            key={`service-${selectedService.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <ServiceLandingPage
              service={selectedService}
              onGoBack={() => setSelectedServiceId(null)}
              onScrollToContact={() => handleScrollToElement("zentrix-contact-form")}
              onPreFillContact={setPreFilledInquiry}
            />
          </motion.div>
        ) : isShopView ? (
          <motion.div
            key="shoppage-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <ShopPage
              cart={cart}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onApplyCartToQuote={handleApplyCartToQuote}
              onClearCart={() => setCart([])}
              onClose={() => setIsShopView(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="homepage-views"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* 2. Page Hero banner section */}
            <Hero
              onScrollToCalculator={() => {
                setActiveSuiteTab("calculator");
                handleScrollToElement("hvac-interactive-suite");
              }}
              onScrollToContact={() => handleScrollToElement("zentrix-contact-form")}
            />

            {/* About Section */}
            <AboutSection />

            {/* 3. Performance Statistics Strip */}
            <StatsBar />

            {/* 4. Interactive Engineering Suite (Cost Calculator & Diagnostics Tabs) */}
            <section className="py-16 bg-slate-50 px-4 scroll-mt-20" id="hvac-interactive-suite">
              <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Centered Tab Control Panel */}
                <div className="text-center max-w-lg mx-auto space-y-4">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                    <Sliders className="w-3.5 h-3.5" /> Zentrixcore Interactive Suite
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 uppercase">
                    Configure & Diagnose Systems
                  </h2>
                  
                  {/* High-Contrast Dual Switcher */}
                  <div className="p-1.5 bg-slate-200/60 rounded-2xl border border-slate-100 flex gap-1.5 shadow-sm max-w-sm mx-auto">
                    <button
                      onClick={() => setActiveSuiteTab("calculator")}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        activeSuiteTab === "calculator"
                          ? "bg-white text-teal-800 shadow-md border-b border-slate-100 font-extrabold"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                      id="tab-btn-calculator"
                    >
                      <CalcIcon className="w-4 h-4 text-orange-400" /> Estimator
                    </button>
                    <button
                      onClick={() => setActiveSuiteTab("diagnostics")}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        activeSuiteTab === "diagnostics"
                          ? "bg-white text-teal-800 shadow-md border-b border-slate-100 font-extrabold"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                      id="tab-btn-diagnostics"
                    >
                      <Activity className="w-4 h-4 text-teal-600 animate-pulse" /> Diagnostics
                    </button>
                  </div>
                </div>

                {/* Render Active Tool Frame */}
                <div className="transition-all duration-500">
                  {activeSuiteTab === "calculator" ? (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Calculator onPreFillContact={handlePreFillFromCalculator} />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Diagnostics onScheduleEmergency={handleScheduleFromDiagnostics} />
                    </motion.div>
                  )}
                </div>

              </div>
            </section>

            {/* MSP/IT Services Features Section (What We Do, Success, Why Us, Backup, Partners) */}
            <MSPFeatures />

            {/* 5. Services Card Grid with Search Filters */}
            <ServicesGrid
              onSelectService={handleSelectServiceFromLanding}
            />

            {/* 6. Systems Engineering alternating list with hover-focus hooks */}
            <ServiceDetailsList activeSectionId={activeDetailsSectionId} />

            {/* 7. Client Testimonial slider and Expandable FAQ Accordion */}
            <section className="py-20 bg-white border-y border-slate-100 px-4">
              <div className="max-w-6xl mx-auto">
                <TestimonialsAndFaq />
              </div>
            </section>

            {/* 7.5 Zentrix Engineering Help Center & Knowledge Base */}
            <KnowledgeBase />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 8. Proposal Request direct dispatch contact form (Always visible at the bottom) */}
      <ContactForm preFilledMessage={preFilledInquiry} />

      {/* 9. Rich Directory footer strip */}
      <Footer
        onScrollToCalculator={() => {
          setSelectedServiceId(null);
          setIsShopView(false);
          setActiveSuiteTab("calculator");
          setTimeout(() => handleScrollToElement("hvac-interactive-suite"), 100);
        }}
        onScrollToDiagnostics={() => {
          setSelectedServiceId(null);
          setIsShopView(false);
          setActiveSuiteTab("diagnostics");
          setTimeout(() => handleScrollToElement("hvac-interactive-suite"), 100);
        }}
        onScrollToContact={() => {
          setIsShopView(false);
          setSelectedServiceId(null);
          setTimeout(() => handleScrollToElement("zentrix-contact-form"), 100);
        }}
        onOpenShop={() => {
          setIsShopView(true);
          setSelectedServiceId(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* 11. Interactive live support assist agent (Joan) */}
      <LiveChat />

      {/* 11.5 Floating WhatsApp Support button */}
      <a
        href="https://wa.me/254723121163?text=Hello%20Zentrixcore%20IT%20Solutions,%20I'm%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-45 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group border border-emerald-500/30"
        title="Chat on WhatsApp"
        id="floating-whatsapp-trigger"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-bold uppercase tracking-wider max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
          WhatsApp Chat
        </span>
      </a>

      {/* 12. Privacy cookie consent assurance */}
      <CookieBanner />

    </div>
  );
}
