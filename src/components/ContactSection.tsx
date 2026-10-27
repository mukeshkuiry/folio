"use client";

import { FormButton, type FormButtonVariant } from "@/components/FormButton";
import { SocialIcon } from "@/components/SocialIcon";
import { WordReveal } from "@/components/WordReveal";
import { PROFILE, SOCIALS } from "@/lib/data";
import { motion } from "framer-motion";
import { type FormEvent, useState } from "react";

const INQUIRY_TOPICS = [
  "Backend & Distributed Systems",
  "FinTech & Payment Architecture",
  "Full-Stack / Native App",
  "Engineering Opportunity",
] as const;

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState<string>(INQUIRY_TOPICS[0]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormButtonVariant>("default");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: topic,
          description: `[Topic: ${topic}]\n\n${message.trim()}`,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="majd-section majd-section-contact">
      <div className="majd-contact-layout">
        <div className="majd-contact-left">
          <div className="majd-contact-intro">
            <span className="majd-eyebrow-tag">/ DIRECT CHANNEL</span>
            <WordReveal
              text="Let’s build something remarkable."
              as="h2"
              className="majd-h2-section"
              trigger="inView"
              blurPx={6}
              duration={0.9}
            />
            <p className="majd-p-body majd-contact-lead">
              Whether you’re scaling high-throughput backend systems, building
              FinTech infrastructure, or hiring for key engineering roles — drop
              a note and I’ll get back to you within 24 hours.
            </p>
          </div>

          {/* Direct Contact Info Cards */}
          <div className="majd-contact-cards">
            <div className="majd-contact-info-card">
              <div className="majd-contact-info-meta">
                <span className="majd-contact-info-label">Direct Email</span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="majd-contact-info-value"
                >
                  {PROFILE.email}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="majd-copy-email-btn"
              >
                {copiedEmail ? "Copied ✓" : "Copy Email"}
              </button>
            </div>

            <div className="majd-contact-info-card">
              <div className="majd-contact-info-meta">
                <span className="majd-contact-info-label">
                  Base &amp; Availability
                </span>
                <p className="majd-contact-info-value">
                  {PROFILE.location} · IST (UTC+5:30)
                </p>
              </div>
              <span className="majd-contact-status-pill">
                <span className="majd-contact-status-dot" aria-hidden="true" />
                <span>Open to Connect</span>
              </span>
            </div>
          </div>

          {/* Social Profiles Row */}
          <div className="majd-contact-socials-block">
            <span className="majd-contact-info-label">Elsewhere Online</span>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {SOCIALS.map((social, idx) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.1 + idx * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <SocialIcon
                    label={social.label}
                    href={social.href}
                    iconPath={social.iconPath}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="majd-contact-form-card"
          aria-label="Contact Form"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.55,
            delay: 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="majd-contact-form-header">
            <div>
              <h3 className="majd-contact-form-title">Send a Message</h3>
              <p className="majd-contact-form-sub">
                Direct to Mukesh’s inbox · Zero spam
              </p>
            </div>
            <span className="majd-contact-reply-badge">~24h response</span>
          </div>

          <div className="majd-form-label">
            <span className="majd-form-label-text">Topic</span>
            <div className="majd-contact-topic-pills">
              {INQUIRY_TOPICS.map((item) => {
                const isSelected = topic === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTopic(item)}
                    className={`majd-contact-topic-pill${isSelected ? " is-selected" : ""}`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="majd-contact-input-grid">
            <label className="majd-form-label">
              <span className="majd-form-label-text">Your Name</span>
              <input
                type="text"
                name="Name"
                required
                placeholder="Mukesh / Jane Doe"
                className="majd-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (status === "error" || status === "success") {
                    setStatus("default");
                  }
                }}
              />
            </label>

            <label className="majd-form-label">
              <span className="majd-form-label-text">Email Address</span>
              <input
                type="email"
                name="Email"
                required
                placeholder="you@company.com"
                className="majd-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error" || status === "success") {
                    setStatus("default");
                  }
                }}
              />
            </label>
          </div>

          <label className="majd-form-label">
            <span className="majd-form-label-text">Project or Opportunity</span>
            <textarea
              name="Project"
              required
              placeholder="Tell me about the system you're building, architectural challenges, or role details..."
              className="majd-textarea"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (status === "error" || status === "success") {
                  setStatus("default");
                }
              }}
            />
          </label>

          <FormButton variant={status} label="Send Message" />

          {status === "success" && (
            <p className="majd-contact-feedback is-success">
              Message received! I’ll get back to you shortly.
            </p>
          )}
          {status === "error" && (
            <p className="majd-contact-feedback is-error">
              Please fill in all fields or email me directly at {PROFILE.email}.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
