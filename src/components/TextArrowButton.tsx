"use client";

import Link from "next/link";

export interface TextArrowButtonProps {
  title: string;
  href: string;
  variant?: "primary" | "white";
  newTab?: boolean;
}

function ArrowRightIcon(props: { className: string }) {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function TextArrowButton(props: TextArrowButtonProps) {
  const { title, href, variant = "primary", newTab = false } = props;
  const className = `majd-text-arrow-btn${variant === "white" ? " is-white" : ""}`;

  const inner = (
    <>
      <span className="majd-text-arrow-label">{title}</span>
      <span className="majd-arrow-box">
        <span className="majd-arrow-bg" />
        <ArrowRightIcon className="majd-arrow-icon-primary" />
        <ArrowRightIcon className="majd-arrow-icon-secondary" />
      </span>
    </>
  );

  if (newTab || href.startsWith("http")) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
