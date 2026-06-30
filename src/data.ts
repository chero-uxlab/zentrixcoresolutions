import { ServiceCard, DiagnosticQuestion, ProductItem } from "./types";

export interface DetailedSection {
  title: string;
  desc: string;
  bullets: string[];
  iconName: string;
}

export interface ExtendedServiceCard extends ServiceCard {
  category: "msp" | "cloud" | "solutions" | "voip" | "critical" | "hvac";
  detailedSections: DetailedSection[];
}

export const SERVICES: ExtendedServiceCard[] = [
  {
    id: "it-infrastructure",
    category: "msp",
    title: "IT Infrastructure Support",
    description: "Enterprise IT infrastructure design, deployment, and management. We build secure, high-performance technology foundations.",
    longDescription: "Our IT infrastructure services are engineered to build a secure, resilient, and highly available core for your business operations. From domain controller cluster deployments to full local virtualization and SAN arrays, we cover all physical and logical layers.",
    iconName: "Network",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    badge: "Infrastructure Core",
    features: [
      "Physical and virtual server clusters deployment",
      "Active Directory, forest federation, and trust policies",
      "VMware ESXi and Microsoft Hyper-V virtualization",
      "Network address management, DNS, and secure DHCP architectures"
    ],
    detailedSections: [
      {
        title: "Server Deployment",
        desc: "We deploy physical and virtual servers tailored to your workload requirements with enterprise-grade hardware.",
        bullets: ["Automated OS provisioning", "Hypervisor configuration best practices", "Server clustering & high availability"],
        iconName: "Server"
      },
      {
        title: "Network Architecture",
        desc: "Design and implement secure local area networks with logical VLAN segmentation.",
        bullets: ["Logical zone routing", "High-capacity backbone switches", "Redundant link aggregation"],
        iconName: "Network"
      }
    ]
  },
  {
    id: "network-cabling",
    category: "msp",
    title: "Network Cabling Solutions",
    description: "Professional structured cabling solutions for data, voice, and fiber optic backbones. Certified Fluke certification included.",
    longDescription: "Structured cabling is the circulatory system of modern high-speed office facilities. We design, pull, terminate, and test Cat6, Cat6A, and single/multi-mode fiber cables to guarantee robust physical-layer performance.",
    iconName: "Cable",
    imageUrl: "https://images.unsplash.com/photo-155149010b-884841961e9e?w=800&q=80",
    badge: "Cat6A & Fiber",
    features: [
      "High-speed Cat6 & Cat6A horizontal pulls up to 10Gbps",
      "Backbone single-mode and multi-mode fiber runs with fusion splicing",
      "Pathway tray systems, J-hooks, and conduits design",
      "Full Fluke DSX-8000 validation testing with printed cert charts"
    ],
    detailedSections: [
      {
        title: "Copper Cabling",
        desc: "High-density workstation and wireless AP cabling built to standards.",
        bullets: ["Category 6 & 6A rated runs", "Neat termination on patch panels", "Strict compliance with TIA-568"],
        iconName: "Cable"
      },
      {
        title: "Fiber Optic backbones",
        desc: "Inter-closet and main equipment room high-capacity fiber links.",
        bullets: ["Fusion splicing for minimal dB loss", "ST, SC, LC connector setups", "Optical time-domain reflectometer testing"],
        iconName: "Activity"
      }
    ]
  },
  {
    id: "server-room-setup",
    category: "msp",
    title: "Server Room Setup",
    description: "Complete server room and data center design services. Sizing, layout, power, and environmental controls optimized.",
    longDescription: "Building or retrofitting a server room requires matching physical spaces with precise cooling, power, and rack layouts. Our comprehensive build services coordinate structural, electrical, cooling, and security aspects.",
    iconName: "Settings",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    badge: "Full Design & Build",
    features: [
      "Optimal room layouts for clean hot/cold aisle thermal containment",
      "Precision cooling systems sized for equipment heat dissipation",
      "Power distribution units, UPS integration, and generator tie-ins",
      "Environmental monitoring (temperature, humidity, leaks, smoke) alerts"
    ],
    detailedSections: [
      {
        title: "Room Layout & Access",
        desc: "We design structural layouts that maximize space efficiency and ensure fire-safe entrance protocols.",
        bullets: ["Hot/cold aisle containment setups", "Biometric and badge-reader access doors", "Clean-agent gaseous fire suppression integration"],
        iconName: "Building2"
      },
      {
        title: "Power & Airflow",
        desc: "Continuous power delivery coupled with exact precision cooling prevents server throttling.",
        bullets: ["Precision cooling CRAC units", "Metered zero-U rack PDUs", "Dedicated equipment earthing bars"],
        iconName: "Zap"
      }
    ]
  },
  {
    id: "network-rack-installation",
    category: "msp",
    title: "Network Rack Installation",
    description: "Rack mounting, cable managers, patch panel labeling, and proper equipment grounding for neat IT closets.",
    longDescription: "A messy server rack leads to downtime, heat traps, and diagnostic nightmares. We organize, mount, ground, and label server enclosures and patch panels with immaculate, color-coded precision.",
    iconName: "Layers",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
    badge: "Immaculate Cable Art",
    features: [
      "Rigid floor-standing and wall-mounted rack structural anchoring",
      "High-density horizontal and vertical cable managers configuration",
      "Logical equipment stacking based on weight, heat, and cabling paths",
      "Comprehensive, durable printed labeling systems for active ports"
    ],
    detailedSections: [
      {
        title: "Rack Architecture",
        desc: "Anchoring premium open and enclosed cabinets tailored to your server depths.",
        bullets: ["4-post and 2-post steel constructions", "Enclosed soundproof and secure cabinets", "Integrated top and bottom cooling fans"],
        iconName: "Layers"
      },
      {
        title: "Cable Dressing & Labeling",
        desc: "Our engineers make cable routing a craft, allowing easy trace-back.",
        bullets: ["Custom-cut Velcro loops", "Numeric and color-coded labeling schema", "Neat active component grouping"],
        iconName: "Wrench"
      }
    ]
  },
  {
    id: "endpoint-security",
    category: "msp",
    title: "Endpoint Detection & Response",
    description: "Next-generation endpoint protection and EDR monitoring to safeguard workstations and servers from malware.",
    longDescription: "Traditional antivirus is no longer sufficient to stop advanced persistent threats. We deploy industry-leading EDR/XDR agents with 24/7 security operation center monitoring to detect and auto-remediate live breaches.",
    iconName: "Laptop",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    badge: "24/7 SOC Backed",
    features: [
      "Behavioral AI heuristic scanning for zero-day threat prevention",
      "Continuous system logging and real-time anomaly hunting",
      "Network isolation hooks for automated attack blast containment",
      "System baseline patch audit and third-party app vulnerability scanning"
    ],
    detailedSections: [
      {
        title: "Next-Gen Antivirus",
        desc: "Signatureless fileless protection powered by machine learning algorithms.",
        bullets: ["Heuristic zero-day defense", "Suspicious execution blockages", "Low overhead kernel-level drivers"],
        iconName: "ShieldCheck"
      },
      {
        title: "Continuous Threat Hunting",
        desc: "Our active SOC analyzes system process logs to identify lateral movements.",
        bullets: ["Real-time behavior correlation", "Memory inspection forensics", "Rapid ransomware rollback recovery"],
        iconName: "Activity"
      }
    ]
  },
  {
    id: "email-security",
    category: "msp",
    title: "Enterprise Email Protection",
    description: "Shield your inbox from phishing, ransomware, BEC, and impersonation fraud with active gateway scanning.",
    longDescription: "Over 90% of cyber breaches begin via malicious emails. We route and protect your corporate email flow with machine learning layers that sandbox links, detect spoofing, and actively quarantine threats.",
    iconName: "Mail",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    badge: "Zero-Phish Gateways",
    features: [
      "Gateway sandbox analysis of incoming attachments",
      "Link rewrite protection with live time-of-click analysis",
      "Deep behavioral anomaly detection to intercept executive spoofing",
      "Outbound data loss prevention and email encryption triggers"
    ],
    detailedSections: [
      {
        title: "Phishing Shielding",
        desc: "Advanced spoofing detection filters fake login requests and imposter addresses.",
        bullets: ["DKIM, SPF, and DMARC enforcement", "Live URL click sandbox verification", "Sender reputation monitoring"],
        iconName: "ShieldAlert"
      },
      {
        title: "Data Loss Prevention",
        desc: "Ensure outbound emails do not leak credit card numbers, passwords, or PI.",
        bullets: ["Automated policy keyword triggers", "Mandatory TLS transmission paths", "Granular quarantined audits"],
        iconName: "Lock"
      }
    ]
  },
  {
    id: "cloud-security",
    category: "msp",
    title: "Cloud Security Solutions",
    description: "CASB, CSPM, and IAM policies configured to protect your multi-cloud data and server workloads.",
    longDescription: "SaaS and PaaS environments are common leak vectors if not correctly locked down. We configure Cloud Posture Management, implement Single Sign-On, and execute tight access restrictions to secure your online data pools.",
    iconName: "Eye",
    imageUrl: "https://images.unsplash.com/photo-1614064548237-096d3f1f1d1c?w=800&q=80",
    badge: "Zero-Trust Cloud",
    features: [
      "Cloud Access Security Broker (CASB) monitoring cross-SaaS access",
      "Cloud Security Posture Management (CSPM) misconfiguration alerts",
      "Unified Identity provider integration with conditional access MFA",
      "Continuous data classification for OneDrive, SharePoint, and Drive"
    ],
    detailedSections: [
      {
        title: "CASB & Workloads",
        desc: "Control shadow IT and keep visibility over data moving across third-party apps.",
        bullets: ["SaaS usage visibility metrics", "Real-time sync block rules", "Container level runtime protections"],
        iconName: "Cloud"
      },
      {
        title: "SSO & IAM Governance",
        desc: "Define strict access parameters using modern identity orchestration.",
        bullets: ["Context-based MFA triggers", "IP range and device-trust limitations", "Privileged administrative elevation audits"],
        iconName: "Key"
      }
    ]
  },
  {
    id: "cloud-migration",
    category: "cloud",
    title: "Cloud Migration Services",
    description: "Plan, execute, and validate the migration of physical servers and databases to public and private cloud IaaS.",
    longDescription: "Moving workloads to the cloud requires careful staging to avoid downtime. Our certified architects evaluate, prep, and replicate your local databases and virtualization layers to Amazon, Azure, or private cloud environments.",
    iconName: "CloudDownload",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    badge: "Seamless Workload Shift",
    features: [
      "Comprehensive cloud readiness assessment and TCO calculation",
      "Warm live database replication with near-zero cutover times",
      "Application refactoring for serverless and server cluster efficiency",
      "Cloud networking, secure VPN tunnels, and transit gateway mapping"
    ],
    detailedSections: [
      {
        title: "Assess & Stage",
        desc: "We run deep discovery tools to map application dependencies and storage load metrics.",
        bullets: ["Cost projection matrix modeling", "Bandwidth capacity evaluations", "Migration risk mitigation steps"],
        iconName: "Sliders"
      },
      {
        title: "Cutover & Validate",
        desc: "Execute the data transmission during off-hours, validating database structures thoroughly.",
        bullets: ["Near-zero downtime replication blocks", "Post-migration compliance checks", "Identity system cloud bridging"],
        iconName: "CheckCircle"
      }
    ]
  },
  {
    id: "cloud-backup",
    category: "cloud",
    title: "Cloud Backup Solutions",
    description: "Automated, secure server and endpoint cloud backup with rigid immutability to resist ransomware.",
    longDescription: "A reliable backup is the ultimate defense against cyber disaster. Our automated systems stream encrypted image and file copies of your nodes to isolated cloud environments with locked write-once protection.",
    iconName: "Save",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80",
    badge: "Ransomware-Proof",
    features: [
      "Immutable, write-once backup storage blocks that cannot be deleted",
      "Granular point-in-time recovery for files, databases, and system layers",
      "Continuous system image backup tracking local disk block modifications",
      "Encrypted data streams both during transit and inside cloud repositories"
    ],
    detailedSections: [
      {
        title: "Continuous Protection",
        desc: "Automated backups run transparently without affecting local workstation performance.",
        bullets: ["Incremental block-level replication", "Optimized cloud storage deduplication", "Dedicated SQL/Oracle agent hooks"],
        iconName: "Database"
      },
      {
        title: "Disaster Recovery Sandbox",
        desc: "We routinely test spinning up backups inside secure sandboxes to verify restore SLA windows.",
        bullets: ["Automated restore health checks", "Rapid bare-metal recoverability", "Detailed backup verification logs"],
        iconName: "Activity"
      }
    ]
  },
  {
    id: "office-365",
    category: "cloud",
    title: "Microsoft 365 Services",
    description: "Full suite onboarding, email migration, SharePoint file architectures, and active Microsoft Teams phone system setup.",
    longDescription: "Deploying Microsoft 365 requires more than buying licenses. We handle identity syncing, transfer terabytes of email history, and design SharePoint/OneDrive permission models aligned with your security policy.",
    iconName: "Grid",
    imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
    badge: "Productivity Cloud",
    features: [
      "Full local Exchange database to Microsoft 365 online migration",
      "SharePoint intranet sites design and file permissions mappings",
      "Microsoft Teams phone integration with automated PBX routing",
      "Complete tenant audit, baseline hardening, and DLP enforcement"
    ],
    detailedSections: [
      {
        title: "Active Directory Hybrid Setup",
        desc: "Synchronize your on-premise domain with Azure AD/Entra ID for clean Single Sign-On credentials.",
        bullets: ["Automated user provisioning schedules", "Pass-through authorization setups", "Hybrid device enrollment controls"],
        iconName: "Users"
      },
      {
        title: "SharePoint Architecture",
        desc: "We model structural document management structures to simplify collaborative workflows.",
        bullets: ["Rigid folder permission mapping", "External link limitation policies", "In-app version control logs"],
        iconName: "FolderTree"
      }
    ]
  },
  {
    id: "azure-services",
    category: "cloud",
    title: "Microsoft Azure Solutions",
    description: "Design, deploy, and manage Azure infrastructure including virtual machines, virtual networks, and databases.",
    longDescription: "Azure offers unmatched flexibility and computing capacity. We specialize in configuring Azure resources (virtual networks, storage accounts, Azure SQL databases, and Entra ID) to optimize performance, scalability, and cost-efficiency.",
    iconName: "Cloud",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    badge: "Certified Architects",
    features: [
      "Right-sized Azure virtual machine and storage provisioning",
      "Secure virtual network design with Azure Firewall protection",
      "Managed Azure SQL and databases with high availability replication",
      "Infrastructure-as-code automation and cost optimization reviews"
    ],
    detailedSections: [
      {
        title: "Azure AD / Entra ID",
        desc: "Cloud identity management, SSO, conditional access policies, and multi-factor authentication tailored to your risk profile.",
        bullets: ["SSO across public and private cloud apps", "Conditional access rule definitions", "Governance access review pipelines"],
        iconName: "Key"
      },
      {
        title: "Workload Optimizations",
        desc: "Applying Reserved Instances, right-sizing VM metrics, and Azure Advisor reports to trim redundant cloud spend.",
        bullets: ["Monthly consumption modeling dashboards", "Automated scaling trigger metrics", "Orphaned storage cleanup cycles"],
        iconName: "Sliders"
      }
    ]
  },
  {
    id: "managed-it-support",
    category: "cloud",
    title: "Managed IT Support (MSP)",
    description: "Proactive IT support and management for your entire technology stack, delivered as a predictable monthly service.",
    longDescription: "Our Managed IT Support services provide comprehensive, proactive management of your IT environment. We act as your outsourced IT department, ensuring your systems are secure, updated, and operating smoothly.",
    iconName: "LifeBuoy",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80",
    badge: "Predictable Pro Support",
    features: [
      "24/7 help desk with phone, email, and remote support",
      "Proactive server, network, and endpoint monitoring",
      "Automated software patch and update management",
      "Quarterly business reviews with technology roadmaps"
    ],
    detailedSections: [
      {
        title: "Enterprise Help Desk",
        desc: "A responsive team of certified technicians resolving user issues rapidly.",
        bullets: ["SLA-backed ticket resolution", "Remote desktop troubleshooting", "New user onboarding checklists"],
        iconName: "Headset"
      },
      {
        title: "Proactive Auditing",
        desc: "We monitor core hardware performance and network health round-the-clock.",
        bullets: ["Predictive failure alerting", "Disk and RAM usage tracking", "Regular network speed optimization"],
        iconName: "Activity"
      }
    ]
  },
  {
    id: "remote-monitoring",
    category: "cloud",
    title: "Remote Monitoring & Management",
    description: "RMM platform giving you complete visibility and control over your IT estate from a single cloud-based dashboard.",
    longDescription: "Deploying RMM agents allows our engineers to proactively maintain endpoints, apply patches quietly, run automation scripts, and track assets with no disruption to your daily operations.",
    iconName: "Monitor",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    badge: "Cloud-Based RMM",
    features: [
      "Silent background patch management for OS and third-party apps",
      "Self-healing automation scripts that resolve common failures",
      "Complete, real-time hardware and software inventory auditing",
      "Remote command line access and secure portal troubleshooting"
    ],
    detailedSections: [
      {
        title: "Endpoint Auditing",
        desc: "Keep precise track of software versions, hardware specifications, and system lifespans.",
        bullets: ["Automated asset inventory reporting", "Disk storage health indicators", "Unapproved software alerts"],
        iconName: "Sliders"
      },
      {
        title: "Background Troubleshooting",
        desc: "Our technicians run diagnostic commands behind the scenes, keeping employees productive.",
        bullets: ["Silent patch and update rollouts", "Active RAM cache cleaning scripts", "Registry and services manipulation"],
        iconName: "Settings"
      }
    ]
  },
  {
    id: "it-consulting",
    category: "cloud",
    title: "IT Consulting Services",
    description: "Strategic technology consulting to align your IT investments with business goals, reduce risk, and improve efficiency.",
    longDescription: "Navigating technology changes requires expert guidance. We assess your legacy environments, draft long-term technology roadmaps, manage hardware RFPs, and guide digital transition steps.",
    iconName: "Lightbulb",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    badge: "CIO Advisory Services",
    features: [
      "Comprehensive cybersecurity risk and operations audits",
      "Multi-year technology roadmap and budget forecasting",
      "Vendor independent evaluation for systems procurement",
      "Cloud-readiness assessments and modernization strategy"
    ],
    detailedSections: [
      {
        title: "Technology Roadmap",
        desc: "Aligning your infrastructure lifecycle with actual business targets and expected expansions.",
        bullets: ["5-year hardware replacement paths", "Annual software cost modeling", "Scale-out capacity projections"],
        iconName: "Sliders"
      },
      {
        title: "Compliance & Security",
        desc: "Auditing your systems against strict frameworks (NIST, CIS, SOC 2, HIPAA) to isolate vulnerability targets.",
        bullets: ["Firewall policy mapping", "Sensitive data storage tracking", "Access privilege validation"],
        iconName: "ShieldAlert"
      }
    ]
  },
  {
    id: "servers-storage",
    category: "solutions",
    title: "Servers & Storage Solutions",
    description: "Enterprise physical server racks, SAN/NAS arrays, and high-density disk configurations from Dell and HPE.",
    longDescription: "Having robust hardware on-premise is vital for latency-sensitive databases and private local workloads. We specify, wire, and configure enterprise rack servers and flash storage pools built for continuous uptime.",
    iconName: "HardDrive",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    badge: "Hardware Infrastructure",
    features: [
      "Dell PowerEdge and HPE ProLiant rack server deployment",
      "Solid State, hybrid, and dense HDD Storage Area Network (SAN)",
      "High-speed 10G and 25G hardware network connectivity",
      "RAID redundant storage pools and hot-spare disk swapping configurations"
    ],
    detailedSections: [
      {
        title: "Compute Arrays",
        desc: "Sizing memory and multi-core processors to match virtualization and local database loads.",
        bullets: ["Dual Xeon and EPYC setups", "High-density ECC system RAM", "Out-of-band remote controllers (iDRAC/iLO)"],
        iconName: "Cpu"
      },
      {
        title: "Data Pool Storage",
        desc: "Configure SAN and Network Attached Storage (NAS) configurations designed for performance.",
        bullets: ["All-flash arrays for high IOPS", "RAID 6 and RAID 10 configurations", "Fibre Channel and iSCSI fabrics"],
        iconName: "HardDrive"
      }
    ]
  },
  {
    id: "workstations",
    category: "solutions",
    title: "Business Workstations",
    description: "Procurement, custom imaging, domain integration, and lifecycle tracking of commercial desktops and mobile rigs.",
    longDescription: "Empower your employees with high-reliability workstations. We prepare custom operating system images with your core applications, pre-register them in your active directory, and ship them ready to deploy.",
    iconName: "Monitor",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    badge: "Client Systems",
    features: [
      "Enterprise class desktops with extended warranties",
      "Mobile engineering and CAD workstations with dedicated GPUs",
      "Standard and clean all-in-one PCs for offices",
      "Automated system OS imaging and remote deployment models"
    ],
    detailedSections: [
      {
        title: "Workstation Procurement",
        desc: "Supplying business-line hardware from top vendors with long product lifecycles.",
        bullets: ["Intel Core and AMD Ryzen setups", "Durable mechanical constructions", "Multi-monitor graphics ready"],
        iconName: "Monitor"
      },
      {
        title: "imaging & Enrollment",
        desc: "Reduce setup times to minutes by shipping pre-configured machines to remote workers.",
        bullets: ["Domain join configurations", "Core application standard sets", "Active MDM agent deployments"],
        iconName: "CheckCircle"
      }
    ]
  },
  {
    id: "networking-equipment",
    category: "solutions",
    title: "Enterprise Networking Equipment",
    description: "Layer 3 managed switches, cloud-managed wireless APs, and robust next-gen firewalls from Cisco, Ubiquiti, and Fortinet.",
    longDescription: "A reliable corporate network needs solid hardware. We supply and configure managed core switches, wireless APs supporting Wi-Fi 6E, and security gateways designed to protect company traffic.",
    iconName: "Cpu",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    badge: "Core Network Systems",
    features: [
      "Managed Layer 3 network core switches with 10Gbps uplinks",
      "Next-generation enterprise network firewalls with deep packet scanning",
      "High-density commercial dual-band and triple-band wireless APs",
      "SD-WAN branch tunnel links configurations and quality-of-service optimization"
    ],
    detailedSections: [
      {
        title: "Managed Switch Arrays",
        desc: "Deploy switches with Power-over-Ethernet (PoE) to support IP phones, cameras, and access points.",
        bullets: ["LACP link aggregation setups", "Inter-VLAN logical routing", "Spanning tree network loop blocks"],
        iconName: "Cpu"
      },
      {
        title: "Next-Gen Security Gateways",
        desc: "Inspect active internet traffic at the perimeter to stop malware and intruders.",
        bullets: ["Deep packet payload inspection", "Automated intrusion detection systems (IDS/IPS)", "Granular application filtering rules"],
        iconName: "ShieldCheck"
      }
    ]
  },
  {
    id: "ups-power-solutions",
    category: "solutions",
    title: "UPS & Power Solutions",
    description: "Double-conversion online UPS systems, metered rack PDUs, and active battery testing to shield equipment from power sags.",
    longDescription: "Unclean power and sudden blackouts destroy sensitive server drives. We deploy smart, double-conversion online UPS units with automated generator failover transitions to protect server stacks.",
    iconName: "Zap",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    badge: "Continuous Power",
    features: [
      "Double-conversion online UPS units with zero switch transfer times",
      "Metered and switched rack Power Distribution Units (PDU)",
      "Automated server OS shut-down scripts on low runtime triggers",
      "Scheduled backup battery health and capacity load tests"
    ],
    detailedSections: [
      {
        title: "Online UPS Units",
        desc: "Clean high-frequency power spikes, delivering stable pure sine-wave electrical output.",
        bullets: ["Hot-swappable backup battery trays", "Extended runtime cabinet attachments", "Network SNMP telemetry configurations"],
        iconName: "Zap"
      },
      {
        title: "Rack Power Distribution",
        desc: "Control individual electrical sockets remotely to cycle locked servers.",
        bullets: ["Per-socket electricity monitoring", "Scheduled reboot macros", "High-amp commercial socket connectors"],
        iconName: "Sliders"
      }
    ]
  },
  {
    id: "printers-copiers",
    category: "solutions",
    title: "Multi-Function Printers",
    description: "Enterprise color and monochrome MFPs, managed print contracts, and secure release printing models.",
    longDescription: "Ensure print infrastructure is secure, optimized, and cost-effective. We install high-capacity color MFPs, automate supply replenishment, and deploy badge-release printing to secure confidential documents.",
    iconName: "Printer",
    imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80",
    badge: "Managed Print Services",
    features: [
      "High-speed color and monochrome multifunction copiers",
      "Managed Print Contracts covering parts, service, and toner",
      "Badge release secure printing integrations (Follow-Me print)",
      "Advanced scanner profiles with optical character recognition (OCR)"
    ],
    detailedSections: [
      {
        title: "Hardware Fleet",
        desc: "Sizing appropriate printers for heavy-duty volume and scanning requirements.",
        bullets: ["Fast color page print speeds", "High-capacity dual paper trays", "Reliable finishing stapler modules"],
        iconName: "Printer"
      },
      {
        title: "Secured Operations",
        desc: "Keep files safe on tray zones by requiring PIN or badge authorization to start.",
        bullets: ["Follow-Me print queue setups", "Active user cost logging", "Scan-to-cloud security profiles"],
        iconName: "Lock"
      }
    ]
  },
  {
    id: "microsoft-licensing",
    category: "solutions",
    title: "Microsoft Volume Licensing",
    description: "Volume agreements, Cloud Solution Provider (CSP) licenses, and Software Asset Management (SAM) compliance audits.",
    longDescription: "Avoid compliance liabilities and over-purchasing. We analyze your SQL Server cores, Windows CAL seats, and 365 licensing scopes to construct cost-efficient, legal volume agreements.",
    iconName: "CheckCircle",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    badge: "Microsoft Licensing CSP",
    features: [
      "Microsoft Open Value, Enterprise Agreements (EA), and CSP guidance",
      "SQL Server core licensing modeling and hybrid virtualization audits",
      "Windows Server Client Access License (CAL) audit and alignment",
      "Ongoing Software Asset Management to eliminate unused licenses"
    ],
    detailedSections: [
      {
        title: "CSP Subscription Model",
        desc: "Flexible, month-to-month and annual seat counts with rapid additions.",
        bullets: ["Instant license allocations", "Consolidated monthly invoices", "Easy license upgrade procedures"],
        iconName: "CheckCircle"
      },
      {
        title: "Volume Server Agreements",
        desc: "Ensure enterprise servers and cloud workloads are licensed legally for standard use.",
        bullets: ["Core and virtualization setups", "CAL seat allocation tracking", "Disaster recovery license secondary uses"],
        iconName: "Sliders"
      }
    ]
  },
  {
    id: "antivirus-solutions",
    category: "solutions",
    title: "Enterprise Antivirus Software",
    description: "Centralized antivirus management consoles and multi-tenant platforms for companies and MSPs.",
    longDescription: "Get complete endpoint health status from a single, cloud-hosted platform. We configure antivirus scanning intervals, push exclusion lists, and align security policies to keep endpoints protected.",
    iconName: "ShieldAlert",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    badge: "Cloud-Managed AV",
    features: [
      "Single-pane-of-glass cloud console for global endpoint status",
      "Scheduled background scan intervals with zero user alerts",
      "Active exclusion modeling for business-line ERP/CRM databases",
      "Quarantine management, telemetry reporting, and remediation pipelines"
    ],
    detailedSections: [
      {
        title: "Centralized Dashboard",
        desc: "Review live infection warnings and active system alerts across hundreds of machines.",
        bullets: ["Rapid port blockage commands", "Virus database update status", "Vulnerable operating system alerts"],
        iconName: "LayoutDashboard"
      },
      {
        title: "Lightweight Agent Protection",
        desc: "Protect system operations without choking endpoint memory or disk access.",
        bullets: ["Optimized memory utilization", "Silent execution schedules", "Real-time threat tracking"],
        iconName: "Cpu"
      }
    ]
  },
  {
    id: "backup-software",
    category: "solutions",
    title: "Enterprise Backup Software",
    description: "Veeam and ShadowProtect backup solutions for virtual, physical, and hybrid cloud workloads with automated DR orchestrations.",
    longDescription: "Deploy industry-leading backup applications to secure virtual and physical workloads. We construct 3-2-1 backup structures with local appliances and isolated cloud storage tiers.",
    iconName: "Database",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    badge: "Veeam Silver Partner",
    features: [
      "Veeam Backup & Replication server installation and configuration",
      "Application-aware backup copies of SQL databases and Active Directory",
      "Instant VM Recovery enabling server boot-ups directly from backups",
      "Automated disaster recovery failover and test sandbox automation"
    ],
    detailedSections: [
      {
        title: "VMware & Hyper-V backups",
        desc: "Host-level, agentless backup sweeps that capture exact system states cleanly.",
        bullets: ["Storage snapshot integrations", "Fast data change trackers", "Granular object restore hooks"],
        iconName: "Database"
      },
      {
        title: "Disaster Failover Schemes",
        desc: "Configure standby replica servers at disaster recovery sites with ready pipelines.",
        bullets: ["Failover plans automation", "Continuous ping validation checks", "Re-routing network gateway tunnels"],
        iconName: "Activity"
      }
    ]
  },
  {
    id: "crm-solutions",
    category: "solutions",
    title: "Customer Relationship Management",
    description: "CRM implementation and optimization for sales pipelines, automated marketing, and customer support desks.",
    longDescription: "Supercharge sales conversions and support desks by orchestrating user interactions. We integrate CRM platforms (Salesforce, Microsoft Dynamics, HubSpot) into company systems.",
    iconName: "Users",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    badge: "Sales & Support CRM",
    features: [
      "Salesforce custom object building and pipeline visualization setup",
      "HubSpot marketing automation, workflows, and lead nurturing rules",
      "Dynamics 365 customer service routing and ticketing setups",
      "CRM integrations with email systems, VoIP telephony, and ERP platforms"
    ],
    detailedSections: [
      {
        title: "Pipeline Automation",
        desc: "Automate task creations, send follow-ups, and log pipeline progress.",
        bullets: ["Custom sales dashboards", "Automated contract generators", "Lead source channel tracking"],
        iconName: "Sliders"
      },
      {
        title: "Telephony Integration",
        desc: "Enable click-to-dial and automatic call tracking within CRM records.",
        bullets: ["Screen-pop customer records", "Call logging automated logs", "Voicemail attachment triggers"],
        iconName: "Headset"
      }
    ]
  },
  {
    id: "erp-systems",
    category: "solutions",
    title: "Enterprise Resource Planning",
    description: "ERP implementation, database design, and workflow consulting for SAP Business One, Dynamics, and Odoo.",
    longDescription: "A well-integrated ERP combines finance, warehouses, supply chains, HR, and manufacturing into one single database. We design and execute migration pipelines for ERP deployment.",
    iconName: "Workflow",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    badge: "Business Engine ERP",
    features: [
      "SAP Business One on HANA database setup and optimization",
      "Microsoft Dynamics 365 Finance & Supply Chain module customization",
      "Odoo open-source modular app setups for agile mid-market shops",
      "Custom reporting dashboards, warehouse handheld integrations, and API bridges"
    ],
    detailedSections: [
      {
        title: "Database Modeling",
        desc: "Optimizing relational storage structures to handle heavy transaction speeds cleanly.",
        bullets: ["EPOS and sales registry syncs", "Real-time inventory levels audits", "Automated accounts payables triggers"],
        iconName: "Database"
      },
      {
        title: "Workflow Customization",
        desc: "Tailoring purchase approvals, shipping queues, and cost accounting pipelines.",
        bullets: ["Multiple warehouse tracking setups", "Multi-currency support setups", "Electronic invoicing compliance layers"],
        iconName: "Sliders"
      }
    ]
  },
  {
    id: "on-premise-voip",
    category: "voip",
    title: "On-Premise IP PBX Solutions",
    description: "SIP Trunking, 3CX, and Cisco PBX deployment on-premise with Yealink hardware provisioning.",
    longDescription: "For maximum control and local survivability, our on-premise PBX servers integrate with traditional analogue networks, emergency alarm grids, and high-efficiency SIP trunks.",
    iconName: "PhoneCall",
    imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=800&q=80",
    badge: "Local Voice Server",
    features: [
      "3CX and FreePBX appliance installation and server setup",
      "SIP Trunk integration with active multi-provider failovers",
      "High-density commercial Yealink IP desktop phones provisioning",
      "Legacy paging systems and analog emergency alarm configurations"
    ],
    detailedSections: [
      {
        title: "Appliance Hardware",
        desc: "Specifying and deploying dedicated on-premise voice servers with low power footprints.",
        bullets: ["Dual power-supply servers", "Local analog gateway integrations", "Automatic local paging systems"],
        iconName: "Server"
      },
      {
        title: "SIP and Routing",
        desc: "Optimizing call quality using local QoS switches and secure voice subnet trunks.",
        bullets: ["Voice VLAN segmentation rules", "Direct dial-in (DDI) routing", "Automated night-mode switch macros"],
        iconName: "Sliders"
      }
    ]
  },
  {
    id: "cloud-based-voip",
    category: "voip",
    title: "Cloud Based VoIP & UCaaS",
    description: "Cloud-hosted PBX, RingCentral, and Teams Phone setups with zero local server footprints.",
    longDescription: "Switching to UCaaS connects phone, video, chat, and contact tools into a unified user login, enabling remote teams to answer office lines from anywhere in the world.",
    iconName: "Cloud",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80",
    badge: "Unified UCaaS",
    features: [
      "RingCentral and 8x8 enterprise tenant onboarding and dial plans",
      "Microsoft Teams native Calling Plans and operator console setups",
      "Softphone app configurations for remote mobile iOS and Android",
      "Centralized QoS analytics and active call latency metrics"
    ],
    detailedSections: [
      {
        title: "Voice Cloud Tenant",
        desc: "Host all phone system records in the cloud, removing the need for server rooms.",
        bullets: ["Instant user provisioning dashboards", "Unlimited local phone lines", "Easy auto-attendant menus configurations"],
        iconName: "Cloud"
      },
      {
        title: "Softphone Apps",
        desc: "Employees answer corporate lines directly on laptops or mobile devices.",
        bullets: ["Encrypted remote call channels", "Integrated team text and messaging", "Seamless desktop transfer models"],
        iconName: "Laptop"
      }
    ]
  },
  {
    id: "call-center-software",
    category: "voip",
    title: "Call Center Software Solutions",
    description: "Inbound ACD queues, IVR menu routing, real-time performance analytics, and CRM data integrations.",
    longDescription: "Optimize customer support channels. We deploy next-gen contact center configurations with automated, skills-based call routing, compliance logging, and performance metrics.",
    iconName: "Headset",
    imageUrl: "https://images.unsplash.com/photo-1549227082-0fd18ee1fa61?w=800&q=80",
    badge: "High-Volume ACD",
    features: [
      "Automatic Call Distribution (ACD) queues with skills routing rules",
      "Multi-level interactive voice menus (IVR) with CRM lookups",
      "Secure compliance voice recording with full encryption controls",
      "Live call supervisor wallboards, chat whisper tools, and audits"
    ],
    detailedSections: [
      {
        title: "Intelligent IVR",
        desc: "Build menus that pull CRM records instantly, routing callers directly to their dedicated sales agent.",
        bullets: ["Dynamic caller-ID lookups", "API data dip integrations", "Visual flow routing builders"],
        iconName: "Workflow"
      },
      {
        title: "Analytics & Compliance",
        desc: "Ensure calls are recorded securely while displaying real-time wallboard queue times.",
        bullets: ["PCI-compliant automatic pause triggers", "Average wait time (AWT) indicators", "Supervisor whisper and barge-in modules"],
        iconName: "Activity"
      }
    ]
  },
  {
    id: "critical-power-solutions",
    category: "critical",
    title: "Critical Power & Cooling",
    description: "Precision data center cooling, standby generator tie-ins, and N+1 power redundancy architecture.",
    longDescription: "Data centers must operate 24/7/365 without exception. We provide engineering and electrical designs for precision climate control, dual power feeds, and backup generator transfer units.",
    iconName: "Zap",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    badge: "Data Center Grade",
    features: [
      "In-row and computer room cooling units (CRAC) installations",
      "Automatic transfer switches (ATS) with utility generator synchronization",
      "High-efficiency hot/cold aisle thermal containment systems",
      "N+1 and 2N redundancy power grid electrical drawings design"
    ],
    detailedSections: [
      {
        title: "In-Row Precision AC",
        desc: "Cool high-heat server aisles rapidly, regulating ambient humidity precisely.",
        bullets: ["Compressor speed variable control", "Underfloor air delivery ducts", "Live humidity sensor arrays"],
        iconName: "Snowflake"
      },
      {
        title: "Generator & ATS",
        desc: "Seamlessly transfer heavy utility loads to diesel backup power when the grid fails.",
        bullets: ["Sub-second ATS transfer triggers", "Emergency load banks setups", "Fuel cell and level safety monitors"],
        iconName: "Zap"
      }
    ]
  },
  {
    id: "servers-and-storage",
    category: "critical",
    title: "Mission Critical Servers",
    description: "High-availability clustering, hyperconverged storage, and 4-hour response SLA agreements.",
    longDescription: "Protect critical corporate applications. We specify, wire, and maintain clustered server pools with active replication architectures.",
    iconName: "Server",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    badge: "99.999% Uptime SLA",
    features: [
      "Windows Server Failover Clustering (WSFC) deployment",
      "SQL Server Always On Availability Groups setup",
      "Hyperconverged Infrastructure (HCI) software-defined storage",
      "4-hour emergency hardware dispatch SLA contracts"
    ],
    detailedSections: [
      {
        title: "Always-On Clustering",
        desc: "Server cluster architectures where application workloads jump nodes instantly in case of hardware failures.",
        bullets: ["Active-Active dual configurations", "Cluster quorum and cloud witness", "Non-disruptive rolling server updates"],
        iconName: "Server"
      },
      {
        title: "Hyperconverged Storage",
        desc: "Combining local drives into a unified virtual SAN pool for lower network latencies.",
        bullets: ["Software defined storage metrics", "SSD cache performance drives", "Automatic file-block self-healing"],
        iconName: "HardDrive"
      }
    ]
  },
  {
    id: "windows-server-deployment",
    category: "critical",
    title: "Windows Server Deployment",
    description: "Active Directory forests, RDS gateway farms, file services DFS, and rigid security hardenings.",
    longDescription: "We specialize in deploying, structuring, and securing Windows Server estates, enforcing standard Group Policy sets and securing remote access protocols.",
    iconName: "FolderTree",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80",
    badge: "Active Directory Expert",
    features: [
      "Windows Server 2022/2019 Domain Controller cluster design",
      "Remote Desktop Services (RDS) Gateway farm deployments",
      "Distributed File System (DFS) for redundant corporate file shares",
      "CIS benchmark lock-downs and Privileged Access PAM setups"
    ],
    detailedSections: [
      {
        title: "Active Directory Forest",
        desc: "Establish structured organizational unit layers to simplify security group structures.",
        bullets: ["Forest trust migrations", "Group Policy Object (GPO) optimization", "Multi-site domain controller replication"],
        iconName: "Users"
      },
      {
        title: "RDS Gateway Farms",
        desc: "Secure remote desktop access with modern encryption layers and multifactor authentication.",
        bullets: ["Integrated MFA prompts", "Active user session balance brokers", "Encrypted connection protocols"],
        iconName: "Laptop"
      }
    ]
  },
  {
    id: "air-conditioning-installation",
    category: "hvac",
    title: "Air Conditioning Installation",
    description: "Premium split and VRF systems with inverter technology for whisper-quiet office and building cooling.",
    longDescription: "Our heating, ventilation, and air conditioning solutions focus on creating high-efficiency climate controls for commercial spaces. We install, size, and maintain premium systems.",
    iconName: "Wind",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    badge: "Premium HVAC",
    features: [
      "High-efficiency split systems with energy-saver inverters",
      "Central ducted and multi-split ceiling cassette deployments",
      "Smart programmable thermostat controls and building setups",
      "Complete system evacuation, test, and gas balance certifications"
    ],
    detailedSections: [
      {
        title: "Commercial Comfort Cooling",
        desc: "Provide eye-safe, high-ventilation climate controls across desks, workspaces, and conference rooms.",
        bullets: ["Whisper-quiet wall split units", "Ceiling-recessed cassettes", "Sleek in-wall layout ducting"],
        iconName: "Wind"
      },
      {
        title: "Inverter Controls",
        desc: "Save up to 35% on building energy cost using modern inverter scroll compressors.",
        bullets: ["Modulated gas speed compression", "Variable fan velocity limits", "Environment friendly R32 refrigerants"],
        iconName: "Sliders"
      }
    ]
  },
  {
    id: "cold-room-solutions",
    category: "hvac",
    title: "Cold Room & Freezer Rooms",
    description: "Design, build, and maintain cold rooms, freezer rooms, and blast chillers with dual system redundancy.",
    longDescription: "Preserving food, pharmaceutical, and scientific biological products demands exact, high-reliability cold rooms. We build fully custom cold rooms utilizing high-density insulated panels and smart IoT alerts.",
    iconName: "Thermometer",
    imageUrl: "https://images.unsplash.com/photo-1584263347416-85a210352e4b?w=800&q=80",
    badge: "Precision Refrigeration",
    features: [
      "Custom insulated polyurethane panel floor and wall structures",
      "Dual refrigeration compressor setups with automatic load rotation",
      "IoT temperature and humidity data logging with SMS alert triggers",
      "Acoustic alarm systems and cold room safety panic escape buttons"
    ],
    detailedSections: [
      {
        title: "Insulated Panel Shells",
        desc: "We construct robust walk-in freezer boundaries using tongue-and-groove polyurethane locks.",
        bullets: ["Up to 150mm thick thermal insulation", "Slip-resistant safety floor plating", "Airtight sliding door gaskets"],
        iconName: "Building2"
      },
      {
        title: "Redundant Compressors",
        desc: "Guarantees continuous cooling output even if one system encounters a lockup.",
        bullets: ["Dual condensing fan boards", "Automatic weekly lead-lag switchers", "Anti-icing coil hot-gas defrost lines"],
        iconName: "Activity"
      }
    ]
  },
  {
    id: "ventilation-duct-installation",
    category: "hvac",
    title: "Ventilation & Ductwork",
    description: "Commercial supply and extract ductwork fabrication, fresh air systems, and kitchen hood ventilation setups.",
    longDescription: "Ensuring proper indoor air quality requires balanced supply and exhaust systems. We design, mock, and install robust duct paths with advanced filtration boxes.",
    iconName: "Wind",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    badge: "Balanced Airflow",
    features: [
      "Custom galvanized and stainless steel duct pathways fabrication",
      "Energy recovery ventilation (ERV) reclaiming exhaust energy",
      "Commercial exhaust hoods and grease extraction systems for kitchens",
      "HEPA in-duct filter cabinets and CO2 automated dampers"
    ],
    detailedSections: [
      {
        title: "Air Delivery Ducts",
        desc: "Designing leak-proof duct lines that minimize noise and maintain clean static pressures.",
        bullets: ["Spiral and rectangular galvanization structures", "In-duct sound silencing mufflers", "Acoustic damper regulation controls"],
        iconName: "Sliders"
      },
      {
        title: "Air Quality Control",
        desc: "Automated damper systems adjust fresh intake based on real-time CO2 sensor readings.",
        bullets: ["Active carbon extraction boxes", "Motorized volume air control dampers", "Inline pressure sensors integration"],
        iconName: "Activity"
      }
    ]
  },
  {
    id: "laboratory-equipment-installation",
    category: "hvac",
    title: "Lab Equipment & Fume Hoods",
    description: "Laboratory gas line systems, ducted/ductless fume hood setups, and cleanroom air systems.",
    longDescription: "Regulated environments require meticulous air design. We deploy fume hoods, negative pressure setups, gas line sensors, and carry out compliance validation.",
    iconName: "FlaskConical",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    badge: "Lab & Cleanroom Specialist",
    features: [
      "Ducted and ductless laboratory fume hood installation and testing",
      "Negative and positive pressure biological cleanroom setups",
      "Copper and stainless steel gas pipeline networks with leak shutoffs",
      "IQ/OQ/PQ system validation and airflow face velocity certifications"
    ],
    detailedSections: [
      {
        title: "Fume Hood Extraction",
        desc: "Deploy exhaust setups that safely extract toxic vapors away from laboratory technicians.",
        bullets: ["Constant volume fan controllers", "Airflow face velocity digital monitors", "Explosion-proof electrical setups"],
        iconName: "ShieldAlert"
      },
      {
        title: "Cleanroom Air Systems",
        desc: "High-frequency HEPA filtration loops to achieve ISO class cleanroom rankings.",
        bullets: ["Positive pressure isolation setups", "Integrated terminal ceiling HEPA boxes", "Continuous particulate count sensors"],
        iconName: "Activity"
      }
    ]
  }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "symptom",
    text: "What system anomaly or operational issue is your facility experiencing?",
    options: [
      { value: "airflow", label: "Weak airflow / Fan blowing but barely any cooling air (HVAC/Environmental)", score: 2 },
      { value: "warm_air", label: "Warm air blowing from AC vents / High compressor heat indicators (HVAC)", score: 4 },
      { value: "network_drop", label: "Intermittent network dropouts / High latency / Workstation disconnects (IT)", score: 3 },
      { value: "server_slow", label: "Server slowdown / Thermal throttling alarms active (Infrastructure)", score: 4 },
      { value: "av_alert", label: "Suspicious virus / Ransomware alerts triggered on endpoints (Cybersecurity)", score: 4 },
      { value: "backup_fail", label: "Daily data backup failures / Storage volume out-of-space error (Backup)", score: 3 }
    ]
  },
  {
    id: "age",
    text: "How old is the equipment or configuration currently in place?",
    options: [
      { value: "new", label: "Less than 3 years (Modern, high-efficiency system)", score: 1 },
      { value: "mid", label: "Between 3 and 7 years (Standard wear, legacy structures)", score: 2 },
      { value: "old", label: "More than 7 years (Approaching end of lifecycle or out-of-support)", score: 4 }
    ]
  },
  {
    id: "maintenance",
    text: "When was the last certified technician maintenance or full systems audit performed?",
    options: [
      { value: "recent", label: "Within the last 3 months (Proactive alignment)", score: 1 },
      { value: "medium", label: "3 to 12 months ago (Accumulating wear / outdated patches)", score: 2 },
      { value: "neglected", label: "Over 12 months ago, or we do not have a record", score: 3 }
    ]
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "smart_thermostat",
    name: "Zentrix Smart Touch Thermostat",
    category: "Smart Controls",
    price: 249.99,
    rating: 4.9,
    description: "Enterprise-grade smart programmable thermostat with commercial multi-zone support, WiFi control, and schedule-learning algorithms.",
    image: "https://images.unsplash.com/photo-1542013936693-8848e5740a7a?w=400&q=80",
    features: [
      "Commercial HVAC multi-zone wiring",
      "Saves up to 23% on heating & cooling bills",
      "iOS, Android, and Web dashboard monitoring",
      "Automatic sensor humidity adjustments"
    ]
  },
  {
    id: "merv13_filters",
    name: "Premium MERV 13 Air Filter Pack",
    category: "Filters & Airflow",
    price: 89.99,
    rating: 4.8,
    description: "High-efficiency pleated electrostatic filters that capture microscopic particles, allergens, virus carriers, and data-center grade dust.",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&q=80",
    features: [
      "Captured up to 98% of airborne pollutants",
      "Pack of 4 durable commercial-grade filters",
      "Optimized static pressure airflow resistance",
      "Meets ASHRAE standards for offices"
    ]
  },
  {
    id: "managed_switch_24p",
    name: "Enterprise 24-Port PoE+ L3 Switch",
    category: "Networking Hardware",
    price: 649.99,
    rating: 4.9,
    description: "24-port Gigabit Ethernet switch with 370W PoE+ budget, 4x 10G SFP+ uplink slots, and complete Layer 3 static routing management.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
    features: [
      "High capacity 128Gbps switching fabric",
      "Advanced VLAN, LACP, and loop protection protocols",
      "Cloud dashboard or secure local CLI management",
      "Includes server cabinet rackmount brackets"
    ]
  },
  {
    id: "rackmount_ups_1500",
    name: "Zentrix 1500VA Rackmount Online UPS",
    category: "Power Protection",
    price: 489.99,
    rating: 4.8,
    description: "Double-conversion pure sine-wave online UPS designed to fit 2U server cabinets. Keeps firewalls, modems, and servers running with zero transfer lag.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    features: [
      "Zero switch-over milliseconds transfer time",
      "Remotely manageable SNMP card included",
      "Protects against voltage sags and spikes",
      "8x backup battery sockets back panel"
    ]
  },
  {
    id: "wifi6e_ap",
    name: "Pro-Gigabit Wi-Fi 6E Access Point",
    category: "Networking Hardware",
    price: 299.99,
    rating: 4.9,
    description: "High-capacity indoor/outdoor ceiling-mounted AP. Utilizes the clear 6GHz spectrum to deliver speeds up to 5.4Gbps for dense office floors.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80",
    features: [
      "Tri-band (2.4GHz, 5GHz, 6GHz) active radios",
      "Handles up to 350 active user devices seamlessly",
      "Powered via Power-over-Ethernet (802.3at PoE+)",
      "Zero-touch cloud dashboard registration"
    ]
  }
];

export const FAQS = [
  {
    question: "Do you provide on-premise hardware installation alongside software setups?",
    answer: "Yes, ZENTRICORE is a complete turn-key solutions provider. We supply, mount, pull cabling, configure, and warrant all physical networking equipment, server racks, UPS systems, and air-conditioning units, alongside implementing active directory, CRM/ERP platforms, and cloud migrations."
  },
  {
    question: "Can I bundle Managed IT support with Environmental HVAC/Cooling maintenance?",
    answer: "Absolutely. Our unique combination of IT Systems and Environmental HVAC Engineering allows businesses to consolidate all core facility technology (servers, wiring, security, CASB, cold rooms, and split system air conditioners) under one unified service contract. This cuts down overhead and simplifies emergency dispatch calls."
  },
  {
    question: "What is your emergency response SLA for active server room failures?",
    answer: "For environments covered by our critical infrastructure support SLA, we guarantee a certified technician on-site within 4 hours. This SLA covers both network hardware failures (managed switches, firewalls, servers) and critical cooling failures (CRAC environmental systems and online UPS battery banks)."
  },
  {
    question: "How do you secure cloud backup files against ransomware deletion?",
    answer: "We deploy immutable storage policies. This utilizes WORM (Write Once, Read Many) protocols on cloud repositories. Once backup files are written, they cannot be modified, encrypted, or deleted by any system credential (even if administrative accounts are compromised) until the strict retention period expires."
  }
];
