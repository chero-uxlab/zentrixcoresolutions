import { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("zentricore_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(
      "zentricore_cookie_consent",
      JSON.stringify({ accepted: true, date: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(
      "zentricore_cookie_consent",
      JSON.stringify({ accepted: false, date: new Date().toISOString() })
    );
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          className="fixed bottom-0 inset-x-0 bg-white border-t-2 border-teal-600 shadow-2xl z-40 p-5 sm:p-6"
          id="cookie-consent-banner"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans">
            <div className="flex gap-3 items-start max-w-3xl">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600 flex-shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h5 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">
                  We Value Your Privacy
                </h5>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  We use cookies to analyze web traffic, enhance browsing performance, and customize your technical support experiences. By agreeing, you consent to our security auditing cookies. Read our <a href="#" className="text-teal-600 underline font-bold">Privacy Statement</a>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold uppercase tracking-widest transition-colors shadow-sm shadow-teal-600/10"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-[11px] font-bold uppercase tracking-widest transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
