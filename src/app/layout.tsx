import type { Metadata } from "next";
import "./globals.css";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { CustomCursor } from "@/components/CustomCursor";
import { PageTransition } from "@/components/PageTransition";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Western Arch",
  description: "Western Arch is a dedicated workspace for specialized web software. Every tool is built independently to provide immediate utility, local data isolation, and absolute visual continuity.",
  openGraph: {
    title: "Western Arch",
    description: "Western Arch is a dedicated workspace for specialized web software. Every tool is built independently to provide immediate utility, local data isolation, and absolute visual continuity.",
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
        <Header />
        <SmoothScrollProvider>
          <main className="main-content">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
