"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import type { TeamProfile } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";

function generateVCardString(profile: TeamProfile): string {
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${profile.lastName};${profile.firstName};;;`,
    `FN:${profile.firstName} ${profile.lastName}`,
    `ORG:${siteConfig.name}`,
    `TITLE:${profile.title}`,
    `EMAIL;TYPE=WORK:${profile.email}`,
  ];

  if (profile.phone) {
    lines.push(`TEL;TYPE=WORK,VOICE:${profile.phone.replace(/\s/g, "")}`);
  }

  if (profile.linkedin) {
    lines.push(`URL;TYPE=LinkedIn:${profile.linkedin}`);
  }

  lines.push(`URL;TYPE=WORK:${siteConfig.url}`);

  if (profile.location) {
    lines.push(`ADR;TYPE=WORK:;;${profile.location};;;;`);
  }

  if (profile.photo) {
    lines.push(`PHOTO;VALUE=URI:${profile.photo}`);
  }

  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function VCardActions({
  profile,
  pageUrl,
}: {
  profile: TeamProfile;
  pageUrl: string;
}) {
  const [showQR, setShowQR] = useState(false);

  function handleDownloadVCard() {
    const vcard = generateVCardString(profile);
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile.firstName}-${profile.lastName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      {/* Save Contact Button */}
      <button
        onClick={handleDownloadVCard}
        className="w-full py-3.5 rounded-xl font-semibold text-white text-base transition-all cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #B91C1C 0%, #991B1B 100%)",
          boxShadow: "0 4px 14px rgba(185, 28, 28, 0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(185, 28, 28, 0.4)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 14px rgba(185, 28, 28, 0.3)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <span className="flex items-center justify-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Save Contact
        </span>
      </button>

      {/* QR Code Toggle */}
      <button
        onClick={() => setShowQR(!showQR)}
        className="w-full mt-3 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer"
        style={{
          background: "transparent",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-secondary)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-accent)";
          e.currentTarget.style.color = "var(--color-accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.color = "var(--color-text-secondary)";
        }}
      >
        <span className="flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="5" height="5" x="3" y="3" rx="1" />
            <rect width="5" height="5" x="16" y="3" rx="1" />
            <rect width="5" height="5" x="3" y="16" rx="1" />
            <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
            <path d="M21 21v.01" />
            <path d="M12 7v3a2 2 0 0 1-2 2H7" />
            <path d="M3 12h.01" />
            <path d="M12 3h.01" />
            <path d="M12 16v.01" />
            <path d="M16 12h1" />
            <path d="M21 12v.01" />
            <path d="M12 21v-1" />
          </svg>
          {showQR ? "Hide QR Code" : "Show QR Code"}
        </span>
      </button>

      {/* QR Code Display */}
      {showQR && (
        <div
          className="mt-4 p-6 rounded-xl text-center animate-fade-in"
          style={{ background: "var(--color-surface-elevated)" }}
        >
          <div className="inline-block p-4 bg-white rounded-lg shadow-sm">
            <QRCodeSVG
              value={pageUrl}
              size={180}
              level="M"
              includeMargin={false}
              fgColor="#1a202c"
              bgColor="#ffffff"
            />
          </div>
          <p
            className="text-xs mt-3"
            style={{ color: "var(--color-text-muted)" }}
          >
            Scan to view this contact page
          </p>
        </div>
      )}
    </>
  );
}
