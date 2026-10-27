import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Mukesh Kuiry — Software Engineer",
  description:
    "Software engineer and open-source contributor building high-throughput FinTech systems, distributed Golang & TypeScript microservices, and native developer tools.",
  openGraph: {
    title: "Mukesh Kuiry — Software Engineer",
    description:
      "Software engineer and open-source contributor building high-throughput FinTech systems, distributed Golang & TypeScript microservices, and native developer tools.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mukesh Kuiry — Software Engineer",
    description:
      "Software engineer and open-source contributor building high-throughput FinTech systems, distributed Golang & TypeScript microservices, and native developer tools.",
  },
};

export default function RootLayout(props: Readonly<{ children: ReactNode }>) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <div className="framer-noise-overlay" aria-hidden="true" />
        <Header />
        <SmoothScrollProvider>
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
