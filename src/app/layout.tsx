import type { Metadata } from "next";
import "./globals.css";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";

export const metadata: Metadata = {
  title: "Mukesh Kuiry — Software Engineer",
  description: "Mukesh Kuiry — Independent software engineer building distributed systems, full-stack products, and clean engineering craft.",
  openGraph: {
    title: "Mukesh Kuiry — Software Engineer",
    description: "Mukesh Kuiry — Independent software engineer building distributed systems, full-stack products, and clean engineering craft.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <CustomCursor />
        <PageTransition />
        <ScrollProgressBar />
        <Header />
        <SmoothScrollProvider>
          <main className="main-content">
            {children}
          </main>
        </SmoothScrollProvider>
        {/* Film grain overlay for texture */}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
