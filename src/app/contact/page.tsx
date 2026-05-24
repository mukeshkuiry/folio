"use client";
import { useState, useCallback } from "react";
import { SOCIALS } from "@/lib/data";

type FormData = {
  name: string;
  email: string;
  company: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", company: "", description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email is required";
    if (!form.description.trim()) errs.description = "Tell me about your project or opportunity";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate async submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 800);
    }
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
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6em", marginBottom: "3vw" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4caf50", display: "inline-block", flexShrink: 0, animation: "pulse 2s ease-in-out infinite" }} />
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

          <div>
            {submitted ? (
              <div className="form-success" role="alert">
                Thank you. I&apos;ll get back to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <FormField label="Name" error={errors.name}>
                  <input type="text" className={`form-input${errors.name ? " error" : ""}`} value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Your full name" autoComplete="name" />
                </FormField>
                <FormField label="Email" error={errors.email}>
                  <input type="email" className={`form-input${errors.email ? " error" : ""}`} value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="your@email.com" autoComplete="email" />
                </FormField>
                <FormField label="Company">
                  <input type="text" className="form-input" value={form.company} onChange={(e) => handleChange("company", e.target.value)} placeholder="Your company (optional)" autoComplete="organization" />
                </FormField>
                <FormField label="Project / Opportunity" error={errors.description}>
                  <textarea className={`form-input${errors.description ? " error" : ""}`} rows={4} value={form.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="What are you working on?" style={{ resize: "none", display: "block" }} />
                </FormField>
                <button type="submit" className="form-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send message"} <span>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="footer-cta" data-theme="dark">
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

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode; }) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {children}
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  );
}
