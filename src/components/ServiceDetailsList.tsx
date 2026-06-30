import { motion } from "motion/react";
import { Check, Settings, ShieldCheck, HeartPulse, Building2, Server, Wrench, Wind, Laptop, Cloud, Database } from "lucide-react";
import { SERVICES } from "../data";

interface ServiceDetailsListProps {
  activeSectionId: string | null;
}

export default function ServiceDetailsList({ activeSectionId }: ServiceDetailsListProps) {
  // Map raw string labels to Lucide Icons
  const getIcon = (name: string) => {
    switch (name) {
      case "Wind":
        return <Wind className="w-5 h-5 text-teal-600" />;
      case "Building2":
        return <Building2 className="w-5 h-5 text-teal-600" />;
      case "Server":
        return <Server className="w-5 h-5 text-teal-600" />;
      case "Laptop":
        return <Laptop className="w-5 h-5 text-teal-600" />;
      case "Cloud":
        return <Cloud className="w-5 h-5 text-teal-600" />;
      default:
        return <Settings className="w-5 h-5 text-teal-600" />;
    }
  };

  // Only spotlight 4 key pillars on the homepage to avoid cluttering with 25 rows
  const spotlightServices = SERVICES.filter(srv => 
    ["it-infrastructure", "endpoint-security", "azure-services", "air-conditioning-installation"].includes(srv.id)
  );

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100 px-4" id="zentrix-services-details">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
            Engineering Layouts
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase">
            Systems Engineering Specifications
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Review detailed operational profiles, efficiency quotients, and technical capabilities of our four core divisions.
          </p>
        </div>

        <div className="space-y-12">
          {spotlightServices.map((srv, index) => {
            const isHighlighted = activeSectionId === srv.id;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                id={`details-card-${srv.id}`}
                key={srv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`rounded-3xl border transition-all duration-500 overflow-hidden bg-white grid grid-cols-1 lg:grid-cols-12 gap-0 ${
                  isHighlighted
                    ? "border-teal-500 ring-2 ring-teal-500/20 shadow-2xl scale-[1.01]"
                    : "border-slate-100 shadow-md hover:shadow-lg hover:border-slate-200"
                }`}
              >
                {/* Alternating Image layout column */}
                <div
                  className={`lg:col-span-5 h-64 sm:h-80 lg:h-full min-h-[250px] relative overflow-hidden bg-slate-100 ${
                    isEven ? "lg:order-first" : "lg:order-last"
                  }`}
                >
                  <img
                    src={srv.imageUrl}
                    alt={srv.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {srv.badge && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-800 to-teal-700 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                      {srv.badge}
                    </div>
                  )}
                </div>

                {/* Alternating Text details column */}
                <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-100 font-bold">
                      {getIcon(srv.iconName)}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
                      {srv.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {srv.longDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {srv.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold"
                      >
                        <div className="w-5 h-5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-teal-600" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
