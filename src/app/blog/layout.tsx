import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Thoughts & Articles — Mukesh Kuiry",
  description:
    "Engineering deep-dives on distributed systems, Golang microservices, database internals, and cloud-native architecture.",
};

export default function BlogLayout(props: Readonly<{ children: ReactNode }>) {
  const { children } = props;
  return <>{children}</>;
}
