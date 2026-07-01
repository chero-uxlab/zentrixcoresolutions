import { motion } from "motion/react";
import { 
  Server, Bolt, ShieldAlert, Cpu, Cloud, Code, Headset, Tv, 
  Phone, Mail, CheckCircle, UserCheck, Settings, Laptop, 
  Maximize2, HardDrive, Lock, RotateCcw, Monitor
} from "lucide-react";

export default function MSPFeatures() {
  // 1. What We Do cards
  const whatWeDoList = [
    {
      icon: <Server className="w-8 h-8 text-white" />,
      title: "IT Infrastructure",
      desc: "Leading IT Services designed to install and Configure server rooms and networking racks to optimal operations.",
      bg: "bg-gradient-to-br from-slate-900 to-slate-800"
    },
    {
      icon: <Bolt className="w-8 h-8 text-white" />,
      title: "Critical Power Back Up Solutions",
      desc: "UPS power back up and Racks solutions for enterprise IT systems resilience. We deliver fallback solutions for optimal power.",
      bg: "bg-gradient-to-br from-amber-600 to-orange-500"
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-white" />,
      title: "Enterprise Cloud Security",
      desc: "Enterprise IT security using our Cloud Protect Solution. From EDR to Email Encryption Security.",
      bg: "bg-gradient-to-br from-indigo-900 to-purple-800"
    },
    {
      icon: <Cpu className="w-8 h-8 text-white" />,
      title: "Mission Critical IT Equipment",
      desc: "Among our IT Services, is Supply and delivery of Mission critical IT Equipment, Installation and configuration.",
      bg: "bg-gradient-to-br from-rose-700 to-red-500"
    }
  ];

  // 2. Success section cards
  const successCards = [
    {
      icon: <Server className="w-10 h-10 text-teal-600" />,
      title: "Server & Data Centers",
      desc: "We deliver server installation and your inhouse data center deployment."
    },
    {
      icon: <Cloud className="w-10 h-10 text-teal-600" />,
      title: "Cloud Data Backup",
      desc: "Corporate business continuity with cloud data backup and recovery services."
    },
    {
      icon: <Code className="w-10 h-10 text-teal-600" />,
      title: "Web Design",
      desc: "We help you take your business online through robust responsive websites."
    },
    {
      icon: <ShieldAlert className="w-10 h-10 text-teal-600" />,
      title: "Endpoint Security [EDR]",
      desc: "Secure your endpoints with our advanced security + EDR solutions for your network."
    },
    {
      icon: <Headset className="w-10 h-10 text-teal-600" />,
      title: "Managed IT Support",
      desc: "Optimal working IT Infrastructure is critical towards smooth operations."
    },
    {
      icon: <Tv className="w-10 h-10 text-teal-600" />,
      title: "Audio Visuals Solutions",
      desc: "Audio visual solutions including Interactive Smart Display boards & video wall screens."
    },
    {
      icon: <Phone className="w-10 h-10 text-teal-600" />,
      title: "IT Telephony [VoIP]",
      desc: "We get you talking over the internet. We configure your IP PBX, IP Phones & trunking."
    },
    {
      icon: <Mail className="w-10 h-10 text-teal-600" />,
      title: "Email Security Solutions",
      desc: "Enterprise email security solutions designed to protect your corporate communication."
    }
  ];

  // 3. Why Choose Us promise items
  const whyUsItems = [
    {
      icon: <CheckCircle className="w-9 h-9 text-orange-400" />,
      title: "Industry best practice",
      desc: "Following global standards"
    },
    {
      icon: <UserCheck className="w-9 h-9 text-orange-400" />,
      title: "Experienced Experts",
      desc: "Certified professionals"
    },
    {
      icon: <Headset className="w-9 h-9 text-orange-400" />,
      title: "Professional Support",
      desc: "24/7 dedicated team"
    },
    {
      icon: <Settings className="w-9 h-9 text-orange-400" />,
      title: "Innovative Solutions",
      desc: "Cutting-edge technology"
    },
    {
      icon: <Laptop className="w-9 h-9 text-orange-400" />,
      title: "Leading Technology",
      desc: "Enterprise-grade tools"
    },
    {
      icon: <Maximize2 className="w-9 h-9 text-orange-400" />,
      title: "Flexibility",
      desc: "Scalable for any size"
    }
  ];

  // 4. Backup features
  const backupFeatures = [
    {
      icon: <HardDrive className="w-8 h-8 text-teal-600 mt-1" />,
      title: "Flexible Backup Solutions",
      desc: "Backup solutions that deliver fully customizable file & folder backup plans for your business data protection, retention and storage requirements for Endpoints."
    },
    {
      icon: <Lock className="w-8 h-8 text-teal-600 mt-1" />,
      title: "Ransomware Protection & Recovery",
      desc: "Encrypt your data backups that ensure recovery during disaster. Your data is stored in cloud, locally and requires re-authentication and confirmation for any deletion of backups from the clouds."
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-teal-600 mt-1" />,
      title: "Multiple Restore Options",
      desc: "Restore files in various ways including web-based file restoration, bare-metal restore and more. We look to ensure you can minimize technician workload."
    },
    {
      icon: <Cloud className="w-8 h-8 text-teal-600 mt-1" />,
      title: "Cloud Based Solutions",
      desc: "Remotely configure and administer backups, set up smart scheduling, built-in compression, and block-level backups to protect your clients' data without impacting client networks."
    },
    {
      icon: <Monitor className="w-8 h-8 text-teal-600 mt-1" />,
      title: "Remote Monitoring & Management",
      desc: "Backup Solutions that is integrated to Remote management tools. This makes your IT Services even more efficient with a one stop monitoring dashboard."
    },
    {
      icon: <Laptop className="w-8 h-8 text-teal-600 mt-1" />,
      title: "Windows, Mac, and Server Backups",
      desc: "Our Backup provides the option to backup your Windows, MacOS and Server Endpoints. Protect your data locally, offsite or even on the Clouds using our IT Services."
    }
  ];

  // 5. Global Partners
  const partners = ["Microsoft", "Cisco", "VMware", "AWS", "Fortinet", "Veeam"];

  return (
    <div className="space-y-0">
      {/* SECTION 1: SERVICES (What We Do) */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
              What We Do
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none uppercase">
              | Custom IT Solutions for Your Business
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whatWeDoList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 p-8 bg-white border border-slate-200 rounded-xl hover:border-teal-500 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${item.bg}`}>
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: SUCCESS */}
      <section className="py-20 bg-slate-50 border-t border-slate-150">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
              Preparing For Your Business
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none uppercase">
              Success With Leading IT Services
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {successCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white p-8 rounded-2xl border border-slate-150 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center space-y-4"
              >
                <div className="p-3 bg-teal-50/50 rounded-xl">
                  {card.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US */}
      <section className="py-20 bg-gradient-to-br from-slate-950 to-slate-900 text-white scroll-mt-20" id="why-us">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20 inline-block">
              Why Choose Us
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-none uppercase">
              What We Promise | High Quality Trusted IT Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed pt-2">
              We believe each organization is dynamic with varying IT needs, from organizations with simple IT requirements to giant corporations with complex IT needs. Our IT Services portfolio, comprises of proven technologies, which brings tangible result, clearly underlining the difference in clients we interact with.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-6">
            {whyUsItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center space-y-3 hover:bg-white/10 transition-colors"
              >
                {item.icon}
                <h4 className="text-xs font-bold uppercase tracking-wide text-orange-400">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: BACKUP FEATURES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 space-y-3 text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
              Designed To Benefit Your Organization
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none uppercase">
              Data Backup & Recovery Solutions for Your Business Continuity Plan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {backupFeatures.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-4 p-6 bg-slate-50 border-l-4 border-teal-600 rounded-r-xl hover:bg-slate-100 transition-colors duration-300"
              >
                <div className="flex-shrink-0">
                  {feat.icon}
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: GLOBAL PARTNERS */}
      <section className="py-16 bg-slate-50 border-t border-slate-150 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          <div className="space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
              Our Global Partners
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-none uppercase">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
              We understand Technology and I.T is our work. Get smart solutions to scale your business growth. Zentrixcore IT Solutions is an IT Consultancy and Service provider bringing Enterprise IT solutions for businesses globally. Incorporating the best skills, expertise and technologies, maximize efficiency and returns through technology investments.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-2">
            {partners.map((partner, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="w-36 h-16 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center font-extrabold text-slate-850 tracking-wider text-xs uppercase hover:shadow-md hover:border-teal-400 transition-all duration-300 cursor-pointer"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
