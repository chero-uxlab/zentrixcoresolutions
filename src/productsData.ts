import { ProductItem } from "./types";

export const KSH_PRODUCTS: ProductItem[] = [
  // --- HARDWARE: LAPTOPS & TABLETS ---
  {
    id: "hp_250_g9_laptop",
    name: "HP 250 G9 Intel Core i3 Laptop",
    category: "Hardware",
    price: 41500,
    rating: 4.6,
    description: "15.6\" HD screen, Intel Core i3 processor, 8GB DDR4 RAM, 256GB NVMe SSD, Windows 11 Home, sleek Ash Gray finish. Perfect for daily office work.",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80",
    features: [
      "15.6 Inch High-Definition anti-glare screen",
      "Intel Core i3 high efficiency processing core",
      "8GB RAM + 256GB NVMe SSD rapid storage",
      "Pre-loaded with genuine Windows 11 Home OS"
    ]
  },
  {
    id: "lenovo_ideapad_3",
    name: "Lenovo IdeaPad 3 Intel Core i5 Laptop",
    category: "Hardware",
    price: 58450,
    rating: 4.7,
    description: "15.6\" Full HD laptop powered by Intel Core i5. Comes with 8GB RAM, 512GB ultra-fast SSD, and long-lasting battery life in Abyss Blue.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
    features: [
      "15.6\" Full HD (1920x1080) narrow bezel display",
      "Powerful Intel Core i5 processor block",
      "8GB DDR4 memory + 512GB ultra-speed SSD",
      "Dolby Audio dual stereo acoustic speakers"
    ]
  },
  {
    id: "asus_vivobook_15",
    name: "Asus VivoBook 15 Core i7 Premium Laptop",
    category: "Hardware",
    price: 89500,
    rating: 4.8,
    description: "Incredible enterprise power with Intel Core i7, 16GB DDR4 RAM, 512GB NVMe PCIe SSD, Intel Iris Xe graphics, and standard backlit keyboard.",
    image: "https://images.unsplash.com/photo-1496181130204-7552cc14ac1a?w=500&q=80",
    features: [
      "High performance Intel Core i7 CPU",
      "16GB DDR4 system memory for heavy multitasking",
      "512GB M.2 NVMe superfast internal SSD",
      "Sleek and robust metal-finish design"
    ]
  },
  {
    id: "apple_macbook_air_m2",
    name: "Apple MacBook Air M2 (8GB, 256GB SSD)",
    category: "Hardware",
    price: 154999,
    rating: 4.9,
    description: "Strikingly thin design, 13.6-inch Liquid Retina Display, ultra-fast Apple M2 silicon chip, silent fanless thermal system, and all-day battery.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    features: [
      "Powerful Apple M2 8-core CPU and 8-core GPU",
      "13.6\" Liquid Retina Display with 500 nits brightness",
      "MagSafe 3 charge port & dual Thunderbolt ports",
      "Silent fanless operation with 18-hour battery"
    ]
  },
  {
    id: "apple_ipad_9th_gen",
    name: "Apple iPad 10.2\" (9th Gen, 64GB, Wi-Fi)",
    category: "Hardware",
    price: 48999,
    rating: 4.9,
    description: "Features gorgeous Retina display, Apple A13 Bionic chip, 12MP ultra-wide front camera with Center Stage, and stereo speakers.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    features: [
      "Gorgeous 10.2\" Retina screen with True Tone",
      "Powerful Apple A13 Bionic chip backend",
      "64GB ultra-fast internal storage partition",
      "12MP Ultra Wide front camera with Center Stage"
    ]
  },

  // --- HARDWARE: NETWORKING ---
  {
    id: "tplink_wr840n_router",
    name: "TP-Link TL-WR840N Wireless N Router",
    category: "Hardware",
    price: 2150,
    rating: 4.5,
    description: "300Mbps wireless transmission rate ideal for both bandwidth sensitive tasks and basic work. Dual fixed omnidirectional antennas.",
    image: "https://images.unsplash.com/photo-1631553127988-5f7242df0be5?w=500&q=80",
    features: [
      "300Mbps high velocity wireless data rate",
      "Two high-gain antennas for wide coverage",
      "Easy setup with Tether smartphone application",
      "Supports Router, AP, and Range Extender modes"
    ]
  },
  {
    id: "tplink_archer_c6",
    name: "TP-Link Archer C6 AC1200 Dual Band Router",
    category: "Hardware",
    price: 4600,
    rating: 4.7,
    description: "AC1200 Dual-Band Wi-Fi Router offering 300Mbps at 2.4GHz and 867Mbps at 5GHz. 4 external antennas plus MU-MIMO technology.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80",
    features: [
      "Simultaneous 2.4GHz and 5GHz dual-band channels",
      "4 external high-gain antennas for broad coverage",
      "MU-MIMO achieves double efficiency by communicating",
      "Gigabit Ethernet ports for ultra-fast cable speed"
    ]
  },
  {
    id: "ubiquiti_unifi_ap_ac_lite",
    name: "Ubiquiti UniFi AP AC Lite Access Point",
    category: "Hardware",
    price: 13950,
    rating: 4.8,
    description: "Enterprise grade dual-radio gigabit speed Wi-Fi access point. Managed using the sleek UniFi network controller package.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
    features: [
      "Simultaneous dual-band 2x2 MIMO technology",
      "802.3af/A PoE compatibility with ultra-low profile",
      "Advanced enterprise software control system",
      "Supports up to 250+ concurrent active client devices"
    ]
  },

  // --- HARDWARE: PRINTERS & IMAGING ---
  {
    id: "epson_ecotank_l3210",
    name: "Epson EcoTank L3210 InkTank Printer",
    category: "Hardware",
    price: 26999,
    rating: 4.8,
    description: "Multi-function 3-in-1 print, copy, and scan. Features ultra-low-cost ink tank technology with spill-free, key-locked bottles.",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&q=80",
    features: [
      "Integrated high-capacity spill-free ink tanks",
      "Extremely low cost per print page ratio",
      "Complete 3-in-1 Print, Scan, and Copy",
      "Outstanding high print resolution of 5760 dpi"
    ]
  },
  {
    id: "hp_laserjet_m111a",
    name: "HP LaserJet M111a Compact Mono Printer",
    category: "Hardware",
    price: 16900,
    rating: 4.6,
    description: "An efficient, high-quality monochrome laser printer that fits your space and budget. Prints crisp black text at speeds up to 20ppm.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    features: [
      "Super compact layout to fit any home office desk",
      "Crisp black laser print outputs up to 20ppm",
      "Energy efficient auto-on/auto-off smart tool",
      "150-sheet standard input paper tray capacity"
    ]
  },

  // --- HARDWARE: MONITORS & DISP ---
  {
    id: "dell_se2422h_monitor",
    name: "Dell SE2422H 24-Inch Full HD Monitor",
    category: "Hardware",
    price: 18900,
    rating: 4.7,
    description: "24\" screen with high quality LED backlight, 75Hz refresh rate, AMD FreeSync, and flicker-free screen protection.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
    features: [
      "Spacious 24-inch diagonal LED-backlit workspace",
      "Ultra smooth 75Hz refresh rate with AMD FreeSync",
      "Sleek compact stand to minimize desk clutter",
      "TUV-certified comfort view eye protect mode"
    ]
  },
  {
    id: "lg_24mp400_monitor",
    name: "LG 24MP400-B 24\" IPS FHD Monitor",
    category: "Hardware",
    price: 17500,
    rating: 4.6,
    description: "IPS panel for accurate colors and wide viewing angles. Standard thin bezel layout, AMD FreeSync, Reader Mode, and wall mountable.",
    image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=500&q=80",
    features: [
      "FHD IPS wide-view screen panel (1920x1080)",
      "Three-side virtually borderless modern layout",
      "Dynamic Action Sync and Black Stabilizer tools",
      "Reader Mode & Flicker Safe to prevent eye strain"
    ]
  },

  // --- HARDWARE: STORAGE & DISKS ---
  {
    id: "seagate_expansion_1tb",
    name: "Seagate Expansion 1TB External Hard Drive",
    category: "Hardware",
    price: 7499,
    rating: 4.8,
    description: "USB 3.0 portable external hard drive. Drag-and-drop file saving right out of the box, bus-powered via USB port.",
    image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=500&q=80",
    features: [
      "Sleek, lightweight pocket size casing",
      "High speed USB 3.0 data synchronization",
      "Drag-and-drop immediate plug-and-play",
      "Compatible with Windows and macOS file formats"
    ]
  },
  {
    id: "transcend_storejet_2tb",
    name: "Transcend StoreJet 25M3 2TB Shockproof Disk",
    category: "Hardware",
    price: 11450,
    rating: 4.8,
    description: "Ruggedized external hard drive featuring military-grade shock resistance, USB 3.1 interface, and One-Touch auto-backup button.",
    image: "https://images.unsplash.com/photo-1590156221122-c7b3cd6d21a6?w=500&q=80",
    features: [
      "Military-grade robust shockproof silicon shell",
      "USB 3.1 Gen 1 high velocity interface",
      "One-touch instant data auto-backup tool",
      "Advanced 256-bit AES file encryption layers"
    ]
  },
  {
    id: "sandisk_ultra_64gb",
    name: "SanDisk Ultra Flair 64GB USB 3.0 Drive",
    category: "Hardware",
    price: 1399,
    rating: 4.5,
    description: "High-speed USB 3.0 performance of up to 150MB/s. Sleek, durable metal casing with secure files encryption tools.",
    image: "https://images.unsplash.com/photo-1601524909162-be87252be298?w=500&q=80",
    features: [
      "Blazing fast USB 3.0 transfer up to 150MB/s",
      "Sleek, robust brushed-metal protective casing",
      "Secure Access 128-bit file encryption software",
      "Backward compatible with older USB 2.0 ports"
    ]
  },

  // --- HARDWARE: ACCESSORIES & INP ---
  {
    id: "logitech_mk270_combo",
    name: "Logitech MK270 Wireless Keyboard & Mouse",
    category: "Hardware",
    price: 3850,
    rating: 4.7,
    description: "Long-range 2.4 GHz wireless keyboard and mouse set. Features 8 multimedia hotkeys and extended battery life with plug-and-forget receiver.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    features: [
      "Secure, low latency 2.4 GHz wireless connection",
      "Long range coverage up to 10 meters distance",
      "Keyboard features 8 convenient media hotkeys",
      "Extended battery lifespan (up to 36 months)"
    ]
  },
  {
    id: "logitech_m185_mouse",
    name: "Logitech M185 Wireless Optical Mouse",
    category: "Hardware",
    price: 1800,
    rating: 4.6,
    description: "A simple, reliable mouse with plug-and-play wireless. Get a high quality connection with 12-month average battery life.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80",
    features: [
      "Comfortable contoured design for left or right hands",
      "Nano USB plug-and-forget wireless module receiver",
      "Long-range 12-month battery life with smart sleep",
      "High resolution optical tracking up to 1000 DPI"
    ]
  },
  {
    id: "hikvision_webcam_u02",
    name: "Hikvision DS-U02 1080P Full HD Webcam",
    category: "Hardware",
    price: 3200,
    rating: 4.6,
    description: "2 MP CMOS sensor providing high quality video at 1920x1080 resolution. Includes a built-in intelligent microphone.",
    image: "https://images.unsplash.com/photo-1600541519463-ee3280145230?w=500&q=80",
    features: [
      "Stunning 1080P Full HD live streaming resolution",
      "Smart low-light auto exposure adjustment",
      "Integrated noise-reducing internal microphone",
      "Flexible universal clip mount for monitors/laptops"
    ]
  },

  // --- SOFTWARE LICENSES ---
  {
    id: "m365_personal_1yr",
    name: "Microsoft 365 Personal (1-Year Liz)",
    category: "Software",
    price: 8500,
    rating: 4.8,
    description: "1-year license subscription for one user. Access premium Office apps (Word, Excel, PowerPoint) and 1TB of secure OneDrive storage.",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=500&q=80",
    features: [
      "Full premium suite of Word, Excel, PowerPoint",
      "1TB of secure OneDrive cloud backup storage",
      "Continuous software feature & patch updates",
      "Cross-platform compatibility for PC, Mac, Mobile"
    ]
  },
  {
    id: "m365_bus_standard_1yr",
    name: "Microsoft 365 Business Standard (Annual)",
    category: "Software",
    price: 19800,
    rating: 4.9,
    description: "Enterprise level business suite. Includes all premium Office apps plus corporate email inbox hosting, Microsoft Teams, and secure cloud storage.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80",
    features: [
      "Word, Excel, PowerPoint, Outlook & Publisher",
      "Premium Microsoft Teams setup for video meetings",
      "50GB corporate email inbox hosting per user node",
      "1TB secure OneDrive file storage system"
    ]
  },
  {
    id: "kaspersky_is_3u_1yr",
    name: "Kaspersky Internet Security (3 Users / 1-Yr)",
    category: "Software",
    price: 4200,
    rating: 4.9,
    description: "Award-winning internet safety pack for 3 devices. Shields personal devices from malware, ransomware, and phishing threats.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80",
    features: [
      "Triple device protection cover for PC, Mac, Android",
      "Active webcam access protection locks",
      "Safe Money banking encryption protection",
      "Real-time ransomware threat hunter shield"
    ]
  },

  // --- SECURITY SYSTEMS ---
  {
    id: "hikvision_ip_camera",
    name: "Hikvision Outdoor Bullet IP Camera (2MP)",
    category: "Security",
    price: 5800,
    rating: 4.7,
    description: "2MP Full HD PoE bullet network camera. Complete weatherproof IP67 structure with 30m infrared range for night vision security.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=80",
    features: [
      "2.0 Megapixel high-definition video capture",
      "Power-over-Ethernet (PoE) single wire design",
      "IP67 dust and water extreme weatherproof seal",
      "High capacity 30-meter infrared night sight"
    ]
  },
  {
    id: "dlink_4g_router",
    name: "D-Link DWR-921 4G LTE Security Router",
    category: "Security",
    price: 9500,
    rating: 4.6,
    description: "Allows you to connect to worldwide mobile networks. Dual-active NAT and SPI firewalls keep networks protected.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80",
    features: [
      "Dual-active NAT and SPI firewall defenses",
      "WPA/WPA2 encryption lock for secure connections",
      "Failover WAN support for continuous line redundancy",
      "Sim card integration for 4G backup data paths"
    ]
  },

  // --- SERVICES & INTEGRATIONS ---
  {
    id: "pc_install_service",
    name: "PC On-Site Install & Config Service",
    category: "Services",
    price: 4500,
    rating: 4.9,
    description: "Zentricore certified tech dispatched to your business. Handles setup, software installation, system tuning, and domain linking.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    features: [
      "Personalized on-site installation and testing",
      "Custom OS and core application packaging",
      "Official active directory domain integration",
      "Corporate network printer & share setups"
    ]
  },
  {
    id: "wifi_audit_service",
    name: "Enterprise Wi-Fi Signal Audit Service",
    category: "Services",
    price: 15000,
    rating: 4.8,
    description: "Comprehensive radio analysis, cable sorting, signal heatmap tracing, channel optimizer, and coverage verification.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80",
    features: [
      "Comprehensive Wi-Fi channel & noise audit",
      "Structured network cabinet cabling organization",
      "Heatmap analysis of wireless coverage dead zones",
      "Firmware patching and security posture locks"
    ]
  }
];
