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
    <section className="py-20 bg-slate-50 border-y border-slate-100 scroll-mt-20" id="zentricore-about">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
            Enterprise IT Services
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight uppercase">
            We Help Organizations Scale Their Operations via IT Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed pt-2">
            Zentricore IT Solutions is an IT Managed Service Provider, delivering Enterprise IT Services and Business IT solutions globally. Incorporating the best skills, expertise and technologies, maximize efficiency and returns through technology investments, we understand each business is dynamic with varying needs, from organizations with simple IT requirements to giant corporations with complex IT needs.
          </p>
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
