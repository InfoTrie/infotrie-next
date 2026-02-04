"use client";

import Image from "next/image";
import { LeadCaptureForm, FormField } from "@/components/LeadCaptureForm";
import { siteConfig } from "@/lib/site-config";

const formFields: FormField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Smith",
    required: true,
  },
  {
    name: "email",
    label: "Work Email",
    type: "email",
    placeholder: "john@company.com",
    required: true,
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    placeholder: "Your company name",
    required: true,
  },
  {
    name: "title",
    label: "Job Title",
    type: "text",
    placeholder: "e.g., Portfolio Manager",
    required: true,
  },
  {
    name: "teamSize",
    label: "Data/Quant Team Size",
    type: "select",
    options: [
      { value: "1-5", label: "1-5 people" },
      { value: "6-15", label: "6-15 people" },
      { value: "16-50", label: "16-50 people" },
      { value: "50+", label: "50+ people" },
    ],
  },
];

const speakers = [
  {
    name: "Dr. Sarah Chen",
    title: "Head of NLP Research, InfoTrie",
    expertise: "15+ years in computational linguistics",
  },
  {
    name: "Michael Torres",
    title: "Chief Data Officer, InfoTrie",
    expertise: "Former quant at leading hedge fund",
  },
];

const agenda = [
  {
    time: "00:00 - 10:00",
    title: "Introduction to NLP in Finance",
    description: "Overview of NLP applications and market landscape",
  },
  {
    time: "10:00 - 25:00",
    title: "Sentiment Analysis Deep Dive",
    description: "How leading funds extract alpha from text data",
  },
  {
    time: "25:00 - 40:00",
    title: "Case Studies",
    description: "Real examples of NLP-driven trading strategies",
  },
  {
    time: "40:00 - 55:00",
    title: "Implementation Best Practices",
    description: "Technical considerations and pitfalls to avoid",
  },
  {
    time: "55:00 - 60:00",
    title: "Live Q&A",
    description: "Your questions answered by our experts",
  },
];

const takeaways = [
  "How top funds use NLP for alpha generation",
  "Sentiment analysis methodologies that work",
  "Data sources and signal construction",
  "Common pitfalls and how to avoid them",
  "Building vs. buying NLP capabilities",
];

export default function NlpWebinarPage() {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(0, 212, 170, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(78, 205, 196, 0.08) 0%, transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="accent-line" />
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-accent)" }}
                >
                  Free Webinar
                </span>
              </div>

              <h1
                className="text-4xl leading-tight md:text-5xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                How Leading Funds Use{" "}
                <span className="text-gradient">NLP for Alpha</span>
              </h1>

              <p
                className="mt-6 text-lg leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                Join our expert panel to learn how top hedge funds and asset
                managers leverage natural language processing for investment
                insights and trading signals.
              </p>

              {/* Event Details */}
              <div
                className="mt-8 rounded-xl p-6"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "var(--color-accent)" }}
                    >
                      60
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Minutes
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Live
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Q&A Session
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: "var(--color-accent)" }}
                    >
                      Free
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Registration
                    </div>
                  </div>
                </div>
              </div>

              {/* Speakers */}
              <div className="mt-8">
                <h3
                  className="mb-4 text-sm font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Featured Speakers
                </h3>
                <div className="space-y-4">
                  {speakers.map((speaker) => (
                    <div
                      key={speaker.name}
                      className="flex items-center gap-4"
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold"
                        style={{
                          background: "var(--color-accent-soft)",
                          color: "var(--color-accent)",
                        }}
                      >
                        {speaker.name.charAt(0)}
                      </div>
                      <div>
                        <div
                          className="font-semibold"
                          style={{ color: "var(--color-text)" }}
                        >
                          {speaker.name}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {speaker.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust */}
              <div
                className="mt-8 flex items-center gap-4 border-t pt-8"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="relative h-10 w-10">
                  <Image
                    src={siteConfig.logos.main}
                    alt="InfoTrie"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  <strong style={{ color: "var(--color-text)" }}>2,500+</strong>{" "}
                  finance professionals have attended our webinars
                </p>
              </div>
            </div>

            {/* Right - Form */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <h2
                className="mb-2 text-xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                Register for Free
              </h2>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                Get instant access to live session + replay + slides.
              </p>

              <LeadCaptureForm
                fields={formFields}
                submitLabel="Reserve My Spot"
                leadMagnet="nlp-finance-webinar"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section
        className="py-20"
        style={{ background: "var(--color-secondary)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Agenda */}
            <div>
              <h2
                className="text-3xl md:text-4xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                Webinar Agenda
              </h2>
              <div className="mt-8 space-y-4">
                {agenda.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl p-4"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div
                      className="mb-1 text-xs font-mono"
                      style={{ color: "var(--color-accent)" }}
                    >
                      {item.time}
                    </div>
                    <div
                      className="font-semibold"
                      style={{ color: "var(--color-text)" }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Takeaways */}
            <div>
              <h2
                className="text-3xl md:text-4xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                Key Takeaways
              </h2>
              <p
                className="mt-4 text-lg"
                style={{ color: "var(--color-text-muted)" }}
              >
                What you&apos;ll learn in this session:
              </p>
              <div
                className="mt-8 rounded-2xl p-6"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <ul className="space-y-4">
                  {takeaways.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "var(--color-text)" }}
                    >
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full text-xs"
                        style={{
                          background: "var(--color-accent-soft)",
                          color: "var(--color-accent)",
                        }}
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
