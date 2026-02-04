"use client";

import { useState, FormEvent } from "react";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "select" | "textarea" | "tel";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface LeadCaptureFormProps {
  fields: FormField[];
  submitLabel?: string;
  webhookUrl?: string;
  leadMagnet: string;
  onSuccess?: () => void;
}

export function LeadCaptureForm({
  fields,
  submitLabel = "Get Free Access",
  webhookUrl,
  leadMagnet,
  onSuccess,
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // If webhook URL is provided, send data there
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            leadMagnet,
            timestamp: new Date().toISOString(),
            source: typeof window !== "undefined" ? window.location.href : "",
          }),
        });

        if (!response.ok) {
          throw new Error("Submission failed");
        }
      }

      setSubmitted(true);
      onSuccess?.();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div className="mb-4 text-5xl">✓</div>
        <h3
          className="text-xl font-bold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
          }}
        >
          Thank You!
        </h3>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          Check your email for your download link.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-1.5 block text-sm font-medium"
            style={{ color: "var(--color-text)" }}
          >
            {field.label}
            {field.required && (
              <span style={{ color: "var(--color-accent)" }}> *</span>
            )}
          </label>

          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-3 text-sm transition-all focus:outline-none"
              style={{
                background: "var(--color-surface-elevated)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              <option value="">{field.placeholder || "Select..."}</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg px-4 py-3 text-sm transition-all focus:outline-none"
              style={{
                background: "var(--color-surface-elevated)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-3 text-sm transition-all focus:outline-none"
              style={{
                background: "var(--color-surface-elevated)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          )}
        </div>
      ))}

      {error && (
        <p className="text-sm" style={{ color: "var(--color-accent)" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full rounded-lg px-6 py-4 text-sm disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : submitLabel}
      </button>

      <p
        className="text-center text-xs"
        style={{ color: "var(--color-text-muted)" }}
      >
        By submitting, you agree to our{" "}
        <a href="/privacy" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
