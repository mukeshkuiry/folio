export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectContentBlock {
  heading: string;
  paragraphs: string[];
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  year: string;
  client: string;
  liveUrl: string;
  repoUrl: string;
  techStack: string[];
  metrics: ProjectMetric[];
  heroImage: string;
  galleryImages: [string, string];
  outroImage: string;
  introBlocks: ProjectContentBlock[];
  bodyBlocks: ProjectContentBlock[];
  outroBlocks: ProjectContentBlock[];
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  category1: string;
  category2: string;
  category3: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  techStack: string[];
}

export interface OpenSourceContribution {
  id: string;
  project: string;
  org: string;
  role: string;
  prNumber: string;
  prTitle: string;
  prUrl: string;
  repoUrl: string;
  merged: boolean;
  year: string;
  quote: string;
  logoText: string;
  accentColor: string;
}

export interface Social {
  label: string;
  handle: string;
  href: string;
  iconPath: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  coverColor: string;
  coverImage: string;
  content: string;
}
