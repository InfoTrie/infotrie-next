"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        className="h-9 w-20 animate-pulse rounded-lg"
        style={{ background: "var(--color-surface)" }}
      />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span
          className="hidden text-sm sm:inline"
          style={{ color: "var(--color-text-muted)" }}
        >
          {session.user.name || session.user.email}
        </span>
        <button
          onClick={() => signOut()}
          className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
          style={{
            color: "var(--color-text-muted)",
            border: "1px solid var(--color-border)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-text)";
            e.currentTarget.style.borderColor = "var(--color-text-muted)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-text-muted)";
            e.currentTarget.style.borderColor = "var(--color-border)";
          }}
        >
          Déconnexion
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("keycloak")}
      className="rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
      style={{
        color: "var(--color-text-muted)",
        border: "1px solid var(--color-border)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--color-text)";
        e.currentTarget.style.borderColor = "var(--color-text-muted)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--color-text-muted)";
        e.currentTarget.style.borderColor = "var(--color-border)";
      }}
    >
      Connexion
    </button>
  );
}
