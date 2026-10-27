"use client";

export interface SocialIconProps {
  label: string;
  href: string;
  iconPath: string;
}

export function SocialIcon(props: SocialIconProps) {
  const { label, href, iconPath } = props;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="majd-social-btn"
    >
      <svg
        className="majd-social-icon-top"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={iconPath} />
      </svg>
      <svg
        className="majd-social-icon-bottom"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={iconPath} />
      </svg>
    </a>
  );
}
