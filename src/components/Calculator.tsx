import { useState } from "react";
import { motion } from "motion/react";
import { Calculator as CalcIcon, Sparkles, AlertCircle, RefreshCw, Send, CheckCircle2, Server, Laptop, ShieldCheck, Cloud, Wind } from "lucide-react";

interface CalculatorProps {
  onPreFillContact: (message: string) => void;
}

export default function Calculator({ onPreFillContact }: CalculatorProps) {
  // General State variables
  const [suiteCategory, setSuiteCategory] = useState<"hvac" | "it" | "security" | "cloud">("it");
  const [scaleSize, setScaleSize] = useState(50); // represents sq ft/100 for HVAC, active endpoints for IT, etc.
  const [complexity, setComplexity] = useState("medium"); // "low", "medium", "high"
  const [includeProSupport, setIncludeProSupport] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Categories metadata
  const categoriesData = {
    it: {
      title: "Managed IT & Infrastructure Estimator",
      label: "Number of Active Workstations",
      min: 5,
      max: 500,
      step: 5,
      unit: "Workstations",
      complexityLabel: "Network & Server Complexity",
      complexityOpts: [
        { val: "low", label: "Simple LAN (No On-Prem Servers)", multiplier: 1.0 },
        { val: "medium", label: "Active Directory + Shared Storage", multiplier: 1.4 },
        { val: "high", label: "Multi-site + Virtualization Clusters", multiplier: 1.8 }
      ],
      supportLabel: "Include 24/7 Remote Helpdesk",
      supportCostPerUnit: 15,
      baseCostPerUnit: 45
    },
    security: {
      title: "Cybersecurity & Protection Estimator",
      label: "Number of Protected Endpoints & Servers",
      min: 10,
      max: 1000,
      step: 10,
      unit: "Endpoints",
      complexityLabel: "Target Protection Level",
      complexityOpts: [
        { val: "low", label: "Standard Cloud-Managed AV", multiplier: 1.0 },
        { val: "medium", label: "EDR Agent + 24/7 SOC Backing", multiplier: 1.6 },
        { val: "high", label: "Full MDR + SIEM + Email Phish Shield", multiplier: 2.5 }
      ],
      supportLabel: "Include Vulnerability Patch Management",
      supportCostPerUnit: 8,
      baseCostPerUnit: 18
    },
    cloud: {
      title: "Cloud Infrastructure & Migration Estimator",
      label: "Number of Server Nodes to Migrate/Host",
      min: 1,
      max: 100,
      step: 1,
      unit: "Server Nodes",
      complexityLabel: "Workload Migration Strategy",
      complexityOpts: [
        { val: "low", label: "Lift & Shift (Basic Replication)", multiplier: 1.0 },
        { val: "medium", label: "Hybrid AD Bridge + Cloud SQL Setup", multiplier: 1.5 },
        { val: "high", label: "Refactor to Containers & Microservices", multiplier: 2.2 }
      ],
      supportLabel: "Include Daily Immutable Backup & DR",
      supportCostPerUnit: 45,
      baseCostPerUnit: 120
    },
    hvac: {
      title: "HVAC Climate Sizing Estimator",
      label: "Approximate Facility Floor Space",
      min: 10, // x100 = 1000 sq ft
      max: 300, // x100 = 30,000 sq ft
      step: 10,
      unit: "sq. ft. (x100)",
      complexityLabel: "Building Space Utilization",
      complexityOpts: [
        { val: "low", label: "Standard Commercial Office Space", multiplier: 1.0 },
        { val: "medium", label: "High-Traffic Retail / Food Service", multiplier: 1.3 },
        { val: "high", label: "Mission Critical Server Room / Lab", multiplier: 1.9 }
      ],
      supportLabel: "Include Quarterly Preventive HVAC SLA",
      supportCostPerUnit: 5,
      baseCostPerUnit: 35
    }
  };

  const currentConfig = categoriesData[suiteCategory];
  const selectedComplexity = currentConfig.complexityOpts.find(o => o.val === complexity) || currentConfig.complexityOpts[1];

  // Mathematical pricing calculations
  const USD_TO_KSH = 130;
  const actualScale = suiteCategory === "hvac" ? scaleSize * 100 : scaleSize;
  const basePriceUSD = scaleSize * currentConfig.baseCostPerUnit * selectedComplexity.multiplier;
  const supportPriceUSD = includeProSupport ? scaleSize * currentConfig.supportCostPerUnit : 0;
  const basePrice = basePriceUSD * USD_TO_KSH;
  const supportPrice = supportPriceUSD * USD_TO_KSH;
  
  // Sizing details unique to categories
  let outputLeftTitle = "Performance Estimate";
  let outputLeftValue = "";
  let outputRightTitle = "Recommended SLA";
  let outputRightValue = "";

  if (suiteCategory === "it") {
    outputLeftTitle = "Required LAN Backbone";
    outputLeftValue = actualScale > 100 ? "10G Fiber Uplink" : "1G Cat6 Backbone";
    outputRightTitle = "Helpdesk Support Tier";
    outputRightValue = includeProSupport ? "Pro Active 24/7/365" : "Business Hours Only";
  } else if (suiteCategory === "security") {
    outputLeftTitle = "Simulated Threat Capture";
    outputLeftValue = "99.98% Anomaly Coverage";
    outputRightTitle = "SOC Threat Hunt Tier";
    outputRightValue = complexity === "high" ? "Live Immediate Block" : "Standard Automated";
  } else if (suiteCategory === "cloud") {
    outputLeftTitle = "Minimum Cloud Bandwidth";
    outputLeftValue = actualScale > 20 ? "Dedicated ExpressRoute" : "Secure IPsec Tunnel";
    outputRightTitle = "Disaster Recovery RTO";
    outputRightValue = includeProSupport ? "Sub-15 Minute Restore" : "Standard Next-Day";
  } else {
    // HVAC
    const btu = actualScale * (complexity === "high" ? 60 : 30);
    const tons = (btu / 12000).toFixed(1);
    outputLeftTitle = "Estimated Cooling Load";
    outputLeftValue = `${btu.toLocaleString()} BTU/h`;
    outputRightTitle = "Required HVAC Capacity";
    outputRightValue = `${tons} Tons of Cooling`;
  }

  const yearlySavings = Math.round(basePrice * 0.18);
  const totalEstimate = Math.round(basePrice + supportPrice);

  const formatKSh = (val: number) => {
    return "KSh " + Math.round(val).toLocaleString("en-KE");
  };

  const handleApplyToProposal = () => {
    let formattedMessage = `I would like to receive a formal corporate proposal for Zentrixcore services.\n`;
    formattedMessage += `Selected Category: ${currentConfig.title}\n`;
    formattedMessage += `- Scope: ${actualScale} ${currentConfig.unit}\n`;
    formattedMessage += `- Complexity Setup: ${selectedComplexity.label}\n`;
    formattedMessage += `- Add-on Option (${currentConfig.supportLabel}): ${includeProSupport ? "YES" : "NO"}\n`;
    formattedMessage += `- Estimated Monthly Rate: ${formatKSh(totalEstimate)}\n`;
    formattedMessage += `Please contact me to arrange an engineer survey and finalize pricing.`;

    onPreFillContact(formattedMessage);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden" id="zentrix-interactive-estimator">
      {/* Selector Tabs for major categories */}
      <div className="bg-slate-900 px-4 py-3 flex flex-wrap gap-1 border-b border-slate-800">
        <button
          onClick={() => { setSuiteCategory("it"); setScaleSize(50); setComplexity("medium"); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            suiteCategory === "it" ? "bg-teal-600 text-white font-extrabold" : "text-slate-400 hover:text-white"
          }`}
        >
          <Laptop className="w-3.5 h-3.5" /> Managed IT
        </button>
        <button
          onClick={() => { setSuiteCategory("security"); setScaleSize(100); setComplexity("medium"); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            suiteCategory === "security" ? "bg-indigo-600 text-white font-extrabold" : "text-slate-400 hover:text-white"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" /> Cybersecurity
        </button>
        <button
          onClick={() => { setSuiteCategory("cloud"); setScaleSize(10); setComplexity("medium"); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            suiteCategory === "cloud" ? "bg-sky-600 text-white font-extrabold" : "text-slate-400 hover:text-white"
          }`}
        >
          <Cloud className="w-3.5 h-3.5" /> Cloud Services
        </button>
        <button
          onClick={() => { setSuiteCategory("hvac"); setScaleSize(40); setComplexity("medium"); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            suiteCategory === "hvac" ? "bg-emerald-600 text-white font-extrabold" : "text-slate-400 hover:text-white"
          }`}
        >
          <Wind className="w-3.5 h-3.5" /> HVAC Cooling
        </button>
      </div>

      {/* Main Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Input Fields (7 columns) */}
        <div className="p-6 md:p-8 lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-tight">{currentConfig.title}</h3>
            <p className="text-xs text-slate-400">Interact with sliding parameters to estimate enterprise service rates.</p>
          </div>

          {/* Scale Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {currentConfig.label}
              </label>
              <span className="font-mono font-bold text-teal-700 text-sm bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-100">
                {actualScale.toLocaleString()} {currentConfig.unit}
              </span>
            </div>
            <input
              type="range"
              min={currentConfig.min}
              max={currentConfig.max}
              step={currentConfig.step}
              value={scaleSize}
              onChange={(e) => setScaleSize(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{currentConfig.min.toLocaleString()}</span>
              <span>{Math.round(currentConfig.max / 2).toLocaleString()}</span>
              <span>{currentConfig.max.toLocaleString()}</span>
            </div>
          </div>

          {/* Complexity Options */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {currentConfig.complexityLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentConfig.complexityOpts.map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setComplexity(opt.val)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                    complexity === opt.val
                      ? "border-teal-600 bg-teal-50/30 text-teal-900 ring-1 ring-teal-600 font-bold"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  <span className="uppercase text-[9px] font-black text-slate-400">{opt.val}</span>
                  <span className="mt-1 leading-snug">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Include Support Option */}
          <button
            onClick={() => setIncludeProSupport(prev => !prev)}
            className="w-full flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-150 text-left transition-colors hover:bg-slate-100/50"
          >
            <input
              type="checkbox"
              checked={includeProSupport}
              readOnly
              className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 accent-teal-600 mt-0.5"
            />
            <div>
              <span className="font-bold text-slate-800 text-xs block">{currentConfig.supportLabel}</span>
              <span className="text-[11px] text-slate-500 leading-normal block mt-0.5">
                Adds proactive security patch compliance, system optimizations, priority engineers, and NBD backup spare parts swapping schedules.
              </span>
            </div>
          </button>
        </div>

        {/* Right Output Dashboard (5 columns) */}
        <div className="p-6 md:p-8 lg:col-span-5 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-200 pb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-spin" style={{ animationDuration: '6s' }} /> Architectural Calculations
            </div>

            {/* Custom Output Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-250 shadow-sm">
                <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">{outputLeftTitle}</span>
                <span className="text-xs font-extrabold text-slate-800 block mt-1.5 leading-tight">{outputLeftValue}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-250 shadow-sm">
                <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">{outputRightTitle}</span>
                <span className="text-xs font-extrabold text-slate-800 block mt-1.5 leading-tight">{outputRightValue}</span>
              </div>
            </div>

            {/* Price Estimator Stack */}
            <div className="space-y-2 text-xs border-y border-slate-200 py-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Baseline Rate Cost:</span>
                <span className="font-mono font-semibold text-slate-800">{formatKSh(basePrice)} /mo</span>
              </div>
              {includeProSupport && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Pro-SLA Support Add-on:</span>
                  <span className="font-mono font-semibold text-slate-800">{formatKSh(supportPrice)} /mo</span>
                </div>
              )}
              <div className="flex justify-between text-slate-800 font-bold text-sm pt-2 border-t border-slate-100">
                <span>Estimated Contract Rate:</span>
                <span className="font-mono text-teal-700 text-base">{formatKSh(totalEstimate)} <span className="text-[10px] text-slate-400 font-sans">/mo</span></span>
              </div>
            </div>

            {/* Dynamic context warning info box */}
            <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl">
              <p className="text-[11px] text-teal-900 leading-normal">
                <strong>ZENTRIXCORE Impact:</strong> Consolidating your hardware procurement, MSP helpdesk, security layers, and HVAC servicing under one SLA saves an average of <strong>18%</strong> on total capital expenditure.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleApplyToProposal}
              disabled={formSubmitted}
              className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                formSubmitted
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:-translate-y-0.5"
              }`}
            >
              {formSubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Message Loaded in Inquiry!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Apply Estimate to Form
                </>
              )}
            </button>
            <div className="text-center text-[10px] text-slate-400 font-mono">
              *Preliminary estimator. Accurate quotes require diagnostic site audits.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
