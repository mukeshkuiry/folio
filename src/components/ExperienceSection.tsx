"use client";

import { WordReveal } from "@/components/WordReveal";
import type { ExperienceItem } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";

export interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

const ROLE_METRICS: Record<string, string[]> = {
  "refyne-india": [
    "380+ Merged PRs",
    "35,000+ Autopay Mandates",
    "13 Microservices",
  ],
  "alchemyst-ai": ["Multi-Agent Cloud APIs", "Docker CI/CD"],
  "forge-build": ["Go crypto/ssh Package", "Kubernetes CRDs"],
  "freeflow-detectbox": ["35+ Merged PRs", "RBAC & Auth Engine"],
};

export function ExperienceSection(props: ExperienceSectionProps) {
  const { experiences } = props;

  return (
    <section id="experience" className="majd-section">
      <div className="majd-container">
        <div className="majd-section-header-row">
          <WordReveal
            text="Experience"
            as="h2"
            className="majd-h2-section"
            trigger="inView"
            blurPx={6}
            duration={0.9}
          />
          <p
            className="majd-p-body"
            style={{ color: "var(--ink-muted)", maxWidth: "420px" }}
          >
            420+ production pull requests shipped across FinTech lending,
            distributed systems, and Kubernetes infrastructure.
          </p>
        </div>

        <div className="majd-experience-list">
          {experiences.map((item, idx) => {
            const isCurrent = item.period.toLowerCase().includes("present");
            const metrics = ROLE_METRICS[item.id] ?? [];

            return (
              <motion.article
                key={item.id}
                className="majd-experience-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Top Header Bar: Role + Company on Left, Tenure & Location Pill on Right */}
                <div className="majd-exp-card-header">
                  <div className="majd-exp-header-titles">
                    <h3 className="majd-h3-card majd-exp-role-heading">
                      {item.role}
                    </h3>
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="majd-exp-company-anchor"
                    >
                      <span>{item.company}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>

                  <div className="majd-exp-header-badges">
                    <span
                      className={`majd-exp-tenure-pill${isCurrent ? " is-active" : ""}`}
                    >
                      {isCurrent && (
                        <span
                          className="majd-exp-active-dot"
                          aria-hidden="true"
                        />
                      )}
                      <span>{item.period}</span>
                    </span>
                    <span className="majd-exp-location-pill">
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Balanced 2-Column Body: Left (Summary + Metrics + Stack) | Right (Key Impact Pointers) */}
                <div className="majd-exp-card-body">
                  <div className="majd-exp-body-left">
                    <p className="majd-exp-overview">{item.summary}</p>

                    {metrics.length > 0 && (
                      <div className="majd-exp-metrics-wrap">
                        {metrics.map((m) => (
                          <span key={m} className="majd-exp-metric-badge">
                            {m}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="majd-service-categories majd-exp-stack-bar">
                      {item.techStack.map((tech, tIdx) => (
                        <span
                          key={tech}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          {tIdx > 0 && (
                            <span
                              className="majd-service-dot"
                              aria-hidden="true"
                            />
                          )}
                          <span
                            className="majd-p-small"
                            style={{ color: "var(--ink-muted)" }}
                          >
                            {tech}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="majd-exp-body-right">
                    <ul className="majd-exp-points">
                      {item.achievements.map((ach, aIdx) => {
                        const colonIndex = ach.indexOf(":");
                        const hasLabel = colonIndex > 0 && colonIndex < 42;
                        const label = hasLabel
                          ? ach.slice(0, colonIndex + 1)
                          : "";
                        const rest = hasLabel ? ach.slice(colonIndex + 1) : ach;

                        return (
                          <li key={aIdx} className="majd-exp-point">
                            <span
                              className="majd-service-dot majd-exp-point-dot"
                              aria-hidden="true"
                            />
                            <span className="majd-exp-point-text">
                              {hasLabel ? (
                                <>
                                  <strong className="majd-exp-point-strong">
                                    {label}
                                  </strong>
                                  {rest}
                                </>
                              ) : (
                                ach
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
