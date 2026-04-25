import type { Metadata } from "next";
import Image from "next/image";
import { signIn } from "../actions";
import "../admin.css";

export const metadata: Metadata = {
  title: "Admin — Connexion · La Feyssonne",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { error, next } = await searchParams;

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Image
            src="/logo.png"
            alt="La Feyssonne"
            width={160}
            height={98}
            priority
            style={{ height: 64, width: "auto" }}
          />
        </div>
        <h1 className="admin-login-title">Admin</h1>
        <p className="admin-login-sub">
          Connectez-vous pour gérer votre bastide.
        </p>

        <form action={signIn}>
          <input type="hidden" name="next" value={next ?? "/admin"} />

          <label className="admin-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            className="admin-input"
            type="email"
            required
            autoComplete="email"
            defaultValue=""
          />

          <label
            className="admin-label"
            htmlFor="password"
            style={{ marginTop: 14 }}
          >
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            className="admin-input"
            type="password"
            required
            autoComplete="current-password"
          />

          {error && (
            <div
              role="alert"
              style={{
                marginTop: 16,
                padding: "10px 12px",
                borderRadius: 6,
                background: "#fef2f2",
                color: "#b91c1c",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: "100%", marginTop: 24, justifyContent: "center" }}
          >
            Se connecter
          </button>
        </form>

        <div className="admin-login-foot">
          Besoin d&rsquo;aide ?{" "}
          <a href="mailto:contact@lafeyssonne.com">contact@lafeyssonne.com</a>
        </div>
      </div>
    </div>
  );
}
