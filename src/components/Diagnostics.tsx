import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, AlertTriangle, RefreshCw, ChevronRight, Activity, Clock, FileText } from "lucide-react";
import { DIAGNOSTIC_QUESTIONS } from "../data";

interface DiagnosticsProps {
  onScheduleEmergency: (symptomLabel: string) => void;
}

export default function Diagnostics({ onScheduleEmergency }: DiagnosticsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { label: string; score: number }>>({});
  const [completed, setCompleted] = useState(false);

  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (value: string, label: string, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { label, score },
    }));

    if (currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetDiagnostics = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setCompleted(false);
  };

  const totalScore = (Object.values(answers) as { label: string; score: number }[]).reduce(
    (sum, item) => sum + item.score,
    0
  );

  // Derive risk assessment based on accumulated scores
  let riskLevel: "low" | "medium" | "high" = "low";
  let riskTitle = "Normal Wear / Maintenance Due";
  let riskColor = "text-emerald-600 bg-emerald-50 border-emerald-100";
  let riskIcon = <ShieldCheck className="w-12 h-12 text-emerald-600" />;
  let recommendation = "Your air conditioner is likely in a safe operating window. Replacing clogged air filters, scrubbing coils, and booking a seasonal maintenance check is sufficient to prevent major issues.";

  if (totalScore >= 8) {
    riskLevel = "high";
    riskTitle = "High Alert - Emergency Risk Identified";
    riskColor = "text-red-600 bg-red-50 border-red-100";
    riskIcon = <AlertTriangle className="w-12 h-12 text-red-600 animate-bounce" />;
    recommendation = "Our analysis suggests critical internal failures like low refrigerant charge, electrical fan motor failure, or frozen evaporator coils. Continued operation may permanently damage the compressor. We suggest turning off the thermostat breaker immediately and scheduling an emergency dispatch.";
  } else if (totalScore >= 5) {
    riskLevel = "medium";
    riskTitle = "Medium Warning - Efficiency Degrading";
    riskColor = "text-amber-600 bg-amber-50 border-amber-100";
    riskIcon = <AlertTriangle className="w-12 h-12 text-amber-500" />;
    recommendation = "Your system has notable signs of performance degradation. High electricity costs, clogged filters, or worn capacitors are reducing your cooling efficiency. Booking a comprehensive professional assessment is recommended within the week to avoid complete system downtime.";
  }

  const selectedSymptom = answers["symptom"]?.label || "HVAC Issues";

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden" id="zentrix-diagnostics">
      {/* Tab Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-teal-400" />
          <div>
            <h3 className="font-bold text-lg">Zentricore IT & HVAC Diagnostics</h3>
            <p className="text-xs text-slate-400">Interactive Air Conditioning Health Check</p>
          </div>
        </div>
        {!completed && (
          <div className="text-xs bg-slate-800 text-teal-400 px-3 py-1 rounded-full border border-teal-500/20 font-mono">
            Step {currentQuestionIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 min-h-[340px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 flex-1"
            >
              <h4 className="text-slate-900 font-bold text-base md:text-lg leading-relaxed">
                {currentQuestion.text}
              </h4>

              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((opt, idx) => (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    key={idx}
                    onClick={() => handleSelectOption(opt.value, opt.label, opt.score)}
                    className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-teal-500 hover:bg-teal-50/20 text-slate-700 hover:text-slate-900 font-medium text-sm transition-all flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 flex-1 flex flex-col justify-between text-center md:text-left"
            >
              <div className="md:flex md:items-start gap-6">
                <div className="flex justify-center md:block flex-shrink-0 mb-4 md:mb-0">
                  {riskIcon}
                </div>
                <div className="space-y-3 flex-1">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${riskColor}`}>
                    {riskTitle}
                  </div>
                  <h4 className="text-slate-900 font-bold text-xl">
                    Health Check Analysis Completed
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {recommendation}
                  </p>
                </div>
              </div>

              {/* Assessment Summary list */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="flex gap-2.5 items-start">
                  <Activity className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Reported Issue</span>
                    <span className="text-xs font-semibold text-slate-700 block truncate max-w-[150px]">
                      {answers["symptom"]?.label.split("/")[0] || "None"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Unit Age Span</span>
                    <span className="text-xs font-semibold text-slate-700 block">
                      {answers["age"]?.label || "None"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Filter Hygiene</span>
                    <span className="text-xs font-semibold text-slate-700 block">
                      {answers["filters"]?.label || "None"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={resetDiagnostics}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Run Diagnostics Again
                </button>

                {riskLevel === "high" || riskLevel === "medium" ? (
                  <button
                    onClick={() => onScheduleEmergency(selectedSymptom)}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-red-100 flex items-center gap-1.5"
                    id="schedule-emergency-btn"
                  >
                    Schedule Emergency Dispatch
                  </button>
                ) : (
                  <button
                    onClick={() => onScheduleEmergency("Regular Maintenance Schedule")}
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-teal-100 flex items-center gap-1.5"
                    id="schedule-maintenance-btn"
                  >
                    Book Preventive Clean
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
