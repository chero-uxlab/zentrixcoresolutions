import { ProductItem } from "./types";

export const KSH_PRODUCTS: ProductItem[] = [
  {
    id: "enterprise_rack_server",
    name: "Enterprise Rack Server",
    category: "Hardware",
    price: 558870,
    rating: 4.9,
    description: "Dual Xeon Scalable processor rack server with 64GB RAM, 8x hot-swap drive bays, redundant power supplies.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
    features: [
      "Dual Xeon Scalable high-core CPU layout",
      "64GB Enterprise ECC system memory",
      "8x Hot-swappable 2.5\" drive trays",
      "Redundant gold efficiency power supplies"
    ]
  },
  {
    id: "business_laptop_pro",
    name: "Business Laptop Pro",
    category: "Hardware",
    price: 155870,
    rating: 4.8,
    description: "14\" business laptop with Intel Core i7, 16GB RAM, 512GB SSD, Windows 11 Pro, 3-year warranty. (Regular price: KSH 194,870)",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
    features: [
      "Latest Gen Intel Core i7 Processor",
      "16GB High-Speed RAM & 512GB NVMe SSD",
      "Pre-loaded with Windows 11 Pro licensed",
      "3-Year next business day warranty SLA"
    ]
  },
  {
    id: "managed_network_switch",
    name: "Managed Network Switch",
    category: "Hardware",
    price: 116870,
    rating: 4.7,
    description: "48-port Gigabit managed switch with 4x 10G SFP+ uplinks, Layer 2/3, PoE+ support, enterprise firmware.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80",
    features: [
      "48x Full Gigabit Ethernet ports",
      "4x 10G SFP+ high-capacity fiber uplinks",
      "Complete L2/L3 administration firmware",
      "Full Power-over-Ethernet (PoE+) budget support"
    ]
  },
  {
    id: "enterprise_ups_3000",
    name: "Enterprise UPS 3000VA",
    category: "Hardware",
    price: 194870,
    rating: 4.9,
    description: "Online double-conversion UPS with 3000VA capacity, LCD display, SNMP monitoring, rack/tower convertible.",
    image: "https://images.unsplash.com/photo-1626262882042-fbf4512c7468?w=400&q=80",
    features: [
      "Double-conversion pure sine-wave output",
      "3000VA / 2700W backup power capacity",
      "SNMP network telemetry remote monitoring card",
      "Dual form-factor Rack or Tower installation"
    ]
  },
  {
    id: "m365_business_premium",
    name: "Microsoft 365 Business Premium",
    category: "Software",
    price: 34320,
    rating: 4.8,
    description: "Annual subscription for Microsoft 365 Business Premium including Office apps, Exchange, Teams, 1TB cloud. (Per user / year)",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=400&q=80",
    features: [
      "Full offline Office applications suite",
      "Exchange email box hosting (50GB per user)",
      "Microsoft Teams collaboration with call routing",
      "1TB secure OneDrive and SharePoint storage"
    ]
  },
  {
    id: "azure_credits",
    name: "Azure Cloud Credits Pack",
    category: "Software",
    price: 65000,
    rating: 4.9,
    description: "Prepaid Azure cloud credits pack for VM hosting, storage, databases and cloud services. Scalable billing.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    features: [
      "Prepaid computing credit allocations",
      "Applicable for Azure VM and Database hosting",
      "Enables continuous server scaling blocks",
      "Includes architectural setup support hours"
    ]
  },
  {
    id: "enterprise_edr_suite",
    name: "Enterprise EDR Suite",
    category: "Security",
    price: 7670,
    rating: 4.9,
    description: "Advanced endpoint detection and response platform with AI threat hunting, real-time monitoring, incident response. (Per endpoint / month)",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80",
    features: [
      "Active behavioral AI threat intercepts",
      "24/7/365 security operations backing",
      "Automatic isolated network quarantine triggers",
      "System baseline audits and ransomware rollbacks"
    ]
  },
  {
    id: "email_security_gateway",
    name: "Email Security Gateway",
    category: "Security",
    price: 5460,
    rating: 4.8,
    description: "Cloud email security gateway with spam filtering, malware protection, data loss prevention, encryption. (Per user / month)",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80",
    features: [
      "Inbound spam and email malware filtering",
      "Sandbox attachment scanning protocols",
      "DKIM, SPF, and DMARC posture validations",
      "Sensitive data loss protection outbound logs"
    ]
  },
  {
    id: "managed_it_support_pkg",
    name: "Managed IT Support Package",
    category: "Services",
    price: 195000,
    rating: 4.9,
    description: "Monthly unlimited remote IT support, monitoring, patch management, help desk, and quarterly business reviews. (Per month)",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80",
    features: [
      "Unlimited remote desktop help desk support",
      "Continuous server and active router monitoring",
      "Automated system OS patches and optimizations",
      "Predictive component wear indicator alerting"
    ]
  },
  {
    id: "cloud_migration_service",
    name: "Cloud Migration Service Project",
    category: "Services",
    price: 455000,
    rating: 4.8,
    description: "Full cloud migration planning and execution including data migration, app rehosting, training, and support. (Flat rate)",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    features: [
      "Readiness audits and budget optimization plans",
      "Warm live database replication schedules",
      "Zero downtime server migration cutovers",
      "Comprehensive cloud security configurations"
    ]
  },
  {
    id: "multi_function_printer",
    name: "Multi-Function Printer",
    category: "Hardware",
    price: 285870,
    rating: 4.6,
    description: "A3 color laser MFP with print, scan, copy, fax, duplex, wireless, 50ppm, enterprise management software.",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c233ab0?w=400&q=80",
    features: [
      "Heavy-duty A3 color laser print arrays",
      "Fast 50 pages-per-minute active print velocity",
      "Automatic duplex scan and copier feeder",
      "Secure release print queue badge integrations"
    ]
  },
  {
    id: "firewall_appliance",
    name: "Enterprise Firewall Appliance",
    category: "Security",
    price: 324870,
    rating: 4.9,
    description: "Next-gen firewall with UTM, VPN, intrusion prevention, web filtering, application control, central management. (Promo rate)",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
    features: [
      "Deep packet perimeter threat inspection",
      "Encrypted secure client-to-site IPsec VPNs",
      "Automated active intrusion prevention systems",
      "Granular web filters and app access rules"
    ]
  }
];
