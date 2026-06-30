import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { ExtendedServiceCard } from "../data";
import { Star, Shield, Award, AwardIcon, PhoneCall, CheckCircle2, ArrowLeft } from "lucide-react";

interface ServiceLandingPageProps {
  service: ExtendedServiceCard;
  onGoBack: () => void;
  onScrollToContact: () => void;
  onPreFillContact: (message: string) => void;
}

// Helper to resolve icon components dynamically
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // Fallback to Settings if icon doesn't exist
  const IconComponent = (Icons as any)[name] || Icons.Settings;
  return <IconComponent className={className} />;
};

export default function ServiceLandingPage({
  service,
  onGoBack,
  onScrollToContact,
  onPreFillContact,
}: ServiceLandingPageProps) {
  
  // Custom statistics per service category
  const statsMap: Record<string, { val: string; lbl: string }[]> = {
    msp: [
      { val: "500+", lbl: "Deployments Secured" },
      { val: "15+", lbl: "Years Experience" },
      { val: "99.9%", lbl: "Uptime Guaranteed" },
      { val: "24/7", lbl: "Active Monitoring" }
    ],
    cloud: [
      { val: "100%", lbl: "Data Integrity" },
      { val: "10+", lbl: "SaaS Systems Synced" },
      { val: "40%", lbl: "Average Bill Savings" },
      { val: "24/7", lbl: "Cloud Engineering" }
    ],
    solutions: [
      { val: "Dell", lbl: "Gold Partner Tier" },
      { val: "3-Yr", lbl: "Hardware Warranty" },
      { val: "10G", lbl: "Core Fiber Speeds" },
      { val: "NBD", lbl: "Next-Day Replacements" }
    ],
    voip: [
      { val: "99.99%", lbl: "Telephony SLA" },
      { val: "0ms", lbl: "Call Switch Lag" },
      { val: "Yealink", lbl: "Certified Provision" },
      { val: "2x", lbl: "Bandwidth Failover" }
    ],
    critical: [
      { val: "CRAC", lbl: "Thermal Management" },
      { val: "N+1", lbl: "Power Redundancy" },
      { val: "4-Hr", lbl: "Dispatch Response" },
      { val: "99.999%", lbl: "Absolute Uptime" }
    ],
    hvac: [
      { val: "EPA", lbl: "Certified Engineers" },
      { val: "24-Hr", lbl: "Emergency Dispatch" },
      { val: "R32", lbl: "Eco-Refrigerants" },
      { val: "100%", lbl: "Airflow Certification" }
    ]
  };

  const currentStats = statsMap[service.category] || statsMap.msp;

  // Custom testimonials per service
  const baseTestimonial = {
    text: `The team at ZENTRICORE configured our ${service.title} without any disruption to our daily operations. Their attention to detail, proactive response SLA, and professionalism are unmatched.`,
    author: "James Mwangi",
    role: `IT Director, Corporate Logistics`,
    avatar: "JM"
  };

  const handleRequestProposal = () => {
    const message = `I am interested in your "${service.title}" solutions.\nSpecifically, I'd like to get more information on:\n${service.features.map(f => `- ${f}`).join("\n")}\nPlease contact me with a custom corporate proposal estimate.`;
    onPreFillContact(message);
    onScrollToContact();
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-12 select-none">
      {/* Breadcrumb / Top Bar */}
      <div className="bg-slate-100 border-b border-slate-200 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onGoBack}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest hidden md:block">
            ZENTRICORE &gt; {service.category.toUpperCase()} &gt; <span className="text-teal-700">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-20 px-4">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('${service.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-6">
          <span className="inline-block text-[10px] font-extrabold tracking-widest text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full uppercase border border-orange-400/25">
            {service.badge || "Corporate Solutions"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-slate-100">
            {service.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {service.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={handleRequestProposal}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all hover:-translate-y-0.5"
            >
              Get Service Proposal
            </button>
            <a
              href="tel:+1234567890"
              className="px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-orange-400" /> Call +1-234-567-890
            </a>
          </div>
        </div>
      </section>

      {/* Statistics Strip */}
      <section className="bg-gradient-to-r from-teal-900 to-slate-900 py-8 px-4 text-white border-y border-white/5 shadow-md">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {currentStats.map((st, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl sm:text-4xl font-black text-orange-400 font-mono tracking-tight">
                {st.val}
              </div>
              <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
                {st.lbl}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Overview Block */}
      <section className="py-16 px-4 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
            What We Offer
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase">
            Comprehensive {service.title} Solutions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            {service.longDescription}
          </p>
        </div>

        {/* 4 Cards Grid - dynamically mapped from features list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.features.map((feature, i) => {
            const fallbackIcons = ["ShieldCheck", "Settings", "Activity", "Wrench"];
            const iconName = service.detailedSections?.[i % 2]?.iconName || fallbackIcons[i % 4];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 mb-4 group-hover:scale-105 transition-transform">
                  <DynamicIcon name={iconName} className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight mb-2">
                  {feature.split(" / ")[0].split(" with ")[0].split(" to ")[0]}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {feature}. Designed specifically for commercial scaling, security conformity, and reliable failover bounds.
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Alternate Details Block */}
      {service.detailedSections && service.detailedSections.length > 0 && (
        <section className="py-16 bg-slate-100 border-y border-slate-200 px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-widest bg-teal-50 border border-teal-100 px-3 py-1 rounded-full">
                Service Details
              </span>
              <h2 className="text-2xl font-black text-slate-900 uppercase">
                How We Deliver Excellence
              </h2>
            </div>

            <div className="space-y-12">
              {service.detailedSections.map((sec, i) => (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-800 to-slate-950 flex items-center justify-center text-white shadow-lg shrink-0">
                    <DynamicIcon name={sec.iconName} className="w-10 h-10 text-orange-400" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">
                      {sec.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {sec.desc}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {sec.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service-Specific Testimonials */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-4 left-6 text-slate-100 font-serif text-8xl select-none pointer-events-none">
            “
          </div>
          <div className="space-y-6 relative z-10">
            <div className="flex justify-center gap-1 text-orange-400">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <blockquote className="text-slate-700 italic text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              "{baseTestimonial.text}"
            </blockquote>
            <div className="flex items-center justify-center gap-3 pt-2">
              <div className="w-11 h-11 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-sm shadow">
                {baseTestimonial.avatar}
              </div>
              <div className="text-left leading-none">
                <div className="font-extrabold text-slate-950 text-xs sm:text-sm uppercase tracking-tight">{baseTestimonial.author}</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{baseTestimonial.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-950 to-slate-900 text-white py-16 px-4 text-center rounded-3xl max-w-7xl mx-auto relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-radial-gradient" />
        <div className="space-y-6 relative z-10 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            Ready to secure your setup?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Contact our engineering specialists today to receive a tailored, detailed corporate proposal. Free baseline assessment included.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={handleRequestProposal}
              className="px-6 py-3 bg-white text-teal-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-orange-400 hover:text-white transition-all shadow-md"
            >
              Request Free Proposal
            </button>
            <a
              href="tel:+1234567890"
              className="px-6 py-3 bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              +1-234-567-890
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 text-slate-400 pt-8 border-t border-white/10 text-xs font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-orange-400" /> Licensed & Insured</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-orange-400" /> Industry Certified</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-orange-400" /> 24/7 Monitored</span>
          </div>
        </div>
      </section>
    </div>
  );
}
