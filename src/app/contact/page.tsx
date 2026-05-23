"use client";
import { useState } from "react";

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
            <p className="contact-info-email">
              <a href="mailto:hello@zajno.com">hello@zajno.com</a>
            </p>
            <div className="contact-info-socials">
              {["Instagram", "Twitter", "Dribbble", "Behance", "LinkedIn"].map((s) => (
                <a href="#" key={s} className="contact-info-link">{s}</a>
              ))}
            </div>
            <p className="contact-location">Tbilisi, Georgia<br />New York, USA</p>
          </div>

          {/* Form column */}
          <div>
            {submitted ? (
              <div className="form-success">
                Thank you. We&apos;ll be in touch shortly.
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
                <FormField label="Project Description" error={errors.description}>
                  <textarea
                    className={`form-input${errors.description ? " error" : ""}`}
                    rows={4}
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Tell us about your project..."
                    style={{ resize: "none", display: "block" }}
                  />
                </FormField>
                <FormField label="Budget Range">
                  <select
                    className="form-select"
                    value={form.budget}
                    onChange={(e) => handleChange("budget", e.target.value)}
                  >
                    <option value="">Select a range</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
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
          <span>© {new Date().getFullYear()} Zajno Studio. All rights reserved.</span>
          <div className="footer-socials">
            {["Instagram", "Twitter", "Dribbble"].map((s) => (
              <a href="#" key={s} className="footer-social-link t-caption">{s}</a>
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
