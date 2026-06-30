import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, BookOpen, Server, Shield, Cloud, HardDrive, Phone, Laptop, Key, ClipboardCheck, ArrowRight, Clock, Eye, ChevronRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  category: string;
  categoryKey: string;
  desc: string;
  content: string;
  readTime: string;
  views: number;
}

const CATEGORIES = [
  { key: "all", name: "All Articles", icon: BookOpen, count: 105, desc: "Explore entire library" },
  { key: "infrastructure", name: "IT Infrastructure", icon: Server, count: 24, desc: "Server setup, networking, cabling" },
  { key: "security", name: "Cybersecurity", icon: Shield, count: 18, desc: "Endpoint protection, compliance" },
  { key: "cloud", name: "Cloud Solutions", icon: Cloud, count: 15, desc: "Migration, Azure, Office 365" },
  { key: "backup", name: "Backup & Recovery", icon: HardDrive, count: 12, desc: "Disaster recovery, BDR, retention" },
  { key: "voip", name: "VoIP & Telecom", icon: Phone, count: 10, desc: "PBX, call centers, SIP trunks" },
  { key: "hardware", name: "Hardware Guide", icon: Laptop, count: 16, desc: "Servers, printers, workstation, UPS" },
  { key: "software", name: "Software & Licensing", icon: Key, count: 14, desc: "MS volume contracts, ERP systems" },
  { key: "best-practices", name: "IT Best Practices", icon: ClipboardCheck, count: 20, desc: "Audits, policies, checklist maps" },
];

const ARTICLES: Article[] = [
  {
    id: "kb-1",
    title: "How to Plan Your Server Room Layout for Optimal Cooling",
    category: "IT Infrastructure",
    categoryKey: "infrastructure",
    desc: "Learn the best practices for designing a server room layout that maximizes cooling efficiency, airflow management, and equipment accessibility for enterprise data centers.",
    readTime: "8 min read",
    views: 2341,
    content: "An optimal server room layout separates hot and cold air streams using a hot/cold aisle containment architecture. Rows of racks face each other so that cold air intakes pull chilled air from the cold aisle, and exhaust air is expelled into the hot aisle. Keep cable dressing neat under floor tiles to prevent static air pockets, and integrate real-time temperature and humidity sensors in critical rack zones to alert administrators prior to thermal throttling triggers."
  },
  {
    id: "kb-2",
    title: "Endpoint Security: EDR vs Traditional Antivirus Explained",
    category: "Cybersecurity",
    categoryKey: "security",
    desc: "Understand the key differences between modern Endpoint Detection and Response (EDR) solutions and traditional antivirus software, and why enterprises are making the switch.",
    readTime: "6 min read",
    views: 4892,
    content: "Traditional antivirus scans files based on known static signatures. Modern EDR (Endpoint Detection and Response) goes beyond signature verification by using behavioral AI analytics to monitor process operations in memory. EDR detects living-off-the-land attacks, zero-day payloads, and lateral movements inside networks. If suspicious activity occurs, EDR agents can isolate the compromised node immediately to prevent the propagation of ransomware across the active forest."
  },
  {
    id: "kb-3",
    title: "Microsoft 365 Migration Checklist for Enterprise Organizations",
    category: "Cloud Solutions",
    categoryKey: "cloud",
    desc: "A comprehensive step-by-step checklist for migrating your on-premise Exchange and file servers to Microsoft 365 with zero downtime and minimal user disruption.",
    readTime: "12 min read",
    views: 3156,
    content: "A successful Microsoft 365 migration requires pre-migration identity consolidation using Microsoft Entra Connect. Begin by auditing mailboxes and cleaning up outdated active directory accounts. Set up pilot user groups to test migration speeds and hybrid authentication paths. Configure DNS records (SPF, DKIM, and MX) prior to the weekend switch, and leverage automated secure data tools to sync remaining delta folders with zero business-hour disruptions."
  },
  {
    id: "kb-4",
    title: "3-2-1 Backup Strategy: Implementing a Robust BDR Plan",
    category: "Backup & Recovery",
    categoryKey: "backup",
    desc: "Discover the industry-standard 3-2-1 backup rule and how to implement it using modern cloud and local backup solutions for comprehensive business continuity.",
    readTime: "7 min read",
    views: 1987,
    content: "The 3-2-1 backup standard commands keeping: 3 copies of your business data, on 2 separate physical media formats, with 1 copy stored in an offsite cloud repository. For ransomware resilience, ensure the cloud tier uses immutable storage rules (Write Once Read Many). This blocks any data modification or deletion even if admin passwords are compromised, guaranteeing an untainted baseline backup when disaster strikes."
  },
  {
    id: "kb-5",
    title: "VoIP Implementation Guide for Small and Medium Businesses",
    category: "VoIP & Telecom",
    categoryKey: "voip",
    desc: "Everything you need to know about implementing VoIP telephony in your organization, from choosing a provider to configuring IP PBX and SIP trunking.",
    readTime: "10 min read",
    views: 2765,
    content: "Implementing high-fidelity VoIP begins with network readiness. Configure Quality of Service (QoS) on switches to prioritize voice traffic (DSCP Class EF) over generic downloads. Segment voice into a logical Voice VLAN to secure voice streams and avoid packet collisions. Choose between cloud-hosted UCaaS for global remote mobile desks or an on-premise IP-PBX appliance for absolute control over security logs and local analog gateway failovers."
  },
  {
    id: "kb-6",
    title: "UPS Sizing Guide: Choosing the Right Power Backup for Your Servers",
    category: "Hardware Guide",
    categoryKey: "hardware",
    desc: "Calculate the correct UPS capacity for your server rack, understand VA vs watt ratings, and learn about battery runtime calculations for critical infrastructure.",
    readTime: "5 min read",
    views: 1543,
    content: "When sizing a UPS, tally the total maximum wattage of all servers, storage arrays, switches, and cooling components in the cabinet. Add a 25% safety overhead for future expansions. Ensure the UPS rating in VA accommodates the power factor (W / VA). Configure automated graceful-shutdown software agents on your primary virtualization servers to trigger automated memory-state saving when battery levels fall below 15 minutes of runtime."
  }
];

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === "all" || art.categoryKey === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100 px-4 scroll-mt-20" id="zentrix-knowledge-base">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            <BookOpen className="w-3.5 h-3.5" /> Zentricore IT Help Center
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
            Knowledge Base
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Explore comprehensive guides, diagnostics, checklists, and enterprise best practices formulated by our principal systems engineers.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles, guides, and diagnostic frameworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm placeholder:text-slate-400"
            id="kb-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Grid of Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCat === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCat(cat.key)}
                className={`p-3 rounded-xl border flex flex-col items-center text-center justify-between gap-2 transition-all group ${
                  isSelected
                    ? "bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-600/10"
                    : "bg-white border-slate-100 hover:border-teal-200 text-slate-700 hover:shadow-sm"
                }`}
                id={`kb-cat-btn-${cat.key}`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  isSelected ? "bg-teal-500/30 text-white" : "bg-slate-50 text-teal-600 group-hover:bg-teal-50"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-tight truncate max-w-[100px] sm:max-w-none">
                    {cat.name}
                  </p>
                  <p className={`text-[9px] font-semibold ${isSelected ? "text-teal-100" : "text-slate-400"}`}>
                    {cat.count} files
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-teal-200 transition-all hover:shadow-lg flex flex-col justify-between space-y-4 group"
                  id={`kb-article-card-${art.id}`}
                >
                  <div className="space-y-2">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-md">
                      {art.category}
                    </span>
                    <h4 className="font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors text-base line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {art.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-[11px] text-slate-400 font-semibold">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-300" /> {art.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-300" /> {art.views.toLocaleString()} views
                      </span>
                    </div>
                    <button
                      onClick={() => setReadingArticle(art)}
                      className="text-teal-600 hover:text-teal-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform font-bold"
                    >
                      Read Guide <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
                <p className="text-slate-400 text-sm font-medium">No matching engineering guidelines found.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCat("all"); }}
                  className="mt-2 text-xs font-bold text-teal-600 hover:text-teal-700 underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Reading Modal */}
        <AnimatePresence>
          {readingArticle && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setReadingArticle(null)}
                className="fixed inset-0 bg-slate-900/60 z-50 cursor-pointer"
              />
              {/* Dialog Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-xl mx-auto bg-white rounded-3xl shadow-2xl z-50 p-6 sm:p-8 space-y-6"
              >
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-md">
                    {readingArticle.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    {readingArticle.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 font-semibold">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-300" /> {readingArticle.readTime}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-slate-300" /> {readingArticle.views} views</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Core Brief</h4>
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{readingArticle.desc}"
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Technical Guideline Content</h4>
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-medium">
                    {readingArticle.content}
                  </p>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setReadingArticle(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
