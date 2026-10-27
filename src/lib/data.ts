import type {
  ExperienceItem,
  OpenSourceContribution,
  Project,
  ServiceItem,
  Social,
} from "@/types/portfolio.interfaces";

export type {
  ExperienceItem,
  OpenSourceContribution,
  Project,
  ServiceItem,
  Social,
};

export const PROFILE = {
  name: "Mukesh Kuiry",
  shortName: "Mukesh",
  role: "SOFTWARE ENGINEER",
  yearBadge: "©2026",
  sinceBadge: "/BUILDING SINCE 2021",
  location: "Bengaluru, India",
  education: "B.Tech in Computer Science — Haldia Institute of Technology (2021–2025)",
  email: "mukeshkk3162@gmail.com",
  githubUrl: "https://github.com/mukeshkuiry",
  linkedinUrl: "https://linkedin.com/in/mukeshkuiry",
  twitterUrl: "https://x.com/mukeshkuiry7",
  instagramUrl: "https://instagram.com/mukesh_kuiry_",
  avatarFront: "/images/mukesh-front-bw.png",
  avatarBack: "/images/mukesh-back-color.png",
  bioHeading: "Hey!",
  bioLead:
    "I’m Mukesh Kuiry, a Software Engineer based in Bengaluru, India, building high-throughput FinTech & distributed backend systems at Refyne.",
  bioParagraphs: [
    "I’m a software engineer and open-source contributor with a strong focus on building scalable backend architectures, event-driven microservices, and zero-friction developer tools.",
    "Over the years, I’ve architected production payment & mandate pipelines, contributed to CNCF Kubernetes ecosystems like KubeVirt and Meshery, and shipped native macOS and full-stack products.",
  ],
  manifestoQuote:
    "From distributed consensus to zero-friction interfaces. Clean, scalable software built to move fast, stay simple, and perform under real-world load, driven by clarity, structured systems, and intentional engineering.",
  skills: [
    "Golang",
    "TypeScript",
    "Node.js",
    "NestJS",
    "React 19",
    "Next.js",
    "Swift",
    "Python",
    "Kubernetes",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Apache Kafka",
    "RabbitMQ",
    "gRPC",
    "AWS",
  ],
} as const;

export const SERVICES: ServiceItem[] = [
  {
    id: "distributed-backends",
    title: "Distributed Backend Systems",
    category1: "Golang & gRPC",
    category2: "NestJS & TypeScript",
    category3: "Kafka & RabbitMQ",
  },
  {
    id: "fintech-architecture",
    title: "FinTech & Payment Engines",
    category1: "eNACH & UPI Autopay",
    category2: "Idempotent APIs",
    category3: "Ledger Reconciliation",
  },
  {
    id: "cloud-kubernetes",
    title: "Cloud & Kubernetes Infra",
    category1: "K8s Controllers",
    category2: "Docker & AWS",
    category3: "Zero-Downtime CI/CD",
  },
  {
    id: "fullstack-native",
    title: "Full-Stack & Native Apps",
    category1: "Next.js & React",
    category2: "Native macOS Swift",
    category3: "React Native Expo",
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "refyne-india",
    role: "Software Development Engineer I (SDE-1)",
    company: "Refyne India",
    companyUrl: "https://refyne.co.in",
    period: "2025 – Present",
    location: "Bengaluru, India",
    summary:
      "Core backend and FinOps platform engineering across earned-wage access, salary top-up lending, and automated settlement reconciliation microservices.",
    achievements: [
      "Architected generic (user + lender) level eNACH and UPI Autopay mandate capture and charging flows across Digio and Cashfree, enabling mandate coverage across 35,000+ accounts.",
      "Engineered the User Repayments Triage & Refund Hub and deterministic excess-repayment categorization engine (Implicit FnF, Foreclosure, Top-up, and Employer Debit Note reconciliation).",
      "Built Redis/BullMQ queue-backed @RetryDecorator resilience infrastructure and stabilized KYC risk-categorization state machines across core-server and lms-server.",
    ],
    techStack: ["TypeScript", "NestJS", "Node.js", "MongoDB", "Redis", "BullMQ", "React", "AWS"],
  },
  {
    id: "alchemyst-ai",
    role: "Cloud & Backend Engineer",
    company: "Alchemyst AI",
    companyUrl: "https://github.com/Alchemyst-ai",
    period: "2024",
    location: "Remote",
    summary:
      "Engineered cloud-native backend APIs, deployment workflows, and responsive product web experiences for enterprise AI agent orchestration.",
    achievements: [
      "Built and shipped production web and API surfaces for Alchemyst AI's core platform and landing architecture.",
      "Optimized container deployment pipelines and backend service integrations for multi-agent workflows.",
    ],
    techStack: ["TypeScript", "Next.js", "Node.js", "Docker", "Cloud Infrastructure"],
  },
  {
    id: "forge-build",
    role: "Go & Kubernetes Engineer",
    company: "Forge Build & JustK8s",
    companyUrl: "https://github.com/forge-build/forge",
    period: "2024",
    location: "Remote",
    summary:
      "Developed Kubernetes custom resource definitions (CRDs), reconciliation status conditions, and native Golang SSH provisioning packages.",
    achievements: [
      "Implemented native Go crypto/ssh client package (pkg/ssh) for remote machine provisioning and command execution (PR #27).",
      "Extended Build CRD specs with InfrastructureRef and MachineReady, Connected, and ProvisionersReady status lifecycle conditions (PR #28).",
    ],
    techStack: ["Golang", "Kubernetes", "CRDs", "Controller-Runtime", "crypto/ssh"],
  },
  {
    id: "freeflow-detectbox",
    role: "Software Development Engineer",
    company: "Freeflow & Detectbox",
    companyUrl: "https://freeflow.to",
    period: "2023 – 2024",
    location: "Remote",
    summary:
      "Full-stack product engineering for collaborative design workflow and security platforms, shipping 35+ merged production pull requests.",
    achievements: [
      "Built workspace collaboration modules including user invitation, role management, storage quota tracking, and link previews.",
      "Engineered interactive Kanban task boards with drag-and-drop status transitions, custom right-click context menus, and full-screen dropzone uploads.",
      "Implemented complete authentication flows with email verification, password recovery, and session security.",
    ],
    techStack: ["TypeScript", "React", "Next.js", "Golang", "Tailwind CSS", "REST APIs"],
  },
];

export const OPEN_SOURCE_CONTRIBUTIONS: OpenSourceContribution[] = [
  {
    id: "kubevirt",
    project: "KubeVirt",
    org: "CNCF / kubevirt",
    role: "Kubernetes Virtualization",
    prNumber: "PR #11831",
    prTitle: "Optimize IsKubeVirtServiceAccount namespace resolution in admission webhooks",
    prUrl: "https://github.com/kubevirt/kubevirt/pull/11831",
    repoUrl: "https://github.com/kubevirt/kubevirt",
    merged: false,
    year: "2024",
    quote:
      "Eliminated redundant per-request namespace file reads inside KubeVirt's webhook admission controller (IsKubeVirtServiceAccount) by caching service account prefix resolution in Go.",
    logoText: "KV",
    logoSrc: "/images/opensource/kubevirt-logo.png",
    avatarSrc: "/images/opensource/kubevirt-avatar.png",
    accentColor: "#faf7f3",
  },
  {
    id: "meshery",
    project: "Meshery",
    org: "CNCF / Layer5",
    role: "Cloud Native Manager",
    prNumber: "PR #8707",
    prTitle: "Migrate UserPreferences, MesheryChart & MesheryChartDialog to React functional hooks",
    prUrl: "https://github.com/meshery/meshery/pull/8707",
    repoUrl: "https://github.com/meshery/meshery",
    merged: true,
    year: "2023",
    quote:
      "Refactored legacy class-based telemetry charts and user preference state containers in Meshery's cloud-native management plane into clean, hook-driven functional components.",
    logoText: "MS",
    logoSrc: "/images/opensource/meshery-logo.png",
    avatarSrc: "/images/opensource/meshery-avatar.png",
    accentColor: "#faf7f3",
  },
  {
    id: "forge-build",
    project: "Forge Build",
    org: "forge-build / forge",
    role: "Go & K8s Controller",
    prNumber: "PR #28 · #27",
    prTitle: "Add Go crypto/ssh package & InfrastructureRef Kubernetes build status conditions",
    prUrl: "https://github.com/forge-build/forge/pull/28",
    repoUrl: "https://github.com/forge-build/forge",
    merged: true,
    year: "2024",
    quote:
      "Built the internal Go SSH machine transport layer and defined InfrastructureRef, MachineReady, and ProvisionersReady Kubernetes CRD lifecycle states with full unit test coverage.",
    logoText: "FG",
    logoSrc: "/images/opensource/forge-logo.png",
    avatarSrc: "/images/opensource/forge-avatar.png",
    accentColor: "#faf7f3",
  },
  {
    id: "flexauth-blocksuite",
    project: "FlexAuth & Freeflow",
    org: "Rajdip019 · toeverything",
    role: "Auth & Product Systems",
    prNumber: "35+ Merged PRs",
    prTitle: "Implement X_API_KEY auth middleware, unique email guards & BlockSuite contributions",
    prUrl: "https://github.com/Rajdip019/flexauth/pull/57",
    repoUrl: "https://github.com/Rajdip019/flexauth",
    merged: true,
    year: "2024",
    quote:
      "Shipped API key authentication middleware (with_api_key) and unique email identity constraints in FlexAuth, plus 35+ merged product PRs across Freeflow and Clueless UI.",
    logoText: "FA",
    logoSrc: "/images/opensource/flexauth-logo.png",
    avatarSrc: "/images/opensource/flexauth-avatar.png",
    accentColor: "#faf7f3",
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "runway",
    title: "Runway",
    shortDescription: "macOS Meeting Co-Pilot & Aviation Command Center",
    description:
      "A native macOS menu bar app written in Swift 5.10 that transforms Google Calendar into an aviation-themed command center with animated plane flyover alerts, departure board dashboards, and one-click meeting joins.",
    category: "macOS Native App",
    year: "2026",
    client: "Open Source · Homebrew",
    liveUrl: "https://runway.mukeshkuiry.com/",
    repoUrl: "https://github.com/mukeshkuiry/runway",
    techStack: ["Swift 5.10", "AppKit", "SwiftUI", "Google Calendar API", "Keychain", "LaunchAgent"],
    metrics: [
      { label: "RAM Footprint", value: "< 18 MB" },
      { label: "Install Flow", value: "Brew Tap + Auto-Agent" },
      { label: "Auth Storage", value: "macOS Keychain OAuth" },
    ],
    heroImage: "/images/projects/runway-1.png",
    galleryImages: [
      "/images/projects/runway-2.png",
      "/images/projects/runway-3.png",
    ],
    outroImage: "/images/projects/runway-1.png",
    featured: true,
    introBlocks: [
      {
        heading: "About the Product",
        paragraphs: [
          "Standard calendar notifications are easy to ignore when you are deep in a coding session. Runway reimagines meeting awareness on macOS as an aviation flight deck that lives quietly in the menu bar.",
          "Distributed via Homebrew (brew tap mukeshkuiry-refyne/tap && brew install runway), the binary self-installs its macOS LaunchAgent on first run, authenticates with Google OAuth into the system Keychain, and monitors upcoming events with zero manual setup.",
        ],
      },
      {
        heading: "Built for Zero Friction, Engineered in Native Swift",
        paragraphs: [
          "Instead of shipping a bloated Electron wrapper, Runway is compiled directly to a native macOS binary using Swift Package Manager, AppKit NSPanel overlays, and SwiftUI views.",
          "Before a meeting starts, an animated aircraft flies across the screen accompanied by a departure-board HUD that lets you join Google Meet, Zoom, or Microsoft Teams in a single click.",
        ],
      },
    ],
    bodyBlocks: [
      {
        heading: "Architecture & Flight Deck Mechanics",
        paragraphs: [
          "Runway separates responsibilities across modular managers: GoogleAuthManager and KeychainManager handle OAuth2 token refresh; CalendarManager polls and normalizes events; TimerManager schedules pre-flight T-5m and T-1m triggers; and OverlayController renders hardware-accelerated non-activating NSPanel overlays.",
          "Because the overlay window uses non-activating panel levels, flyover alerts never steal keyboard focus from your IDE or terminal while coding.",
        ],
      },
    ],
    outroBlocks: [
      {
        heading: "Precision That Respects Focus",
        paragraphs: [
          "Runway proves that developer productivity tools can be both delightful and resource-disciplined—consuming under 18 MB of memory while ensuring you never miss a critical engineering sync.",
        ],
      },
    ],
  },
  {
    slug: "clipbro",
    title: "ClipBro",
    shortDescription: "Zero-Permission MDM-Compliant macOS Clipboard Manager",
    description:
      "An ultra-minimalist native Swift macOS clipboard manager engineered with localized PID event targets to bypass restrictive enterprise MDM Accessibility blocks while delivering <2ms cursor-anchored Spotlight search.",
    category: "macOS Systems Utility",
    year: "2026",
    client: "Open Source · Native Swift",
    liveUrl: "https://github.com/mukeshkuiry/macos-clipboard-manager",
    repoUrl: "https://github.com/mukeshkuiry/macos-clipboard-manager",
    techStack: ["Swift", "AppKit", "NSPasteboard", "CoreGraphics", "MDM Zero-TCC"],
    metrics: [
      { label: "Search Latency", value: "< 2.0 ms" },
      { label: "TCC Permissions", value: "0 Required" },
      { label: "Memory Overhead", value: "12 MB Native" },
    ],
    heroImage: "/images/projects/clipbro-1.png",
    galleryImages: [
      "/images/projects/clipbro-2.png",
      "/images/projects/clipbro-3.png",
    ],
    outroImage: "/images/projects/clipbro-1.png",
    featured: true,
    introBlocks: [
      {
        heading: "Solving the Enterprise MDM Problem",
        paragraphs: [
          "On locked-down corporate MacBooks managed by enterprise MDM profiles, granting third-party clipboard managers Accessibility or Input Monitoring permissions is often blocked by security policy.",
          "ClipBro was engineered from first principles in raw Swift to operate with zero elevated TCC permissions by tracking frontmost application PIDs and dispatching localized paste events.",
        ],
      },
    ],
    bodyBlocks: [
      {
        heading: "Cursor-Anchored HUD & <2ms Search",
        paragraphs: [
          "Pressing Option + V summons a frosted-glass search panel anchored directly at your current mouse cursor coordinates, while Option + C cycles through recent clipboard items via a bottom HUD.",
          "All clipboard history is indexed in memory with sub-2ms fuzzy matching, giving instant keyboard-first recall without disk bloat.",
        ],
      },
    ],
    outroBlocks: [
      {
        heading: "Native Speed Without Compromise",
        paragraphs: [
          "Packaged with a single-command Homebrew and shell installer, ClipBro brings superpower clipboard workflows to restricted enterprise environments where traditional tools fail.",
        ],
      },
    ],
  },
  {
    slug: "codearena",
    title: "CodeArena",
    shortDescription: "1v1 Real-Time Competitive Coding & gRPC Rating Engine",
    description:
      "A distributed competitive programming platform built with Golang microservices, featuring a WebSocket matchmaking server and a gRPC + PostgreSQL Elo rating management engine.",
    category: "Distributed Systems",
    year: "2024",
    client: "Competitive Coding Platform",
    liveUrl: "https://github.com/mukeshkuiry/codearena",
    repoUrl: "https://github.com/mukeshkuiry/codearena-ws",
    techStack: ["Golang", "gRPC", "Protocol Buffers", "WebSockets", "PostgreSQL", "Docker"],
    metrics: [
      { label: "Matchmaking", value: "WebSocket <15ms" },
      { label: "Inter-Service RPC", value: "gRPC / Protobuf" },
      { label: "Rating Model", value: "ACID Elo Ledger" },
    ],
    heroImage: "/images/projects/codearena-1.png",
    galleryImages: [
      "/images/projects/codearena-2.png",
      "/images/projects/codearena-3.png",
    ],
    outroImage: "/images/projects/codearena-1.png",
    featured: true,
    introBlocks: [
      {
        heading: "Real-Time 1v1 Algorithmic Battles",
        paragraphs: [
          "CodeArena pairs developers in live 1-on-1 algorithmic coding duels. To keep matchmaking latency low and rating updates strictly consistent, the backend is decomposed into specialized Golang microservices.",
          "The matchmaking service (codearena-ws) maintains persistent WebSocket connections and pairs players within compatible skill windows in real time.",
        ],
      },
    ],
    bodyBlocks: [
      {
        heading: "gRPC Rating Service & Concurrent Rooms",
        paragraphs: [
          "Player ratings are managed by a dedicated Golang gRPC microservice (rating-management) backed by PostgreSQL. Match outcomes trigger strongly typed Protobuf RPC calls to recompute Elo deltas atomically.",
          "Goroutine-per-room isolation ensures that ratusan concurrent coding duels execute state transitions and timer synchronization without lock contention.",
        ],
      },
    ],
    outroBlocks: [
      {
        heading: "Built for Low-Latency Competition",
        paragraphs: [
          "By combining Go's lightweight concurrency primitives with gRPC service boundaries, CodeArena delivers snappy real-time matchmaking and audit-grade rating persistence.",
        ],
      },
    ],
  },
  {
    slug: "order-processor",
    title: "Order Processor",
    shortDescription: "Distributed Inventory Allocation & AMQP Order Pipeline",
    description:
      "A four-service containerized commerce backend implementing multi-warehouse stock reservation, RabbitMQ AMQP asynchronous job queues, and automated vendor inventory synchronization.",
    category: "Event-Driven Backend",
    year: "2025",
    client: "Distributed Commerce System",
    liveUrl: "https://github.com/mukeshkuiry/order-processor",
    repoUrl: "https://github.com/mukeshkuiry/order-processor",
    techStack: ["TypeScript", "Node.js", "Express", "RabbitMQ (AMQP)", "PostgreSQL", "Docker Compose"],
    metrics: [
      { label: "Microservices", value: "4 Containerized" },
      { label: "Message Broker", value: "RabbitMQ AMQP" },
      { label: "Consistency", value: "Transactional Stock" },
    ],
    heroImage: "/images/projects/order-processor-1.png",
    galleryImages: [
      "/images/projects/order-processor-2.png",
      "/images/projects/order-processor-3.png",
    ],
    outroImage: "/images/projects/order-processor-1.png",
    featured: true,
    introBlocks: [
      {
        heading: "Decoupling High-Volume Order Ingestion",
        paragraphs: [
          "Flash sales and bursty checkout traffic can easily overwhelm synchronous monolithic databases. Order Processor decouples order ingestion from fulfillment across four isolated services: order-api, order-worker, vendor-sync, and vendor-mock.",
          "When a POST /api/order request arrives, order-api validates stock availability across warehouses, reserves inventory atomically, and publishes an order payload onto a durable RabbitMQ queue.",
        ],
      },
    ],
    bodyBlocks: [
      {
        heading: "Asynchronous Workers & Vendor Synchronization",
        paragraphs: [
          "Background order-worker consumers pull queued allocations from RabbitMQ to finalize fulfillment state transitions without blocking client HTTP responses.",
          "Meanwhile, the vendor-sync service periodically reconciles external supplier inventory feeds into PostgreSQL, ensuring accurate multi-source stock allocation.",
        ],
      },
    ],
    outroBlocks: [
      {
        heading: "Production-Ready Container Topology",
        paragraphs: [
          "Orchestrated via Docker Compose with automated SQL schema initialization and health probes, the entire distributed pipeline boots reproducibly with a single command.",
        ],
      },
    ],
  },
  {
    slug: "reel-automation",
    title: "Reel Automation",
    shortDescription: "Autonomous Reddit-to-Instagram Reels Pipeline in Go",
    description:
      "An end-to-end Golang media automation pipeline that monitors subreddits via OAuth2, scores viral video velocity, transcodes 9:16 vertical video with FFmpeg, and publishes to Instagram Graph API.",
    category: "Go Media Pipeline",
    year: "2026",
    client: "Automated Media Engine",
    liveUrl: "https://github.com/mukeshkuiry/reel-automation",
    repoUrl: "https://github.com/mukeshkuiry/reel-automation",
    techStack: ["Golang", "FFmpeg", "yt-dlp", "PostgreSQL", "robfig/cron", "Instagram Graph API"],
    metrics: [
      { label: "Cron Cadence", value: "Every 2 Hours" },
      { label: "Ranking Formula", value: "0.7*Vel + 0.3*Com" },
      { label: "Video Engine", value: "FFmpeg 9:16 Pipeline" },
    ],
    heroImage: "/images/projects/reel-automation-1.png",
    galleryImages: [
      "/images/projects/reel-automation-2.png",
      "/images/projects/reel-automation-3.png",
    ],
    outroImage: "/images/projects/reel-automation-1.png",
    featured: false,
    introBlocks: [
      {
        heading: "Autonomous Viral Content Engineering",
        paragraphs: [
          "Reel Automation is a modular Go system (cmd/reel-automation) designed to detect, transform, and publish trending short-form video content with zero human intervention.",
          "Triggered every two hours by robfig/cron, the Reddit OAuth2 fetcher pulls candidate video posts across configured subreddits and filters out NSFW, locked, or stale threads.",
        ],
      },
    ],
    bodyBlocks: [
      {
        heading: "Velocity Ranking, Deduplication & FFmpeg Transcoding",
        paragraphs: [
          "Instead of relying on raw upvote counts, the ranking engine computes upvote velocity (upvotes / age_in_minutes) and ranks candidates via score = velocity * 0.7 + comments * 0.3.",
          "Unseen posts pass through sanitized yt-dlp downloading and an FFmpeg 9:16 vertical formatting pipeline before publishing to the Instagram Graph API with configurable exponential backoff retries.",
        ],
      },
    ],
    outroBlocks: [
      {
        heading: "Fault-Tolerant Worker Design",
        paragraphs: [
          "Every stage—from download to transcode and Graph API container publish—is guarded by stage-specific retry budgets and persistent PostgreSQL deduplication.",
        ],
      },
    ],
  },
  {
    slug: "committee-khata",
    title: "Committee Khata",
    shortDescription: "Community Lending Pool & Reducing-Balance Ledger",
    description:
      "A full-stack community lending and savings pool platform (React Native Expo + Express/MongoDB API) featuring reducing-balance interest accrual, 6-month interest capitalization, and a 4-tier payment waterfall.",
    category: "FinTech Full-Stack",
    year: "2026",
    client: "Community Micro-Lending",
    liveUrl: "https://github.com/mukeshkuiry/committee",
    repoUrl: "https://github.com/mukeshkuiry/committee-khata-api",
    techStack: ["React Native", "Expo Router", "TypeScript", "Express.js", "MongoDB", "Zod"],
    metrics: [
      { label: "Payment Waterfall", value: "Fine→Int→Prin→Pool" },
      { label: "Default Rule", value: "6-Month Capitalize" },
      { label: "Architecture", value: "Expo App + REST API" },
    ],
    heroImage: "/images/projects/committee-khata-1.png",
    galleryImages: [
      "/images/projects/committee-khata-2.png",
      "/images/projects/committee-khata-3.png",
    ],
    outroImage: "/images/projects/committee-khata-1.png",
    featured: false,
    introBlocks: [
      {
        heading: "Digitizing Community Savings & Lending Pools",
        paragraphs: [
          "Traditional community lending committees track monthly member contributions, pool loans, reducing-balance interest, and late fines in paper notebooks prone to calculation errors.",
          "Committee Khata provides both an offline-first React Native Expo mobile ledger and a hardened Express + MongoDB + Zod REST API (committee-khata-api) for deterministic financial accounting.",
        ],
      },
    ],
    bodyBlocks: [
      {
        heading: "Deterministic Monthly Engine & Payment Waterfall",
        paragraphs: [
          "The core financial engine enforces strict payment allocation priority: Fines → Unpaid Interest → Principal → Monthly Contribution, with real-time breakdown previews before committing a transaction.",
          "During monthly lifecycle processing, active loans accrue reducing-balance interest, missed contributions accumulate monthly fines, and 6 consecutive months of unpaid interest automatically capitalize into principal.",
        ],
      },
    ],
    outroBlocks: [
      {
        heading: "Audit-Grade Clarity on Mobile",
        paragraphs: [
          "Every member's historical ledger, active loan state, and pool liquidity is computed deterministically, eliminating disputes in community micro-finance.",
        ],
      },
    ],
  },
  {
    slug: "smart-tab-grouper",
    title: "Smart Tab Grouper",
    shortDescription: "Automated Hostname Tab Organization Engine for Chrome",
    description:
      "A Chrome Manifest V3 browser extension that automatically clusters open tabs by domain hostname per window in real time, eliminating tab clutter with one-click batch controls.",
    category: "Browser Extension",
    year: "2026",
    client: "Chrome Web Extension",
    liveUrl: "https://github.com/mukeshkuiry/smart-tab-grouper",
    repoUrl: "https://github.com/mukeshkuiry/smart-tab-grouper",
    techStack: ["JavaScript ES2023", "Chrome Extensions API", "Manifest V3", "TabGroups API"],
    metrics: [
      { label: "Extension Spec", value: "Chrome Manifest V3" },
      { label: "Grouping Scope", value: "Per-Window Hostname" },
      { label: "Event Latency", value: "< 1ms Background" },
    ],
    heroImage: "/images/projects/smart-tab-grouper-1.png",
    galleryImages: [
      "/images/projects/smart-tab-grouper-2.png",
      "/images/projects/smart-tab-grouper-3.png",
    ],
    outroImage: "/images/projects/smart-tab-grouper-1.png",
    featured: false,
    introBlocks: [
      {
        heading: "Taming Browser Chaos Automatically",
        paragraphs: [
          "Engineers routinely juggle 50+ open tabs across documentation, GitHub PRs, cloud consoles, and local dev servers. Smart Tab Grouper listens to Chrome tab navigation events and clusters tabs by hostname automatically.",
          "It scopes groups strictly per browser window and reuses existing domain groups so duplicate groups are never created.",
        ],
      },
    ],
    bodyBlocks: [
      {
        heading: "Instant Popup Controls & Zero Bloat",
        paragraphs: [
          "Alongside background auto-grouping, the extension popup provides instant actions to Group All Tabs, Group Only Ungrouped Tabs, or Ungroup All with a single click.",
        ],
      },
    ],
    outroBlocks: [
      {
        heading: "Lightweight Daily Driver",
        paragraphs: [
          "Built on Chrome's modern service-worker Manifest V3 architecture with zero external dependencies.",
        ],
      },
    ],
  },
];

export const SOCIALS: Social[] = [
  {
    label: "X",
    handle: "mukeshkuiry7",
    href: "https://x.com/mukeshkuiry7",
    iconPath:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Instagram",
    handle: "mukesh_kuiry_",
    href: "https://instagram.com/mukesh_kuiry_",
    iconPath:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "LinkedIn",
    handle: "mukeshkuiry",
    href: "https://linkedin.com/in/mukeshkuiry",
    iconPath:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    label: "GitHub",
    handle: "mukeshkuiry",
    href: "https://github.com/mukeshkuiry",
    iconPath:
      "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
];

export const CATEGORIES = [
  "All",
  "macOS Native App",
  "macOS Systems Utility",
  "Distributed Systems",
  "Event-Driven Backend",
  "Go Media Pipeline",
  "FinTech Full-Stack",
  "Browser Extension",
] as const;

export type Category = (typeof CATEGORIES)[number];

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, count = 2): Project[] {
  return PROJECTS.filter((p) => p.slug !== currentSlug).slice(0, count);
}
