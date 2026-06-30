import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, SlidersHorizontal, Eye, Network, Laptop, ShieldCheck, Cpu, Database, Snowflake } from "lucide-react";
import { SERVICES, ExtendedServiceCard } from "../data";

interface ServicesGridProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServicesGrid({ onSelectService }: ServicesGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const tags = [
    { value: "all", label: "All Solutions" },
    { value: "msp", label: "IT & MSP" },
    { value: "cloud", label: "Cloud Services" },
    { value: "solutions", label: "Procurements" },
    { value: "voip", label: "IP Telephony" },
    { value: "hvac", label: "HVAC & Lab" }
  ];

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      // Apply category tab filtering
      if (selectedTag !== "all" && service.category !== selectedTag) {
        return false;
      }

      // Apply search query
      const matchSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchSearch;
    });
  }, [searchQuery, selectedTag]);

  // Map category to aesthetic color highlights
  const catColorMap: Record<string, string> = {
    msp: "bg-teal-50 border-teal-100 text-teal-700",
    cloud: "bg-sky-50 border-sky-100 text-sky-700",
    solutions: "bg-indigo-50 border-indigo-100 text-indigo-700",
    voip: "bg-purple-50 border-purple-100 text-purple-700",
    critical: "bg-rose-50 border-rose-100 text-rose-700",
    hvac: "bg-emerald-50 border-emerald-100 text-emerald-700"
  };

  return (
    <section className="py-20 px-4 bg-white scroll-mt-10" id="zentrix-services-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            Enterprise Solutions Catalog
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none uppercase">
            Certified IT Infrastructure & Engineering Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Explore our comprehensive, turn-key catalog. We deliver expert installations, 24/7 proactive monitoring, cloud modernization, and precision environmental systems.
          </p>
        </div>

        {/* Live Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
          {/* Tag Pills */}
          <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start w-full lg:w-auto">
            {tags.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setSelectedTag(tag.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                  selectedTag === tag.value
                    ? "bg-teal-700 text-white shadow-md shadow-teal-700/10 font-extrabold"
                    : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-150"
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search 25+ services (e.g. azure, backup)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none text-xs font-semibold text-slate-700 bg-white shadow-inner"
            />
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredServices.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-24 bg-slate-50 border border-dashed border-slate-200 rounded-3xl"
              >
                <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-700 text-sm">No solutions match your search</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting your filters or resetting the search query to explore the catalog.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag("all");
                  }}
                  className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              filteredServices.map((service) => {
                const colorPill = catColorMap[service.category] || catColorMap.msp;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={service.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-500/30 transition-all duration-300 group flex flex-col justify-between"
                  >
                    {/* Image Header Wrap */}
                    <div className="overflow-hidden relative h-44 bg-slate-100 flex-shrink-0">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-[10px] uppercase font-bold text-teal-400 flex items-center gap-1 bg-slate-950/80 px-2.5 py-1 rounded-md border border-teal-500/20">
                          <Sparkles className="w-3 h-3 text-orange-400" /> Click to view page
                        </span>
                      </div>
                      <span className={`absolute top-3 left-3 font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm border ${colorPill}`}>
                        {service.badge || "Core Service"}
                      </span>
                    </div>

                    {/* Card Content body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-teal-700 transition-colors uppercase tracking-tight leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onSelectService(service.id)}
                          className="text-xs font-bold text-teal-700 hover:text-teal-600 transition-colors flex items-center gap-1 group/btn"
                        >
                          <Eye className="w-4 h-4 text-teal-600" /> Service Overview &rarr;
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
