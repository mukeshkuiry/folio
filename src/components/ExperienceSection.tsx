"use client";

import { WordReveal } from "@/components/WordReveal";
import type { ExperienceItem } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";

export interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export function ExperienceSection(props: ExperienceSectionProps) {
  const { experiences } = props;

  return (
    <section id="experience" className="majd-section">
      <div className="majd-container majd-container-exp">
        <div className="majd-section-header-row majd-exp-header-bar">
          <WordReveal
            text="Experience"
            as="h2"
            className="majd-h2-section"
            trigger="inView"
            blurPx={6}
            duration={0.9}
          />
          <div className="majd-exp-header-meta">
            <span className="majd-exp-live-dot" aria-hidden="true" />
            <span>2023 — PRESENT · 4 PRODUCTION ROLES</span>
          </div>
        </div>

        <div className="majd-experience-list">
          {experiences.map((item, idx) => {
            const isCurrent = item.period.toLowerCase().includes("present");
            const indexLabel = String(idx + 1).padStart(2, "0");

            return (
              <motion.article
                key={item.id}
                className="majd-experience-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.72,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Col 1: Sculptural Index & Timeline */}
                <div className="majd-exp-col-index">
                  <span className="majd-exp-num">/{indexLabel}</span>
                  <div className="majd-exp-time-group">
                    <span
                      className={`majd-exp-period${isCurrent ? " is-current" : ""}`}
                    >
                      {isCurrent && (
                        <span
                          className="majd-exp-current-dot"
                          aria-hidden="true"
                        />
                      )}
                      {item.period}
                    </span>
                    <span className="majd-exp-loc">{item.location}</span>
                  </div>
                </div>

                {/* Col 2: Company & Role Identity */}
                <div className="majd-exp-col-company">
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="majd-exp-company-link"
                  >
                    <h3 className="majd-exp-company-name">{item.company}</h3>
                    <span className="majd-arrow-box majd-exp-arrow-box" aria-hidden="true">
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
                    </span>
                  </a>
                  <p className="majd-exp-role-title">{item.role}</p>
                </div>

                {/* Col 3: Engineering Impact & Tech Stack */}
                <div className="majd-exp-col-impact">
                  <p className="majd-exp-lead-summary">{item.summary}</p>

                  {item.achievements.length > 0 && (
                    <div className="majd-exp-impact-list">
                      {item.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="majd-exp-impact-row">
                          <span className="majd-exp-impact-idx">
                            0{aIdx + 1}
                          </span>
                          <p className="majd-exp-impact-text">{ach}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="majd-exp-stack-row">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="majd-exp-tech-pill">
                        {tech}
                      </span>
                    ))}
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
