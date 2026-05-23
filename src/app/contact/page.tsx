"use client";
import { useState } from "react";
import { SOCIALS } from "@/lib/data";

type FormData = {
  name: string;
  email: string;
  company: string;
  description: string;
  budget: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const BUDGET_OPTIONS = [
  "< $10k",
  "$10k – $30k",
  "$30k – $80k",
  "$80k – $200k",
  "$200k+",
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", company: "", description: "", budget: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.description.trim()) errs.description = "Tell us about your project";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  function handleChange(key: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  return (
    <>
      <section className="section">
        <h1 className="t-section" style={{ marginBottom: "8vw" }}>Contact</h1>

        <div className="contact-grid">
          {/* Info column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6em", marginBottom: "3vw" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf50", display: "inline-block", flexShrink: 0 }} />
              <span className="t-caption" style={{ color: "var(--color-grey-mid)", letterSpacing: "0.08em" }}>AVAILABLE FOR WORK</span>
            </div>
            <p className="contact-info-email">
              <a href="mailto:mukeshkk3162@gmail.com">mukeshkk3162@gmail.com</a>
            </p>
            <div className="contact-info-socials">
              {SOCIALS.map((s) => (
                <a href={s.href} key={s.label} className="contact-info-link" target="_blank" rel="noopener noreferrer">{s.label}</a>
              ))}
            </div>
            <p className="contact-location">Bengaluru, India</p>
          </div>

          {/* Form column */}
          <div>
            {submitted ? (
              <div className="form-success">
                Thank you. I&apos;ll get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <FormField label="Name" error={errors.name}>
                  <input
                    type="text"
                    className={`form-input${errors.name ? " error" : ""}`}
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </FormField>
                <FormField label="Email" error={errors.email}>
                  <input
                    type="email"
                    className={`form-input${errors.email ? " error" : ""}`}
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your@email.com"
                  />
                </FormField>
                <FormField label="Company">
                  <input
                    type="text"
                    className="form-input"
                    value={form.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Your company (optional)"
                  />
                </FormField>
                <FormField label="Project / Opportunity" error={errors.description}>
                  <textarea
                    className={`form-input${errors.description ? " error" : ""}`}
                    rows={4}
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="What are you working on?"
                    style={{ resize: "none", display: "block" }}
                  />
                </FormField>
                <button type="submit" className="form-submit-btn">
                  Send message <span>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer-cta">
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mukesh Kuiry. All rights reserved.</span>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path d={s.iconPath} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
