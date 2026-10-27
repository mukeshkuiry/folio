"use client";

import { TextArrowButton } from "@/components/TextArrowButton";

export default function NotFoundPage() {
  return (
    <section
      id="hero-section"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "180px 20px 120px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1180px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <h1 className="majd-h1-hero" style={{ maxWidth: "620px" }}>
            Oops!
          </h1>
          <p
            className="majd-p-body"
            style={{
              textAlign: "center",
              maxWidth: "460px",
              color: "#111111",
            }}
          >
            We couldn&apos;t find the page you were looking for
          </p>
        </div>

        <TextArrowButton
          title="Go Back"
          href="/#hero-section"
          variant="primary"
        />
      </div>
    </section>
  );
}
