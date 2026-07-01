import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Accessibility, 
  X, 
  Type, 
  Eye, 
  Volume2, 
  Activity, 
  Link, 
  RotateCcw, 
  Check, 
  Info 
} from "lucide-react";

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // States with LocalStorage persistence
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">(() => {
    return (localStorage.getItem("access-font-size") as any) || "normal";
  });
  const [contrast, setContrast] = useState<"normal" | "high" | "grayscale">(() => {
    return (localStorage.getItem("access-contrast") as any) || "normal";
  });
  const [dyslexiaFont, setDyslexiaFont] = useState(() => {
    return localStorage.getItem("access-dyslexia") === "true";
  });
  const [highlightLinks, setHighlightLinks] = useState(() => {
    return localStorage.getItem("access-highlight-links") === "true";
  });
  const [reduceMotion, setReduceMotion] = useState(() => {
    return localStorage.getItem("access-reduce-motion") === "true";
  });
  const [textToSpeech, setTextToSpeech] = useState(() => {
    return localStorage.getItem("access-tts") === "true";
  });

  // Apply Font Size changes
  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === "large") {
      root.style.fontSize = "18px";
    } else if (fontSize === "xlarge") {
      root.style.fontSize = "20px";
    } else {
      root.style.fontSize = "16px";
    }
    localStorage.setItem("access-font-size", fontSize);
  }, [fontSize]);

  // Apply Contrast changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("accessibility-high-contrast", "accessibility-grayscale");
    
    if (contrast === "high") {
      root.classList.add("accessibility-high-contrast");
    } else if (contrast === "grayscale") {
      root.classList.add("accessibility-grayscale");
    }
    localStorage.setItem("access-contrast", contrast);
  }, [contrast]);

  // Apply Dyslexia Font
  useEffect(() => {
    const root = document.documentElement;
    if (dyslexiaFont) {
      root.classList.add("accessibility-dyslexia");
    } else {
      root.classList.remove("accessibility-dyslexia");
    }
    localStorage.setItem("access-dyslexia", dyslexiaFont.toString());
  }, [dyslexiaFont]);

  // Apply Link Highlights
  useEffect(() => {
    const root = document.documentElement;
    if (highlightLinks) {
      root.classList.add("accessibility-highlight-links");
    } else {
      root.classList.remove("accessibility-highlight-links");
    }
    localStorage.setItem("access-highlight-links", highlightLinks.toString());
  }, [highlightLinks]);

  // Apply Reduce Motion
  useEffect(() => {
    const root = document.documentElement;
    if (reduceMotion) {
      root.classList.add("accessibility-reduce-motion");
    } else {
      root.classList.remove("accessibility-reduce-motion");
    }
    localStorage.setItem("access-reduce-motion", reduceMotion.toString());
  }, [reduceMotion]);

  // Text to Speech hover assistant logic
  useEffect(() => {
    if (!textToSpeech) {
      window.speechSynthesis?.cancel();
      return;
    }

    let lastText = "";
    const handleMouseOver = (e: MouseEvent) => {
      if (!window.speechSynthesis) return;

      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.tagName === "H1" || 
        target.tagName === "H2" || 
        target.tagName === "H3" || 
        target.tagName === "H4" || 
        target.tagName === "P" || 
        target.getAttribute("role") === "button" ||
        target.closest("button") || 
        target.closest("a");

      if (isInteractive) {
        const textToSpeak = target.innerText?.trim();
        if (textToSpeak && textToSpeak !== lastText && textToSpeak.length < 200) {
          lastText = textToSpeak;
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          utterance.rate = 1.05;
          window.speechSynthesis.speak(utterance);
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      window.speechSynthesis?.cancel();
    };
  }, [textToSpeech]);

  // Reset all settings
  const handleReset = () => {
    setFontSize("normal");
    setContrast("normal");
    setDyslexiaFont(false);
    setHighlightLinks(false);
    setReduceMotion(false);
    setTextToSpeech(false);
    
    // Play sound notification if audio feedback is desired
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Accessibility profiles cleared to standard defaults");
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Universal Floating Launcher Widget */}
      <div className="fixed bottom-24 left-6 z-45" id="accessibility-root">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-3.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white rounded-full shadow-2xl border border-sky-500/30 cursor-pointer flex items-center justify-center transition-all duration-300 group"
          aria-label="Toggle Accessibility Menu"
          title="Accessibility Suite"
          id="accessibility-launcher-btn"
        >
          <Accessibility className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="sr-only">Accessibility Menu</span>
        </motion.button>
      </div>

      {/* Floating Panel Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click-away backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950 z-40 cursor-default"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50, x: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50, x: -20 }}
              className="fixed bottom-40 left-6 z-45 w-[330px] md:w-[360px] max-h-[75vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl text-white font-sans"
              id="accessibility-panel"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-sky-500/10 rounded-lg text-sky-400">
                    <Accessibility className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight text-white uppercase">Accessibility Suite</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Customise your viewing profile</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Info */}
              <div className="bg-sky-500/5 border border-sky-500/10 rounded-xl p-3 mb-4 flex gap-2">
                <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-300 leading-relaxed font-semibold">
                  These filters persist across your browser sessions automatically for seamless enterprise viewing.
                </p>
              </div>

              {/* Menu Categories */}
              <div className="space-y-4">
                
                {/* 1. Font Size Multiplier */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                    <Type className="w-3.5 h-3.5 text-sky-400" /> Font Size Scale
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { key: "normal", label: "Default" },
                      { key: "large", label: "Large" },
                      { key: "xlarge", label: "Extra Large" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setFontSize(opt.key as any)}
                        className={`py-2 px-1 text-xs rounded-xl font-bold uppercase transition-all duration-200 border cursor-pointer ${
                          fontSize === opt.key
                            ? "bg-sky-600 border-sky-500 text-white shadow-md shadow-sky-500/10"
                            : "bg-slate-800/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Visual Contrast Mode */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                    <Eye className="w-3.5 h-3.5 text-sky-400" /> Color Contrast
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { key: "normal", label: "Default" },
                      { key: "high", label: "High Contrast" },
                      { key: "grayscale", label: "Grayscale" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setContrast(opt.key as any)}
                        className={`py-2 px-1 text-xs rounded-xl font-bold uppercase transition-all duration-200 border cursor-pointer ${
                          contrast === opt.key
                            ? "bg-sky-600 border-sky-500 text-white shadow-md shadow-sky-500/10"
                            : "bg-slate-800/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggles */}
                <div className="border-t border-slate-800/80 pt-4 space-y-3">
                  
                  {/* 3. Dyslexia Friendly Text */}
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-xs font-bold text-white block">Dyslexia-Friendly Font</span>
                      <span className="text-[10px] text-slate-400 block font-semibold">Broad letter spacing & high readability</span>
                    </div>
                    <button
                      onClick={() => setDyslexiaFont(!dyslexiaFont)}
                      className={`w-12 h-6 rounded-full p-1 transition-all duration-200 cursor-pointer ${
                        dyslexiaFont ? "bg-sky-500" : "bg-slate-700"
                      }`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transition-all duration-200 ${
                        dyslexiaFont ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* 4. Highlight Interactive Links */}
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-xs font-bold text-white block">Highlight Interactivity</span>
                      <span className="text-[10px] text-slate-400 block font-semibold">Adds safety outlines on links & buttons</span>
                    </div>
                    <button
                      onClick={() => setHighlightLinks(!highlightLinks)}
                      className={`w-12 h-6 rounded-full p-1 transition-all duration-200 cursor-pointer ${
                        highlightLinks ? "bg-sky-500" : "bg-slate-700"
                      }`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transition-all duration-200 ${
                        highlightLinks ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* 5. Audio Screen Reader hover guidance */}
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-xs font-bold text-white block flex items-center gap-1">
                        Screen Reader Voice <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                      </span>
                      <span className="text-[10px] text-slate-400 block font-semibold">Reads out text as you hover over it</span>
                    </div>
                    <button
                      onClick={() => setTextToSpeech(!textToSpeech)}
                      className={`w-12 h-6 rounded-full p-1 transition-all duration-200 cursor-pointer ${
                        textToSpeech ? "bg-sky-500" : "bg-slate-700"
                      }`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transition-all duration-200 ${
                        textToSpeech ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                  {/* 6. Block Motion & Transitions */}
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-xs font-bold text-white block flex items-center gap-1">
                        Reduce Motion <Activity className="w-3.5 h-3.5 text-sky-400" />
                      </span>
                      <span className="text-[10px] text-slate-400 block font-semibold">Disables parallax & sliding animations</span>
                    </div>
                    <button
                      onClick={() => setReduceMotion(!reduceMotion)}
                      className={`w-12 h-6 rounded-full p-1 transition-all duration-200 cursor-pointer ${
                        reduceMotion ? "bg-sky-500" : "bg-slate-700"
                      }`}
                    >
                      <div className={`bg-white w-4 h-4 rounded-full shadow-md transition-all duration-200 ${
                        reduceMotion ? "translate-x-6" : "translate-x-0"
                      }`} />
                    </button>
                  </div>

                </div>

              </div>

              {/* Reset to standard profile */}
              <div className="border-t border-slate-800/80 pt-4 mt-4 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Standard Defaults</span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[11px] font-extrabold uppercase text-rose-400 hover:text-rose-300 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Profile
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
