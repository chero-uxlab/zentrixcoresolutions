import { motion } from "motion/react";
import { CheckCircle2, History, Users2, ShieldCheck } from "lucide-react";

export default function StatsBar() {
  const stats = [
    {
      id: "installs",
      number: "500+",
      label: "Installations Completed",
      subtext: "Enterprise Facilities & Offices",
      icon: <CheckCircle2 className="w-5 h-5 text-orange-400" />,
    },
    {
      id: "exp",
      number: "15+",
      label: "Years Service Experience",
      subtext: "Founded globally since 2010",
      icon: <History className="w-5 h-5 text-orange-400" />,
    },
    {
      id: "sat",
      number: "98%",
      label: "Client Satisfaction",
      subtext: "Durable uptime guarantee",
      icon: <Users2 className="w-5 h-5 text-orange-400" />,
    },
    {
      id: "sla",
      number: "24/7",
      label: "Emergency SLA Support",
      subtext: "4-hour rapid technical dispatch",
      icon: <ShieldCheck className="w-5 h-5 text-orange-400" />,
    },
  ];

  return (
    <section className="bg-gradient-to-r from-slate-950 to-slate-900 py-10 px-4 border-y border-white/5 relative overflow-hidden">
      {/* Abstract geometric accents */}
      <div className="absolute top-0 right-0 w-64 h-full bg-teal-500/5 -skew-x-12 transform origin-top-right pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((st, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={st.id}
              className="text-center space-y-2 group"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:bg-teal-500/15 group-hover:border-teal-500/25 transition-all duration-300">
                {st.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-orange-400 tracking-tight font-mono leading-none">
                {st.number}
              </h3>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  {st.label}
                </p>
                <p className="text-[10px] text-slate-400">
                  {st.subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
