"use client";

import { FormButton, type FormButtonVariant } from "@/components/FormButton";
import { SocialIcon } from "@/components/SocialIcon";
import { WordReveal } from "@/components/WordReveal";
import { PROFILE, SOCIALS } from "@/lib/data";
import { motion } from "framer-motion";
import { type FormEvent, useState } from "react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormButtonVariant>("default");

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
          company: "",
          description: message.trim(),
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
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <WordReveal
              text="Let’s talk."
              as="h2"
              className="majd-h2-section"
              trigger="inView"
              blurPx={10}
              duration={1.8}
            />
            <div style={{ maxWidth: "440px" }}>
              <WordReveal
                text="Have a project, role, or system to scale? Fill out the form, and I'll get back to you soon."
                as="p"
                className="majd-p-body"
                trigger="inView"
                blurPx={6}
                duration={1.4}
                staggerDelay={0.03}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <a
                href={`mailto:${PROFILE.email}`}
                className="majd-p-lead"
                style={{
                  color: "#111111",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                {PROFILE.email}
              </a>
              <p className="majd-p-small" style={{ color: "var(--ink-muted)" }}>
                {PROFILE.location}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {SOCIALS.map((social, idx) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 1.6,
                    delay: 0.2 + idx * 0.1,
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            type: "spring",
            bounce: 0,
            delay: 0.2,
            duration: 1.6,
          }}
        >
          <label className="majd-form-label">
            <span className="majd-form-label-text">Name</span>
            <input
              type="text"
              name="Name"
              required
              placeholder="Enter your name"
              className="majd-input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (status === "error") setStatus("default");
              }}
            />
          </label>

          <label className="majd-form-label">
            <span className="majd-form-label-text">Email</span>
            <input
              type="email"
              name="Email"
              required
              placeholder="Enter your email"
              className="majd-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("default");
              }}
            />
          </label>

          <label className="majd-form-label">
            <span className="majd-form-label-text">Your Project</span>
            <textarea
              name="Project"
              required
              placeholder="Tell me about your project"
              className="majd-textarea"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (status === "error") setStatus("default");
              }}
            />
          </label>

          <FormButton variant={status} label="Submit" />
        </motion.form>
      </div>
    </section>
  );
}
