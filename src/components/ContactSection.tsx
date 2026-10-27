"use client";

import { FormButton, type FormButtonVariant } from "@/components/FormButton";
import { SocialIcon } from "@/components/SocialIcon";
import { PROFILE, SOCIALS } from "@/lib/data";
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
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h2 className="majd-h2-section">Let’s talk.</h2>
            <p
              className="majd-p-body"
              style={{ color: "#111111", maxWidth: "460px" }}
            >
              Have a distributed systems challenge, product idea, or engineering role?
              Fill out the form or reach out directly at{" "}
              <a
                href={`mailto:${PROFILE.email}`}
                style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                {PROFILE.email}
              </a>
              .
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {SOCIALS.map((social) => (
              <SocialIcon
                key={social.label}
                label={social.label}
                href={social.href}
                iconPath={social.iconPath}
              />
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="majd-contact-form-card"
          aria-label="Contact Form"
        >
          <label className="majd-form-label">
            <span className="majd-form-label-text">Name</span>
            <input
              type="text"
              name="Name"
              required
              placeholder="Enter your name"
              className="majd-input majd-input-first"
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
              placeholder="Tell me about your project or opportunity"
              className="majd-textarea"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (status === "error") setStatus("default");
              }}
            />
          </label>

          <FormButton variant={status} label="Submit" />
        </form>
      </div>
    </section>
  );
}
