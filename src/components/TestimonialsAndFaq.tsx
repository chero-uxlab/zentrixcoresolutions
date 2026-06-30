import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronDown, ChevronUp, MessageSquare, HelpCircle } from "lucide-react";
import { FAQS } from "../data";

export default function TestimonialsAndFaq() {
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="testimonials-and-faq-section">
      {/* Testimonials (5 cols) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-teal-600" />
          <h3 className="font-bold text-xl text-slate-900 tracking-tight">Client Case Reviews</h3>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex gap-1 text-orange-400 mb-3 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed mb-4">
              "ZENTRICORE transformed our office climate control. The VRF system installation was seamless, and our energy bills dropped by 35%. Their engineering team was professional from start to finish."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                MR
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Michael Rodriguez</h5>
                <p className="text-[10px] text-slate-400">Facilities Director, Apex Holdings</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex gap-1 text-orange-400 mb-3 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed mb-4">
              "Their data center cooling solution was exactly what we needed. The precision cooling units maintain perfect temperature, and the 24/7 monitoring gives us complete peace of mind."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                SK
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Sarah Kim</h5>
                <p className="text-[10px] text-slate-400">IT Infrastructure Lead, DataVault Inc</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex gap-1 text-orange-400 mb-3 text-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed mb-4">
              "The preventive maintenance contract has been a game-changer. We haven't had a single unexpected compressor failure in two years. Their service techs are certified and always on time."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-xs">
                JT
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">James Thompson</h5>
                <p className="text-[10px] text-slate-400">COO, MetroRetail Group</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs Accordion (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-teal-600" />
          <h3 className="font-bold text-xl text-slate-900 tracking-tight">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isExpanded = expandedFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-teal-700 transition-colors text-sm md:text-base focus:outline-none"
                >
                  <span>{faq.question}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="p-5 pt-0 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-50 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
