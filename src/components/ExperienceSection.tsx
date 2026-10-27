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
      <div className="majd-container majd-container-broad">
        <div className="majd-exp-header">
          <div className="majd-exp-header-left">
            <span className="majd-eyebrow-tag">/ CAREER TIMELINE</span>
            <WordReveal
              text="Experience"
              as="h2"
              className="majd-h2-section"
              trigger="inView"
              blurPx={6}
              duration={0.9}
            />
            <p className="majd-p-body majd-section-subtitle">
              Architecting high-throughput FinTech payment engines, cloud-native
              Kubernetes operators, and full-stack product platforms.
            </p>
          </div>

          <div className="majd-exp-stats-row">
            <div className="majd-exp-stat-pill">
              <span className="majd-exp-stat-val">4 Roles</span>
              <span className="majd-exp-stat-lbl">Production Engineering</span>
            </div>
            <div className="majd-exp-stat-pill">
              <span className="majd-exp-stat-val">35K+</span>
              <span className="majd-exp-stat-lbl">Mandate Accounts Scaled</span>
            </div>
            <div className="majd-exp-stat-pill">
              <span className="majd-exp-stat-val">Go · TS</span>
              <span className="majd-exp-stat-lbl">Core Systems Stack</span>
            </div>
          </div>
        </div>

        <div className="majd-experience-list">
          {experiences.map((item, idx) => (
            <motion.article
              key={item.id}
              className="majd-experience-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="majd-exp-left-col">
                <div className="majd-exp-meta-top">
                  <span className="majd-exp-index">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="majd-exp-period-badge">{item.period}</span>
                </div>

                <h3 className="majd-h3-card majd-exp-company">
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="majd-exp-company-link"
                  >
                    <span>{item.company}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                </h3>

                <p className="majd-exp-role">{item.role}</p>

                <p className="majd-exp-location">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{item.location}</span>
                </p>
              </div>

              <div className="majd-exp-right-col">
                <p className="majd-exp-summary">{item.summary}</p>

                {item.achievements.length > 0 && (
                  <ul className="majd-exp-achievements">
                    {item.achievements.map((achievement, aIdx) => (
                      <li key={aIdx} className="majd-exp-achievement-item">
                        <span
                          className="majd-exp-achievement-bullet"
                          aria-hidden="true"
                        />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="majd-exp-tech-wrap">
                  {item.techStack.map((tech) => (
                    <span key={tech} className="majd-pill-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
