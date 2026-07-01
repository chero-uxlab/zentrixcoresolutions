import { motion } from "motion/react";
import { Rocket, Users, Lightbulb, Award } from "lucide-react";

export default function AboutSection() {
  const cards = [
    {
      icon: <Rocket className="w-10 h-10 text-teal-600" />,
      title: "Modern Solutions",
      desc: "Modern day IT Services for your business. We deliver todays solution that impact your organization future."
    },
    {
      icon: <Users className="w-10 h-10 text-teal-600" />,
      title: "Teamwork",
      desc: "We emphasize on commitment to common goals based on open and honest communication"
    },
    {
      icon: <Lightbulb className="w-10 h-10 text-teal-600" />,
      title: "Innovation",
      desc: "We embrace new technology to create opportunities that deliver value to organizations we serve"
    },
    {
      icon: <Award className="w-10 h-10 text-teal-600" />,
      title: "Professionalism",
      desc: "We take pride in producing high-quality work and delivering exceptional services to our clients."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100 scroll-mt-20" id="zentrixcore-about">
      <div className="max-w-7xl mx-auto px-4">
        {/* Split Header layout with themed image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
              Enterprise IT Services & Consulting
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight uppercase">
              We Help Organizations Scale Their Operations via IT Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              Zentrixcore IT Solutions is an IT Managed Service Provider, delivering Enterprise IT Services and Business IT solutions globally. Incorporating the best skills, expertise and technologies, we maximize efficiency and returns through technology investments.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
              We understand each business is dynamic with varying needs, from organizations with simple IT requirements to giant corporations with complex IT needs. Our customized system design process guarantees seamless scaling with absolute cybersecurity defense.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs font-semibold uppercase text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>24/7/365 Proactive Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>SLA-Backed Technical Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Certified Systems Engineers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span>Zero-Downtime Migration Paths</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Theme colored gradient backglow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-white rounded-2xl overflow-hidden border border-slate-150 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                  alt="Zentrixcore Managed IT Engineering Team"
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Visual overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
                {/* Stats badge overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-center justify-between text-white">
                  <div>
                    <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Global Support</p>
                    <p className="text-sm font-black uppercase">Active Operations</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-teal-400 font-mono">99.99%</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">Uptime SLA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center space-y-4"
            >
              <div className="p-4 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors duration-300">
                {card.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
