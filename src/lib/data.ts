/**
 * Western Arch — Project Directory & Engineer Profile Data
 */

export const PROJECTS = [
  {
    slug: "wa-01",
    title: "tool1.westernarch.com",
    category: "Production",
    year: "2026",
    client: "WA-01",
    awards: [],
    description:
      "Browser-native asset compiler engineered for local file optimization.",
    external_url: "https://tool1.westernarch.com",
    thumbnail: null,
    hero: null,
    color: "#D4CFC7",
  },
  {
    slug: "wa-02",
    title: "tool2.westernarch.com",
    category: "Active Beta",
    year: "2026",
    client: "WA-02",
    awards: [],
    description: "Offline-first vector graphic optimization utility.",
    external_url: "https://tool2.westernarch.com",
    thumbnail: null,
    hero: null,
    color: "#C8C4BD",
  },
  {
    slug: "wa-03",
    title: "tool3.westernarch.com",
    category: "In Development",
    year: "2026",
    client: "WA-03",
    awards: [],
    description: "Minimalist Markdown document formatting system.",
    external_url: "https://tool3.westernarch.com",
    thumbnail: null,
    hero: null,
    color: "#BDB8B0",
  },
];

export const SERVICES = [
  {
    number: "01",
    name: "Core Engineering",
    description:
      "Full-pipeline ownership from system mechanics to interface layer. Every utility is built for predictability, local data isolation, and zero-server dependency.",
    tags: ["TypeScript", "Go", "Node.js", "Swift"],
  },
  {
    number: "02",
    name: "Interface Layer",
    description:
      "Browser-native interfaces engineered for instant load and absolute visual continuity across the Western Arch ecosystem.",
    tags: ["React", "Next.js", "Tailwind CSS", "WebGL"],
  },
  {
    number: "03",
    name: "System Stance",
    description:
      "Every tool is constrained to operate with data isolation, zero external server calls, and strict performance budgets from day one.",
    tags: [
      "Data Isolation",
      "Zero-Server Dependency",
      "Performance Constraints",
    ],
  },
];

export const TEAM = [
  { name: "Western Arch", role: "Independent Engineer", photo: null },
];

export const STATS = [
  { number: "3", label: "Active Tools" },
  { number: "100%", label: "Local Data" },
  { number: "0", label: "Server Deps" },
  { number: "V1.0", label: "Workspace" },
];

export const CLIENTS: string[] = [];

export const AWARDS = [
  { name: "Data Isolation", project: "System Stance", year: "Core" },
  { name: "Zero-Server Dependency", project: "System Stance", year: "Core" },
  { name: "Performance Constraints", project: "System Stance", year: "Core" },
];

export const CATEGORIES = [
  "All",
  "Production",
  "Active Beta",
  "In Development",
];
