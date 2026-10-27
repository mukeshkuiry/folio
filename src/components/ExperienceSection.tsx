"use client";

import { TextArrowButton } from "@/components/TextArrowButton";
import { WordReveal } from "@/components/WordReveal";
import type { ExperienceItem } from "@/types/portfolio.interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export function ExperienceSection(props: ExperienceSectionProps) {
  const { experiences } = props;
  const [openId, setOpenId] = useState<string | null>(
    experiences[0]?.id ?? null
  );

  const toggleRow = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="majd-section">
      <div className="majd-container">
        <WordReveal
          text="Experience"
          as="h2"
          className="majd-h2-section"
          trigger="inView"
          blurPx={6}
          duration={0.9}
        />

        <div className="majd-exp-accordion">
          {experiences.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                className={`majd-exp-item${isOpen ? " is-open" : ""}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  type="button"
                  className="majd-exp-trigger"
                  onClick={() => toggleRow(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="majd-exp-trigger-left">
                    <h3 className="majd-h3-card majd-exp-title">
                      {item.company}
                    </h3>
                    <span className="majd-exp-role-inline">{item.role}</span>
                  </div>

                  <div className="majd-exp-trigger-right">
                    <div className="majd-service-categories majd-exp-inline-tech">
                      {item.techStack.slice(0, 3).map((tech, tIdx) => (
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
                          <span className="majd-p-body">{tech}</span>
                        </span>
                      ))}
                    </div>

                    <span className="majd-exp-period-label">{item.period}</span>

                    <span
                      className={`majd-exp-toggle-icon${isOpen ? " is-open" : ""}`}
                      aria-hidden="true"
                    >
                      <span className="majd-exp-plus-h" />
                      <span className="majd-exp-plus-v" />
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      className="majd-exp-panel-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.38,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <div className="majd-exp-panel">
                        <div className="majd-exp-panel-left">
                          <p className="majd-p-body" style={{ color: "#111111" }}>
                            {item.summary}
                          </p>
                          <div className="majd-exp-panel-meta">
                            <span
                              className="majd-p-small"
                              style={{ color: "var(--ink-muted)" }}
                            >
                              {item.period} · {item.location}
                            </span>
                            <TextArrowButton
                              title="Company Website"
                              href={item.companyUrl}
                              variant="primary"
                              newTab
                            />
                          </div>
                        </div>

                        <div className="majd-exp-panel-right">
                          {item.achievements.map((ach, aIdx) => (
                            <p
                              key={aIdx}
                              className="majd-p-small majd-exp-bullet"
                            >
                              {ach}
                            </p>
                          ))}

                          <div className="majd-exp-tags">
                            {item.techStack.map((tech) => (
                              <span key={tech} className="majd-pill-badge">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
