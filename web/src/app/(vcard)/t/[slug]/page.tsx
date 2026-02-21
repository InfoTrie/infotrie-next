import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { teamProfiles, siteConfig } from "@/lib/site-config";
import { VCardActions } from "./VCardActions";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return teamProfiles.map((profile) => ({
    slug: profile.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = teamProfiles.find((p) => p.slug === slug);
  if (!profile) return {};

  const fullName = `${profile.firstName} ${profile.lastName}`;
  return {
    title: `${fullName} — ${profile.title}`,
    description: `${fullName}, ${profile.title} at ${siteConfig.name}. ${profile.bio || ""}`,
    openGraph: {
      title: `${fullName} — ${profile.title} | ${siteConfig.name}`,
      description: profile.bio || `${profile.title} at ${siteConfig.name}`,
      type: "profile",
    },
  };
}

export default async function VCardPage({ params }: Props) {
  const { slug } = await params;
  const profile = teamProfiles.find((p) => p.slug === slug);

  if (!profile) {
    notFound();
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;
  const pageUrl = `${siteConfig.url}/t/${profile.slug}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-radial"
      style={{ background: "linear-gradient(180deg, #f8fafb 0%, #ffffff 40%, #f8fafb 100%)" }}
    >
      {/* Card */}
      <div className="w-full max-w-md">
        {/* Header with brand accent */}
        <div
          className="rounded-t-2xl px-6 pt-8 pb-12 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #B91C1C 0%, #991B1B 100%)" }}
        >
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)",
            }}
          />

          {/* Logo */}
          <div className="relative mb-4">
            <Image
              src={siteConfig.logos.main}
              alt={siteConfig.name}
              width={120}
              height={36}
              className="mx-auto brightness-0 invert opacity-80"
            />
          </div>

          {/* Photo or Initials */}
          <div className="relative inline-block">
            {profile.photo ? (
              <div className="w-28 h-28 rounded-full border-4 border-white/30 overflow-hidden mx-auto shadow-lg">
                <Image
                  src={profile.photo}
                  alt={fullName}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full border-4 border-white/30 mx-auto shadow-lg flex items-center justify-center bg-white/20">
                <span className="text-3xl font-bold text-white">
                  {initials}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div
          className="rounded-b-2xl bg-white border border-t-0 px-6 pt-6 pb-8 -mt-4 relative z-10 shadow-lg"
          style={{ borderColor: "var(--color-border)" }}
        >
          {/* Name & Title */}
          <div className="text-center mb-6">
            <h1
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
            >
              {fullName}
            </h1>
            <p
              className="text-base font-medium"
              style={{ color: "var(--color-accent)" }}
            >
              {profile.title}
            </p>
            {profile.bio && (
              <p
                className="text-sm mt-3 leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {profile.bio}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="divider mb-6" />

          {/* Contact Info */}
          <div className="space-y-3 mb-6">
            {/* Email */}
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:shadow-sm"
              style={{ background: "var(--color-surface-elevated)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Email</p>
                <p className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>{profile.email}</p>
              </div>
            </a>

            {/* Phone */}
            {profile.phone && (
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:shadow-sm"
                style={{ background: "var(--color-surface-elevated)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Phone</p>
                  <p className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>{profile.phone}</p>
                </div>
              </a>
            )}

            {/* LinkedIn */}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:shadow-sm"
                style={{ background: "var(--color-surface-elevated)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>LinkedIn</p>
                  <p className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>
                    {profile.firstName} {profile.lastName}
                  </p>
                </div>
              </a>
            )}

            {/* Location */}
            {profile.location && (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: "var(--color-surface-elevated)" }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Location</p>
                  <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{profile.location}</p>
                </div>
              </div>
            )}

            {/* Website */}
            <a
              href={siteConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:shadow-sm"
              style={{ background: "var(--color-surface-elevated)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--color-accent-soft)", color: "var(--color-accent)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Website</p>
                <p className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>infotrie.com</p>
              </div>
            </a>
          </div>

          {/* Actions: Save Contact + QR Code */}
          <VCardActions profile={profile} pageUrl={pageUrl} />
        </div>

        {/* Footer brand */}
        <p
          className="text-center text-xs mt-6"
          style={{ color: "var(--color-text-light)" }}
        >
          {siteConfig.copyright}
        </p>
      </div>
    </div>
  );
}
