"use client";

import { useState, type FormEvent } from "react";
import { Section, SectionHeader } from "@/components/Section";
import { siteConfig } from "@/lib/site-config";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: Connect to backend API, Make.com webhook, or email service
    setSubmitted(true);
  }

  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          title="Contact Us"
          subtitle="Get in touch to discuss your data needs, request a demo, or explore partnership opportunities."
        />

        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h3
              className="text-xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
            >
              Get in touch
            </h3>
            <div className="mt-6 space-y-6" style={{ color: "var(--color-text-muted)" }}>
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  Email
                </div>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  style={{ color: "var(--color-accent)" }}
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  Headquarters
                </div>
                <p>{siteConfig.contact.headquarters}</p>
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                  Offices
                </div>
                <p>{siteConfig.contact.offices.join(" · ")}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl border p-8"
            style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
          >
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mb-4 text-4xl">✓</div>
                <h3 className="text-xl" style={{ color: "var(--color-text)" }}>
                  Message sent!
                </h3>
                <p className="mt-2" style={{ color: "var(--color-text-muted)" }}>
                  We&apos;ll get back to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium" style={{ color: "var(--color-text)" }}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                    style={{
                      background: "var(--color-primary)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium" style={{ color: "var(--color-text)" }}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                    style={{
                      background: "var(--color-primary)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium" style={{ color: "var(--color-text)" }}>
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none"
                    style={{
                      background: "var(--color-primary)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  >
                    <option>Product Demo</option>
                    <option>Data Inquiry</option>
                    <option>Consulting</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium" style={{ color: "var(--color-text)" }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-accent)]"
                    style={{
                      background: "var(--color-primary)",
                      borderColor: "var(--color-border)",
                      color: "var(--color-text)",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg py-3.5 text-sm font-semibold transition-all"
                  style={{ background: "var(--color-accent)", color: "var(--color-text-dark)" }}
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
