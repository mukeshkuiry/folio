"use client";

import { TextArrowButton } from "@/components/TextArrowButton";
import { WordReveal } from "@/components/WordReveal";
import type { ExperienceItem } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";

export interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const REFYNE_HIGHLIGHTS = [
  {
    metric: "35,000+ Accounts",
    title: "eNACH & UPI Autopay Engine",
    detail:
      "Architected generic (user + lender) mandate capture, dynamic tenure/amount calculation, and charging flows across Digio and Cashfree.",
  },
  {
    metric: "Deterministic Ledger",
    title: "FinOps Triage & Refund Hub",
    detail:
      "Engineered automated excess-repayment categorization across Implicit FnF, Foreclosure, Top-up, and Employer Debit Note settlements.",
  },
  {
    metric: "Core Reliability",
    title: "BullMQ Resilience & KYC Guards",
    detail:
      "Built Redis/BullMQ queue-backed @RetryDecorator infrastructure and hardened VKYC risk-categorization state machines.",
  },
] as const;

const ROLE_BADGES: Record<string, string> = {
  "alchemyst-ai": "AI Agent Cloud & Containers",
  "forge-build": "PR #27 & #28 · Go SSH & K8s CRDs",
  "freeflow-detectbox": "35+ Merged Production PRs",
};

export function ExperienceSection(props: ExperienceSectionProps) {
  const { experiences } = props;
  const flagship = experiences[0];
  const priorRoles = experiences.slice(1);

  return (
    <section id="experience" className="majd-section">
      <div className="majd-container majd-container-exp">
        <div className="majd-section-header-row">
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <WordReveal
              text="Experience"
              as="h2"
              className="majd-h2-section"
              trigger="inView"
              blurPx={6}
              duration={0.9}
            />
            <p className="majd-p-body" style={{ color: "var(--ink-muted)" }}>
              Production engineering across high-throughput FinTech lending,
              Kubernetes operators, and cloud-native platforms.
            </p>
          </div>
        </div>

        <div className="majd-exp-bento-wrap">
          {/* 1. Flagship Current Role Card (Full-Width Dark Bento Card) */}
          {flagship && (
            <motion.article
              className="majd-exp-flagship-card"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="majd-exp-flagship-top">
                <div className="majd-exp-flagship-badges">
                  <span className="majd-exp-live-pill">
                    <span className="majd-exp-live-pulse" aria-hidden="true" />
                    <span>CURRENT ROLE · {flagship.period.toUpperCase()}</span>
                  </span>
                  <span className="majd-exp-meta-pill">
                    {flagship.location}
                  </span>
                </div>

                <TextArrowButton
                  title="Visit Refyne"
                  href={flagship.companyUrl}
                  variant="white"
                  newTab
                />
              </div>

              <div className="majd-exp-flagship-hero">
                <div className="majd-exp-flagship-identity">
                  <span className="majd-exp-card-index">01 // FLAGSHIP</span>
                  <h3 className="majd-exp-flagship-company">
                    {flagship.company}
                  </h3>
                  <p className="majd-exp-flagship-role">{flagship.role}</p>
                </div>

                <p className="majd-exp-flagship-summary">{flagship.summary}</p>
              </div>

              {/* 3 Architectural Impact Sub-Cards */}
              <div className="majd-exp-impact-grid">
                {REFYNE_HIGHLIGHTS.map((hl, idx) => (
                  <div key={idx} className="majd-exp-impact-subcard">
                    <div className="majd-exp-impact-subcard-top">
                      <span className="majd-exp-impact-metric">
                        {hl.metric}
                      </span>
                      <span className="majd-exp-impact-num">0{idx + 1}</span>
                    </div>
                    <h4 className="majd-exp-impact-title">{hl.title}</h4>
                    <p className="majd-exp-impact-desc">{hl.detail}</p>
                  </div>
                ))}
              </div>

              <div className="majd-exp-flagship-footer">
                <span className="majd-exp-stack-label">PRODUCTION STACK</span>
                <div className="majd-exp-pills-wrap">
                  {flagship.techStack.map((tech) => (
                    <span key={tech} className="majd-exp-dark-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          )}

          {/* 2. Prior Roles 3-Column Architectural Card Grid */}
          <div className="majd-exp-cards-grid">
            {priorRoles.map((item, idx) => {
              const cardNum = String(idx + 2).padStart(2, "0");
              const highlightBadge =
                ROLE_BADGES[item.id] ?? `${item.techStack[0]} Engineering`;

              return (
                <motion.article
                  key={item.id}
                  className="majd-exp-bento-card"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="majd-exp-bento-top">
                    <div className="majd-exp-bento-meta">
                      <span className="majd-exp-bento-num">{cardNum}</span>
                      <span className="majd-exp-bento-period">
                        {item.period} · {item.location}
                      </span>
                    </div>

                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="majd-arrow-box majd-exp-bento-arrow"
                      aria-label={`Open ${item.company}`}
                    >
                      <span className="majd-arrow-bg" />
                      <svg
                        className="majd-arrow-icon-primary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                      <svg
                        className="majd-arrow-icon-secondary"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>

                  <div className="majd-exp-bento-header">
                    <h3 className="majd-exp-bento-company">{item.company}</h3>
                    <p className="majd-exp-bento-role">{item.role}</p>
                    <span className="majd-exp-bento-highlight">
                      {highlightBadge}
                    </span>
                  </div>

                  <p className="majd-exp-bento-summary">{item.summary}</p>

                  {item.achievements.length > 0 && (
                    <ul className="majd-exp-bento-list">
                      {item.achievements.slice(0, 2).map((ach, aIdx) => (
                        <li key={aIdx} className="majd-exp-bento-listitem">
                          <span
                            className="majd-exp-bento-dot"
                            aria-hidden="true"
                          />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="majd-exp-bento-footer">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="majd-pill-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
