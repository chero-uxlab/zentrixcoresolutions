import { ProductItem } from "./types";

export const KSH_PRODUCTS: ProductItem[] = [
  // ==========================================
  // --- HARDWARE: LAPTOPS, TABLETS & SERVERS ---
  // ==========================================
  {
    id: "hp_250_g9_laptop",
    name: "HP 250 G9 Intel Core i3 Enterprise Laptop",
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
    id: "hp_probook_450",
    name: "HP ProBook 450 G9 Business Laptop",
    category: "Hardware",
    price: 95000,
    rating: 4.8,
    description: "High-tier commercial laptop. Intel Core i5 12th Gen, 16GB DDR4 RAM, 512GB PCIe NVMe SSD, 15.6\" FHD display, Windows 11 Professional.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80",
    features: [
      "Intel Core i5 12th Gen high-throughput processor",
      "16GB DDR4 RAM for heavy enterprise multitasking",
      "512GB NVMe M.2 Solid State Drive for instant boots",
      "Preloaded Windows 11 Pro with Enterprise security"
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
    id: "lenovo_thinkpad_l14",
    name: "Lenovo ThinkPad L14 Gen 3 Professional Laptop",
    category: "Hardware",
    price: 128500,
    rating: 4.9,
    description: "Legendary military-grade durability. AMD Ryzen 5 PRO, 16GB RAM, 512GB NVMe SSD, 14\" FHD Anti-Glare display, Fingerprint reader, Windows 11 Pro.",
    image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80",
    features: [
      "Ryzen 5 PRO processor with integrated Radeon graphics",
      "16GB DDR4 upgradeable memory slots",
      "Military-grade MIL-SPEC testing for physical shocks",
      "Enhanced TPM 2.0 and biometric fingerprint security"
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
    id: "dell_latitude_5430",
    name: "Dell Latitude 5430 Corporate Laptop",
    category: "Hardware",
    price: 115000,
    rating: 4.8,
    description: "Premium corporate fleet standard. Intel Core i5 12th Gen, 16GB DDR4, 512GB SSD, 14.0\" FHD display, Thunderbolt 4, backlit keyboard, Windows 11 Pro.",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80",
    features: [
      "Intel Core i5-1245U vPro technology",
      "16GB high speed RAM + 512GB PCIe Gen4 SSD",
      "Dual Thunderbolt 4 ports & full legacy ports",
      "Dell Optimizer AI-driven battery and audio tuning"
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
  {
    id: "dell_poweredge_t150",
    name: "Dell PowerEdge T150 Tower Server",
    category: "Hardware",
    price: 245000,
    rating: 4.9,
    description: "Robust, entry-level tower server designed to power growing businesses. Intel Xeon E-2314 2.8GHz, 16GB ECC DDR4 RAM, 2TB Enterprise SATA HDD, iDRAC9 Basic.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80",
    features: [
      "Intel Xeon E-2314 4-Core Server Processor",
      "16GB ECC UDIMM Error-Correcting Memory",
      "Enterprise Grade 2TB SATA 7.2k RPM HDD (RAID ready)",
      "iDRAC9 Express server remote management board"
    ]
  },

  // ==========================================
  // --- HARDWARE: NETWORKING & ACCESSORIES ---
  // ==========================================
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
  {
    id: "ubiquiti_udm_pro",
    name: "Ubiquiti UniFi Dream Machine Pro Gateway",
    category: "Hardware",
    price: 78500,
    rating: 4.9,
    description: "All-in-one enterprise security gateway, network controller, and NVR. 10G SFP+ ports, 8-port gigabit switch, and high capacity firewall throughput.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
    features: [
      "10G SFP+ WAN/LAN ports for fiber aggregation",
      "Integrated UniFi OS Controller suite",
      "3.5\" HDD bay for UniFi Protect NVR storage",
      "Advanced firewall with DPI and IDS/IPS threat blocks"
    ]
  },
  {
    id: "ubiquiti_usw_24_poe",
    name: "Ubiquiti UniFi 24-Port PoE Gigabit Switch",
    category: "Hardware",
    price: 54000,
    rating: 4.8,
    description: "Managed 24-port Gigabit switch with (16) 802.3at PoE+ ports, (8) Gigabit Ethernet ports, and (2) 1G SFP ports. Silent fanless design.",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=500&q=80",
    features: [
      "16 Auto-Sensing 802.3at PoE+ power supply nodes",
      "2 Gigabit SFP ports for fiber uplinks",
      "1.3-inch touchscreen display for status monitoring",
      "Fanless, quiet thermal design for office deployment"
    ]
  },
  {
    id: "cisco_cbs250_24t",
    name: "Cisco CBS250-24T-4G 24-Port Smart Switch",
    category: "Hardware",
    price: 59500,
    rating: 4.8,
    description: "Cisco Business 250 Series smart switch. 24 Gigabit Ethernet ports and 4 Gigabit SFP ports. Secure management features and green Ethernet.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80",
    features: [
      "24 standard 10/100/1000 copper ports",
      "4 dedicated SFP fiber uplinks",
      "Advanced SSH, SSL, and IEEE 802.1X secure networking",
      "Energy Efficient Ethernet (IEEE 802.3az) power saving"
    ]
  },
  {
    id: "mikrotik_hex_s",
    name: "MikroTik hEX S 5-Port Gigabit Router (SFP)",
    category: "Hardware",
    price: 12500,
    rating: 4.7,
    description: "Compact 5-port Gigabit Ethernet router for locations where wireless connectivity is not required. Includes SFP port and IPsec hardware encryption.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80",
    features: [
      "880 MHz dual-core CPU with hardware IPsec acceleration",
      "5 Gigabit LAN ports + 1 SFP fiber slot",
      "microSD card slot and USB 2.0 interface",
      "RouterOS license level 4 for limitless routing configurations"
    ]
  },
  {
    id: "tplink_deco_m4_3pack",
    name: "TP-Link Deco M4 AC1200 Mesh Wi-Fi (3-Pack)",
    category: "Hardware",
    price: 19500,
    rating: 4.8,
    description: "Whole home/office mesh system covering up to 5,500 sq ft. Eliminates dead zones with unified SSID, roaming, and parental control setups.",
    image: "https://images.unsplash.com/photo-1631553127988-5f7242df0be5?w=500&q=80",
    features: [
      "Seamless roaming with a single Wi-Fi name (SSID)",
      "Covers up to 5,500 sq ft with extreme signal strength",
      "Handles up to 100+ active wireless endpoint devices",
      "Dual auto-sensing gigabit ports per Deco node unit"
    ]
  },

  // ==========================================
  // --- HARDWARE: PRINTERS & IMAGING ---
  // ==========================================
  {
    id: "epson_ecotank_l3210",
    name: "Epson EcoTank L3210 InkTank 3-in-1 Printer",
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
    id: "canon_pixma_g3411",
    name: "Canon PIXMA G3411 Wireless Ink Tank Printer",
    category: "Hardware",
    price: 24500,
    rating: 4.7,
    description: "High-yield wireless 3-in-1 printer. Supports cloud printing, mobile scanning, and printing borderless high-quality photos.",
    image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=500&q=80",
    features: [
      "Built-in Wi-Fi for wireless local and cloud printing",
      "Print up to 12,000 pages from 2 black bottles",
      "Direct printing from Canon PRINT App and Pixma Cloud Link",
      "Highly durable fine printer heads for extended life"
    ]
  },
  {
    id: "hp_laserjet_m111a",
    name: "HP LaserJet M111a Compact Mono Laser Printer",
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
  {
    id: "brother_hl_l2370dw",
    name: "Brother HL-L2370DW Wireless Mono Laser Printer",
    category: "Hardware",
    price: 19900,
    rating: 4.8,
    description: "Heavy-duty network printer with automatic duplex (2-sided) printing. Connect via wireless, Ethernet, or USB interfaces. Prints up to 36ppm.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    features: [
      "Blazing fast mono laser print speeds up to 36ppm",
      "Automatic duplex printing to conserve physical paper",
      "250-sheet adjustable paper capacity tray",
      "Wi-Fi Direct, Ethernet, and USB connectivity matrix"
    ]
  },

  // ==========================================
  // --- HARDWARE: MONITORS & ACCESSORIES ---
  // ==========================================
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
  {
    id: "logitech_mk270_combo",
    name: "Logitech MK270 Wireless Keyboard & Mouse Combo",
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

  // ==========================================
  // --- HARDWARE: STORAGE, POWER & UPS ---
  // ==========================================
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
    id: "synology_ds224_nas",
    name: "Synology DiskStation DS224+ 2-Bay NAS",
    category: "Hardware",
    price: 52000,
    rating: 4.9,
    description: "Compact 2-bay network attached storage server to bring private cloud security to your office. Intel Celeron J4125 4-core processor, expandable RAM.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&q=80",
    features: [
      "Intel Quad-Core CPU & expandable 2GB DDR4 RAM",
      "Host your own secure office private cloud system",
      "Real-time central backup and cross-device syncing",
      "Dual 1GbE LAN ports with Link Aggregation support"
    ]
  },
  {
    id: "wd_red_4tb_nas",
    name: "WD Red Plus 4TB NAS Internal Hard Drive",
    category: "Hardware",
    price: 21500,
    rating: 4.8,
    description: "Engineered specifically for 24/7 NAS system configurations. 5400 RPM, SATA 6 Gb/s interface, robust thermal control systems.",
    image: "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=500&q=80",
    features: [
      "Designed for Synology and QNAP NAS enclosures",
      "Supports RAID configurations and NASware 3.0 firmware",
      "180TB/year workload rating for continuous operations",
      "Dual-plane balance control technology for vibrations"
    ]
  },
  {
    id: "sandisk_ultra_64gb",
    name: "SanDisk Ultra Flair 64GB USB 3.0 Flash Drive",
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
  {
    id: "apc_easy_ups_1000",
    name: "APC Easy UPS 1000VA Battery Backup",
    category: "Hardware",
    price: 22500,
    rating: 4.8,
    description: "Reliable power backup and surge protector for computers, servers, and routers. 1000VA/600W output power capacity.",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=500&q=80",
    features: [
      "Automatic Voltage Regulation (AVR) safeguards",
      "600W sustained battery backup output",
      "Spike and lightning surge suppression sockets",
      "Intelligent battery health manager and warning system"
    ]
  },
  {
    id: "apc_back_ups_650",
    name: "APC Back-UPS 650VA Power Protector",
    category: "Hardware",
    price: 11900,
    rating: 4.7,
    description: "Sleek, robust backup power strip for desktop terminals and networking nodes. Features battery failure notification systems.",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=500&q=80",
    features: [
      "Provides temporary power during total blackouts",
      "Integrated audio alerts and LED status trackers",
      "Saves active data on office computers before shutoffs",
      "4 multi-use standard Ken-ya surge protected sockets"
    ]
  },

  // ==========================================
  // --- SOFTWARE LICENSES & OPERATING SYS ---
  // ==========================================
  {
    id: "m365_personal_1yr",
    name: "Microsoft 365 Personal (1-Year Retail)",
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
    id: "windows_11_pro",
    name: "Microsoft Windows 11 Pro Retail License",
    category: "Software",
    price: 24500,
    rating: 4.9,
    description: "Genuine Microsoft Windows 11 Professional retail product key. Upgrades compatible PCs to Pro edition to unlock BitLocker, Remote Desktop, and Azure AD syncing.",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=500&q=80",
    features: [
      "BitLocker device encryption to protect corporate assets",
      "Built-in Remote Desktop protocol support (host)",
      "Azure Active Directory & Windows Domain federation",
      "Windows Information Protection (WIP) leakage blocks"
    ]
  },
  {
    id: "windows_server_2022",
    name: "Microsoft Windows Server 2022 Standard (16-Core)",
    category: "Software",
    price: 115000,
    rating: 4.9,
    description: "Corporate operating system license for local on-premise servers. 16-Core licensing package supporting hybrid capabilities with Azure, multi-layer security.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80",
    features: [
      "Advanced multi-layer hardware-rooted security",
      "Secure core server protection against firmware threats",
      "Hybrid cloud management with Windows Admin Center",
      "Supports nested virtualization and hyper-converged systems"
    ]
  },
  {
    id: "adobe_cc_all_apps",
    name: "Adobe Creative Cloud All Apps (1-Yr Subscription)",
    category: "Software",
    price: 98000,
    rating: 4.9,
    description: "The complete creative suite for modern designers, developers, and editors. Genuine Adobe business subscription for 1 User. Includes Photoshop, Illustrator, Premiere Pro, Acrobat, and more.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80",
    features: [
      "Access to 20+ desktop and mobile creative apps",
      "100GB of cloud asset storage and sharing hubs",
      "Adobe Fonts licensing library integration",
      "Direct software updates and security patch bundles"
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
  {
    id: "kaspersky_endpoint_10u",
    name: "Kaspersky Endpoint Security Business (10 Node)",
    category: "Software",
    price: 38000,
    rating: 4.8,
    description: "Enterprise network endpoint protection for up to 10 nodes (Workstations/Servers) managed via centralized cloud console.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80",
    features: [
      "10 Nodes licenses managed in a single central console",
      "Protects workstations, file servers, and smartphones",
      "Integrated exploit prevention and web control filters",
      "Includes remote threat sweeps & patch managers"
    ]
  },

  // ==========================================
  // --- SECURITY SYSTEMS & SURVEILLANCE ---
  // ==========================================
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
    id: "hikvision_dome_camera",
    name: "Hikvision 4MP Dome IP Camera (Audio)",
    category: "Security",
    price: 9800,
    rating: 4.8,
    description: "4MP EXIR Dome Network Camera with built-in microphone. High-quality imaging with efficient H.265+ compression, smart motion alerts.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=80",
    features: [
      "4.0 Megapixel high definition security clarity",
      "Built-in microphone for real-time audio logging",
      "H.265+ technology reduces bandwidth by 50%",
      "Vandal-resistant dome shape perfect for indoor ceiling"
    ]
  },
  {
    id: "hikvision_nvr_8ch",
    name: "Hikvision 8-Channel PoE Network Video Recorder",
    category: "Security",
    price: 18500,
    rating: 4.8,
    description: "Plug & Play network recorder supporting up to 8 PoE cameras. 4K HDMI video output, smart search, and mobile remote monitoring via Hik-Connect.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=80",
    features: [
      "8-Channel interface with independent PoE ports",
      "Decodes up to 1-ch @ 8 MP or 4-ch @ 1080p resolution",
      "SATA drive slot supporting up to 6TB storage capacity",
      "Hik-Connect support for mobile app security review"
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
  {
    id: "zkteco_k40_biometric",
    name: "ZKTeco K40 Biometric Attendance System",
    category: "Security",
    price: 16500,
    rating: 4.8,
    description: "Self-service report fingerprint and access control terminal. 2.8\" TFT display screen, TCP/IP interface, internal backup battery power.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80",
    features: [
      "Holds up to 1,000 fingerprints & 1,000 RFID cards",
      "Store up to 80,000 logs in physical system unit",
      "TCP/IP network connection + USB Flash drive download",
      "Electronic lock, exit button, and alarm integration"
    ]
  },

  // ==========================================
  // --- SERVICES & TECHNICAL INTEGRATIONS ---
  // ==========================================
  {
    id: "pc_install_service",
    name: "PC On-Site Install & Config Service",
    category: "Services",
    price: 4500,
    rating: 4.9,
    description: "Zentrixcore certified tech dispatched to your business. Handles setup, software installation, system tuning, and domain linking.",
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
  },
  {
    id: "structured_cabling_node",
    name: "Structured LAN Cabling per Node (CAT6)",
    category: "Services",
    price: 3500,
    rating: 4.8,
    description: "Corporate Ethernet cabling installation service. Includes high quality CAT6 cabling, dual trunking channels, RJ45 crimping, labeling, and network verification testing.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    features: [
      "High specification CAT6 low-interference copper lines",
      "Secure wall-mounted PVC trunking pathways",
      "Professional labeling and patch panel termination",
      "Certified cable continuity & packet loss check"
    ]
  },
  {
    id: "fire_suppression_audit",
    name: "Server Room Fire & Environment SLA Assessment",
    category: "Services",
    price: 45000,
    rating: 4.9,
    description: "Comprehensive review of server room environmental safety. Measures precision air conditioning, humidity controls, FM200 gas fire suppression setup, and dual-UPS redundant loops.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    features: [
      "Detailed analysis of precision climate & heat load profiles",
      "Official audit of FM200 fire suppression canisters and triggers",
      "Inspection of power distribution units (PDUs) & UPS health",
      "Full compliance engineering report with safety scorecards"
    ]
  },
  {
    id: "cybersecurity_scan",
    name: "Corporate Cybersecurity Vulnerability Assessment",
    category: "Services",
    price: 65000,
    rating: 4.9,
    description: "Complete security check of your corporate network assets. Scans active IP address ranges, router configuration weaknesses, active directory policy controls, and detects ransomware vulnerabilities.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80",
    features: [
      "Comprehensive external and internal network scanning",
      "Identifies unpatched operating systems and firewall leaks",
      "Password policy weakness check across corporate logins",
      "Certified executive summary and mitigation roadmap reports"
    ]
  }
];
