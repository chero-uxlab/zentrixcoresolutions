import { motion } from "motion/react";
import { Send, PhoneCall, ChevronRight, Wind, ShieldAlert, Award, AlertCircle } from "lucide-react";

const heroBg = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80";

interface HeroProps {
  onScrollToCalculator: () => void;
  onScrollToContact: () => void;
}

export default function Hero({ onScrollToCalculator, onScrollToContact }: HeroProps) {
  return (
    <section className="relative min-h-[550px] md:min-h-[650px] flex items-center justify-center overflow-hidden py-16 px-4">
      {/* Dynamic Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url(${heroBg})`
        }} 
      />

      {/* Modern Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/90 to-slate-900/80 z-1" />

      {/* Floating Decorative Shapes */}
      <div className="absolute top-1/4 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl z-1 animate-pulse" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl z-1" />

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto text-center z-10 text-white space-y-6">
        {/* Visual Badge Display */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-xs font-semibold tracking-wider text-orange-400 transition-colors"
        >
          <Award className="w-4 h-4 text-orange-400" />
          <span>ENTERPRISE IT & MISSION CRITICAL CLIMATE CONTROLS</span>
        </motion.div>

        {/* Display Typography Header */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none uppercase"
        >
          Enterprise IT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-orange-400">
            Made Simple
          </span>
        </motion.h1>

        {/* Descriptive Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed"
        >
          Zentricore IT Solutions deliver cutting-edge Enterprise IT Services by providing IT Infrastructure, Unified Communications, Cloud Solutions, Managed Backup, Business Continuity, & IT Consulting Solutions.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap justify-center items-center gap-4 pt-4"
        >
          <button
            onClick={() => {
              const el = document.getElementById("zentricore-about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-lg shadow-teal-600/30 hover:shadow-teal-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group"
          >
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            About Us
          </button>
          
          <button
            onClick={onScrollToContact}
            className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800/100 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-orange-400" />
            Get A Proposal
          </button>
        </motion.div>

        {/* Navigation Breadcrumb Trail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-900/60 backdrop-blur-sm border border-white/5 rounded-full text-xs text-slate-400 font-medium">
            <span className="hover:text-white transition-colors cursor-pointer">Zentricore</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="hover:text-white transition-colors cursor-pointer">IT & Climate Systems</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-teal-400 font-semibold">Enterprise Solutions</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
