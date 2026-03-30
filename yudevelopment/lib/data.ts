// lib/data.ts — central content file (your "CMS")
// Edit anything here to update the site.

export const siteConfig = {
  name: "YuDevelopment",
  tagline: "The company that builds companies",
  description:
    "YuDevelopment is the operational and strategic engine behind a growing ecosystem of companies. We build the systems, teams, and processes that keep each business running smoothly and growing quickly.",
  contact: {
    address: "Atlanta, GA 30303",
    phone: "(555) 123-4567",
    email: "careers@yudevelopment.com",
  },
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Who We Are", href: "/about" },
  { label: "Our Companies", href: "/companies" },
  { label: "People", href: "/people" },
];

export const companies = [
  {
    id: "atlanta-hoa",
    name: "Atlanta HOA Services",
    logo: "AHS",
    logoStyle: "serif",
    description:
      "Atlanta HOA Services manages and maintains communities across Georgia with a focus on reliability and quick execution. Our team handles repairs, maintenance, vendor coordination, and day-to-day operations so homeowners and property owners can rely on clean, safe, and well-run communities.",
    href: "#",
  },
  {
    id: "yu-development",
    name: "Yu Development",
    logo: "YD",
    logoStyle: "icon",
    description:
      "Yu Development is our predevelopment and deal-sourcing company. We find land, run the numbers, work with cities, and prepare each project for construction. The team handles the early work that turns raw land into real developments and future communities.",
    href: "#",
  },
  {
    id: "justdoyu",
    name: "JustDoYu",
    logo: "JUSTDOYU",
    logoStyle: "bold",
    description:
      "JustDoYu is our media and content arm. We create educational and behind-the-scenes content that shows how real development and real operations work. The goal is simple. Share what we build, attract the right people, and document the journey.",
    href: "#",
  },
  {
    id: "truenorthway",
    name: "TrueNorthWay",
    logo: "TRUENORTHWAY",
    logoStyle: "bold",
    description:
      "Vertically integrated Attainable Housing Real Estate Developer with 7 years entitling, construction, and managing their projects.",
    href: "#",
  },
];

export const departments = [
  {
    id: "hr",
    icon: "</>",
    label: "Human Resources",
    title: "Human Resources",
    description:
      "Human Resources focuses on building strong teams for both YuDevelopment and the companies it supports. This department manages hiring pipelines, job descriptions, interview processes, onboarding, role clarity, team structure, and talent evaluation. The team also helps shape company culture and ensures that organizations have the right people in the right positions. People & Recruiting is responsible for helping companies scale with capable and aligned talent.",
  },
  {
    id: "ops",
    icon: "⚙",
    label: "Operations",
    title: "Operations",
    description:
      "Operations is the backbone of execution across the portfolio. This department designs the processes, workflows, and systems that keep each company moving without friction. From daily task management to cross-company coordination, Operations ensures that work gets done at a high standard, on time, and with clear accountability.",
  },
  {
    id: "admin",
    icon: "◎",
    label: "Administration",
    title: "Administration",
    description:
      "Administration handles the structural and organizational functions that support every company in the ecosystem. This includes legal coordination, compliance, documentation, executive support, and the administrative infrastructure needed to keep businesses running cleanly and professionally.",
  },
  {
    id: "sales",
    icon: "↗",
    label: "Sales & Marketing",
    title: "Sales & Marketing",
    description:
      "Sales & Marketing drives revenue and brand awareness across the portfolio. This team develops go-to-market strategies, manages client relationships, creates marketing assets, and runs campaigns that generate leads and close deals. They work closely with each company to align messaging with business goals.",
  },
  {
    id: "finance",
    icon: "◎",
    label: "Finance & Accounting",
    title: "Finance & Accounting",
    description:
      "Finance & Accounting manages the financial health of each company in the ecosystem. This includes budgeting, bookkeeping, financial reporting, cash flow management, and strategic financial planning. The team ensures that every business has a clear picture of its numbers and is operating with financial discipline.",
  },
];

export const pillars = [
  {
    num: "01",
    icon: "✦",
    title: "Communication",
    description:
      "Speed comes from clarity. We write things down, share context early, and make sure the whole team can move without waiting for answers. Information flows here, fast and clear.",
  },
  {
    num: "02",
    icon: "🚀",
    title: "Determination",
    description:
      "We finish what we start. Obstacles are expected, not excuses. When you own something at YuDevelopment, you're accountable for the outcome, and we give you the authority to drive it.",
  },
  {
    num: "03",
    icon: "👥",
    title: "Proactiveness",
    description:
      "The best teams don't wait to be managed. We spot issues before they escalate, take initiative within our scope, and solve problems early. Reactive isn't in our DNA.",
  },
  {
    num: "04",
    icon: "⚡",
    title: "Speed",
    description:
      "We move with urgency. Decisions are made fast, feedback is given immediately, and we ship before it's perfect rather than wait for it to be perfect before we ship.",
  },
  {
    num: "05",
    icon: "◎",
    title: "Focus",
    description:
      "We don't chase everything. We identify the highest-leverage work, say no to distractions, and go deep on what actually moves the needle for the business.",
  },
  {
    num: "06",
    icon: "↗",
    title: "Growth",
    description:
      "Everyone here is expected to grow — in skill, in role, in impact. We invest in our team because building great companies requires building great people.",
  },
];

export const featuredProjects = [
  {
    id: 1,
    company: "Atlanta HOA Services",
    title: "Atlanta HOA Services landscaping for Fairfield by Marriott Inn & Suites Alpharetta Avalon Area",
    date: "November 2025",
    excerpt:
      "AHS stepped in to help the hotel owners with site work and landscaping after months of failure to pass local county inspections.",
    image: "/projects/fairfield.jpg",
    imageBg: "#6b7a5e",
  },
  {
    id: 2,
    company: "TrueNorthWay",
    title: "TrueNorthWay Completed Platform Douglas",
    date: "December 2025",
    excerpt:
      "Platform Douglas — Douglas, GA. 126 units | Completed Dec 2025 Introducing Platform Douglas, a new-construction multifamily community and leasing has begun in Douglas, GA, created to deliver attainable, quality housing in a growing regional market.",
    image: "/projects/platform-douglas.jpg",
    imageBg: "#8a9ba0",
  },
  {
    id: 3,
    company: "TrueNorthWay",
    title: "TrueNorthWay Expands into New Markets",
    date: "January 2026",
    excerpt:
      "Platform Douglas continues to grow as TrueNorthWay expands its attainable housing footprint across the Southeast.",
    image: "/projects/truenorthway.jpg",
    imageBg: "#7a8b9a",
  },
];

export const teamMembers = [
  { name: "George Yu", role: "Founder & CEO", initials: "GY" },
  { name: "Sarah Lin", role: "Chief Operating Officer", initials: "SL" },
  { name: "Marcus Thompson", role: "VP of Operations", initials: "MT" },
  { name: "Priya Patel", role: "Head of Finance", initials: "PP" },
  { name: "James Washington", role: "Director of HR", initials: "JW" },
  { name: "Amy Chen", role: "Head of Marketing", initials: "AC" },
];
