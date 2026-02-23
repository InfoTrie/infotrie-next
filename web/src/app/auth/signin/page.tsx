import { signIn } from "@/lib/auth";

export default function SignInPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--color-bg)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-2xl"
        style={{
          background: "var(--color-surface-elevated)",
          border: "1px solid var(--color-border)",
        }}
      >
        <div className="mb-8 text-center">
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            <span style={{ color: "var(--color-accent)" }}>Info</span>Trie
          </h1>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Connectez-vous pour accéder au contenu protégé
          </p>
        </div>

        <form
          action={async () => {
            "use server";
            await signIn("keycloak", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300"
            style={{
              background: "var(--color-accent)",
              color: "white",
            }}
          >
            Se connecter avec Keycloak
          </button>
        </form>
      </div>
    </div>
  );
}
