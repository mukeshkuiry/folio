import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Mukesh Kuiry",
  description: "Thoughts on software engineering, distributed systems, and building things that scale.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
