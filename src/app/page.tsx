"use client";

import { BlogCard } from "@/components/BlogCard";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { HeroBioSection } from "@/components/HeroBioSection";
import { OpenSourceCard } from "@/components/OpenSourceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { RollingText } from "@/components/RollingText";
import { ScrollColorText } from "@/components/ScrollColorText";
import { TextArrowButton } from "@/components/TextArrowButton";
import { WordReveal } from "@/components/WordReveal";
import { getFeaturedPosts } from "@/lib/blog-data";
import {
  EXPERIENCES,
  OPEN_SOURCE_CONTRIBUTIONS,
  PROFILE,
  PROJECTS,
} from "@/lib/data";
import { blogIndexUrl } from "@/lib/site";
import { motion } from "framer-motion";
import { useState } from "react";

type ProjectFilterKey = "featured" | "all" | "systems" | "macos" | "fintech";

interface ProjectFilterTab {
  key: ProjectFilterKey;
  label: string;
}

const PROJECT_FILTER_TABS: ProjectFilterTab[] = [
  { key: "featured", label: "Featured (6)" },
  { key: "all", label: "All Work (7)" },
  { key: "systems", label: "Distributed & Go" },
  { key: "macos", label: "macOS & Native" },
  { key: "fintech", label: "FinTech & Full-Stack" },
];

export default function HomePage() {
  const [projectFilter, setProjectFilter] =
    useState<ProjectFilterKey>("featured");
  const featuredPosts = getFeaturedPosts(2);

  const visibleProjects = PROJECTS.filter((project) => {
    if (projectFilter === "featured") return project.featured;
    if (projectFilter === "all") return true;
    if (projectFilter === "systems") {
      return [
        "Distributed Systems",
        "Event-Driven Backend",
        "Go Media Pipeline",
      ].includes(project.category);
    }
    if (projectFilter === "macos") {
      return [
        "macOS Native App",
        "macOS Systems Utility",
        "Browser Extension",
      ].includes(project.category);
    }
    if (projectFilter === "fintech") {
      return ["FinTech Full-Stack", "Event-Driven Backend"].includes(
        project.category
      );
    }
    return true;
  });

  return (
    <>
      {/* 1. Shared 200vh Hero & Bio Sections + Sticky 3D Flipping Avatar of Mukesh */}
      <HeroBioSection />

      {/* 2. Scroll-Scrubbed Manifesto Quote Section (150vh track) */}
      <section className="majd-quote-section">
        <div className="majd-quote-track">
          <div className="majd-quote-sticky">
            <div className="majd-quote-box">
              <ScrollColorText text={PROFILE.manifestoQuote} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Work Experience Timeline (Broad Layout) */}
      <ExperienceSection experiences={EXPERIENCES} />

      {/* 4. Featured Projects Section with Curated Domain Selection */}
      <section id="projects" className="majd-section">
        <div className="majd-container majd-container-broad">
          <div className="majd-section-header-row">
            <div className="majd-exp-header-left">
              <span className="majd-eyebrow-tag">/ SELECTED SYSTEMS & APPS</span>
              <WordReveal
                text="Featured Projects"
                as="h2"
                className="majd-h2-section"
                trigger="inView"
                blurPx={6}
                duration={0.9}
              />
              <p className="majd-p-body majd-section-subtitle">
                Production-grade systems spanning native macOS Swift utilities,
                autonomous Golang pipelines, gRPC engines, and FinTech ledgers.
              </p>
            </div>
            <TextArrowButton
              title="All Case Studies"
              href="/work#hero-section"
              variant="primary"
            />
          </div>

          {/* Domain Selection Tabs */}
          <div
            className="majd-project-filter-bar"
            role="tablist"
            aria-label="Filter projects by engineering domain"
          >
            {PROJECT_FILTER_TABS.map((tab) => {
              const isActive = projectFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setProjectFilter(tab.key)}
                  className={`majd-filter-tab${isActive ? " is-active" : ""}`}
                >
                  <RollingText
                    text={tab.label}
                    color={isActive ? "#faf7f3" : "#111111"}
                    padding="9px 18px"
                  />
                </button>
              );
            })}
          </div>

          <div className="majd-projects-grid">
            {visibleProjects.map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Open Source & Engineering Impact */}
      <section id="open-source" className="majd-section">
        <div className="majd-container majd-container-broad">
          <div className="majd-section-header-row">
            <div className="majd-exp-header-left">
              <span className="majd-eyebrow-tag">/ UPSTREAM ENGINEERING</span>
              <WordReveal
                text="Open Source"
                as="h2"
                className="majd-h2-section"
                trigger="inView"
                blurPx={6}
                duration={0.9}
              />
              <p className="majd-p-body majd-section-subtitle">
                Merged pull requests, admission webhook optimizations, and
                Kubernetes CRD controllers across CNCF and open-source
                ecosystems.
              </p>
            </div>

            <div className="majd-exp-stats-row">
              <div className="majd-exp-stat-pill">
                <span className="majd-exp-stat-val">40+ PRs</span>
                <span className="majd-exp-stat-lbl">Merged Upstream</span>
              </div>
              <div className="majd-exp-stat-pill">
                <span className="majd-exp-stat-val">CNCF</span>
                <span className="majd-exp-stat-lbl">KubeVirt & Meshery</span>
              </div>
            </div>
          </div>

          <div className="majd-os-grid">
            {OPEN_SOURCE_CONTRIBUTIONS.map((item, idx) => (
              <OpenSourceCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Thoughts / Technical Articles Section */}
      <section id="thoughts" className="majd-section">
        <div className="majd-container majd-container-broad">
          <div className="majd-section-header-row">
            <div className="majd-exp-header-left">
              <span className="majd-eyebrow-tag">/ ENGINEERING JOURNAL</span>
              <WordReveal
                text="Technical Writing"
                as="h2"
                className="majd-h2-section"
                trigger="inView"
                blurPx={6}
                duration={0.9}
              />
              <p className="majd-p-body majd-section-subtitle">
                26 architectural deep-dives on Golang microservices, distributed
                consensus, PostgreSQL internals, and FinTech reliability.
              </p>
            </div>
            <TextArrowButton
              title="All 26 Articles"
              href={`${blogIndexUrl()}#hero-section`}
              variant="primary"
            />
          </div>

          <div className="majd-blog-grid">
            {featuredPosts.map((post, idx) => (
              <BlogCard key={post.slug} post={post} index={idx} />
            ))}

            <motion.div
              className="majd-all-posts-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.55,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="majd-all-posts-top">
                <span className="majd-all-posts-badge">
                  26 TECHNICAL ARTICLES
                </span>
                <h3 className="majd-all-posts-heading">
                  Deep-dive notes on distributed systems, databases &amp; Go —
                  explore the full archive.
                </h3>
                <p className="majd-all-posts-sub">
                  Covering Raft leader election, MVCC storage engines, B-Tree vs
                  LSM compaction, eBPF observability, and idempotent payment
                  ledgers.
                </p>
              </div>

              <div className="majd-all-posts-topics">
                {[
                  "Golang",
                  "PostgreSQL",
                  "Distributed Systems",
                  "Kafka",
                  "Kubernetes",
                  "FinTech",
                ].map((topic) => (
                  <span key={topic} className="majd-all-posts-topic-pill">
                    {topic}
                  </span>
                ))}
              </div>

              <TextArrowButton
                title="View All Articles"
                href={`${blogIndexUrl()}#hero-section`}
                variant="white"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <ContactSection />
    </>
  );
}
