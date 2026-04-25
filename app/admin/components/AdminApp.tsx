"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "../actions";
import { AdminCalendarView } from "./AdminCalendarView";
import { AdminPricingView } from "./AdminPricingView";

type View = "calendar" | "pricing";

type Props = {
  userEmail: string;
};

export function AdminApp({ userEmail }: Props) {
  const [view, setView] = useState<View>("calendar");
  const [dark, setDark] = useState(false);

  const initials =
    userEmail
      .split("@")[0]
      .split(/[._-]/)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 2) || "LF";

  return (
    <div className={`admin-root ${dark ? "admin-dark" : ""}`}>
      <aside className="admin-side">
        <div className="admin-logo admin-logo-stacked">
          <Image
            src="/logo.png"
            alt="La Feyssonne"
            width={160}
            height={98}
            priority
            className="admin-side-logo"
          />
          <div className="admin-logo-sub">Admin</div>
        </div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${view === "calendar" ? "active" : ""}`}
            onClick={() => setView("calendar")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Calendrier
          </button>
          <button
            className={`admin-nav-item ${view === "pricing" ? "active" : ""}`}
            onClick={() => setView("pricing")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <circle cx="7" cy="7" r="1.2" />
            </svg>
            Tarifs &amp; contenu
          </button>
        </nav>
        <div className="admin-side-foot">
          <button className="admin-nav-item" onClick={() => setDark(!dark)}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            {dark ? "Mode clair" : "Mode sombre"}
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-top">
          <div>
            <div className="admin-top-breadcrumb">Tableau de bord</div>
            <div className="admin-top-title">
              {view === "calendar" ? "Gestion du calendrier" : "Tarifs & contenu"}
            </div>
          </div>
          <div className="admin-top-actions">
            <div className="admin-user">
              <div className="admin-avatar">{initials}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{userEmail}</div>
                <div style={{ fontSize: 11, color: "var(--a-muted)" }}>
                  Propriétaire
                </div>
              </div>
            </div>
            <Link href="/" className="admin-btn admin-btn-ghost">
              Voir le site ↗
            </Link>
            <form action={signOut}>
              <button type="submit" className="admin-btn admin-btn-ghost">
                Déconnexion
              </button>
            </form>
          </div>
        </header>

        <main className="admin-content">
          {view === "calendar" ? <AdminCalendarView /> : <AdminPricingView />}
        </main>
      </div>
    </div>
  );
}
