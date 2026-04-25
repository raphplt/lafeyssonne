"use client";

import { useState } from "react";

type Props = {
  onLogin: () => void;
};

export function AdminLogin({ onLogin }: Props) {
  const [email, setEmail] = useState("pierre@lafeyssonne.com");
  const [pwd, setPwd] = useState("••••••••••");

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-logo-mark" style={{ margin: "0 auto 24px" }}>
          LF
        </div>
        <h1 className="admin-login-title">La Feyssonne — Admin</h1>
        <p className="admin-login-sub">Connectez-vous pour gérer votre bastide.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <label className="admin-label">Email</label>
          <input
            className="admin-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="admin-label" style={{ marginTop: 14 }}>
            Mot de passe
          </label>
          <input
            className="admin-input"
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <button
            className="admin-btn admin-btn-primary"
            type="submit"
            style={{ width: "100%", marginTop: 24, justifyContent: "center" }}
          >
            Se connecter
          </button>
        </form>
        <div className="admin-login-foot">
          Besoin d&rsquo;aide ? <a href="mailto:contact@lafeyssonne.com">contact@lafeyssonne.com</a>
        </div>
      </div>
    </div>
  );
}
