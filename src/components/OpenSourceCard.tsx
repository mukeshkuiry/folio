"use client";

import type { OpenSourceContribution } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";

export interface OpenSourceCardProps {
  item: OpenSourceContribution;
  index?: number;
}

export function OpenSourceCard(props: OpenSourceCardProps) {
  const { item, index = 0 } = props;

  return (
    <motion.article
      className="majd-os-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: (index % 2) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Top Meta Bar: Org + Status Badge */}
      <div className="majd-os-top-row">
        <div className="majd-os-org-wrap">
          <span className="majd-os-org-pill">{item.org}</span>
          <span className="majd-os-year">{item.year}</span>
        </div>

        <span
          className={`majd-os-status-badge${item.merged ? " is-merged" : " is-open"}`}
        >
          {item.merged ? (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <path d="M6 21V9a9 9 0 0 0 9 9" />
            </svg>
          ) : (
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="18" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <path d="M13 6h3a2 2 0 0 1 2 2v7" />
              <line x1="6" y1="9" x2="6" y2="21" />
            </svg>
          )}
          <span>{item.merged ? "Merged Upstream" : "Upstream PR"}</span>
        </span>
      </div>

      {/* Project Identity */}
      <div className="majd-os-identity">
        <div className="majd-os-avatar-box">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.logoSrc}
            alt={item.project}
            className="majd-os-logo-img"
            loading="lazy"
          />
        </div>

        <div className="majd-os-title-group">
          <h3 className="majd-os-project-name">{item.project}</h3>
          <p className="majd-os-role">{item.role}</p>
        </div>
      </div>

      {/* Pull Request Technical Callout */}
      <div className="majd-os-pr-box">
        <div className="majd-os-pr-header">
          <span className="majd-os-pr-number">{item.prNumber}</span>
        </div>
        <p className="majd-os-pr-title">{item.prTitle}</p>
      </div>

      {/* Architectural Contribution Summary */}
      <p className="majd-os-quote">{item.quote}</p>

      {/* Bottom Links */}
      <div className="majd-os-footer">
        <a
          href={item.prUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="majd-os-action-btn is-primary"
        >
          <span>Inspect Pull Request</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>

        <a
          href={item.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="majd-os-action-btn is-secondary"
        >
          <span>Repository</span>
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
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
