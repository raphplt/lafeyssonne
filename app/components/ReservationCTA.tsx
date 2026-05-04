"use client";

import { fmtKey } from "../lib/calendar";
import { useDates } from "../lib/datesContext";
import { ArrowIcon, MailIcon, PhoneIcon } from "./Icons";

const EMAIL = "courrier@lafeyssonne.com";

export function ReservationCTA() {
  const { checkIn, checkOut } = useDates();
  const hasDates = checkIn && checkOut;

  const datesLabel = hasDates
    ? `${checkIn.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} → ${checkOut.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`
    : null;

  const mailtoUrl = hasDates
    ? `mailto:${EMAIL}?subject=${encodeURIComponent(
      `Demande de réservation ${fmtKey(checkIn)} → ${fmtKey(checkOut)}`,
    )}`
    : `mailto:${EMAIL}`;

  return (
    <section
      id="reservation-cta"
      className="section reveal"
      style={{ background: "var(--pierre)" }}
    >
      <div className="container">
        <div className="section-head" style={{ textAlign: "center" }}>
          <span className="eyebrow">Réserver</span>
          <h2 className="h2" style={{ marginTop: 8 }}>
            Deux manières de nous contacter
          </h2>
          {datesLabel && (
            <p
              className="small"
              style={{ marginTop: 14, color: "var(--terracotta)" }}
            >
              Vos dates sélectionnées : {datesLabel}
            </p>
          )}
        </div>
        <div className="cta-trio cta-duo">
          <a href="tel:+33643250543" className="cta-card">
            <PhoneIcon />
            <div className="cta-label small">Appeler</div>
            <div className="cta-num serif">06 43 25 05 43</div>
            <div className="small" style={{ marginTop: 10, color: "var(--brun-70)" }}>
              Réponse directe, tous les jours
            </div>
            <div className="cta-foot">
              Nous appeler <ArrowIcon />
            </div>
          </a>

          <a href={mailtoUrl} className="cta-card">
            <MailIcon />
            <div className="cta-label small">Nous écrire</div>
            <div className="cta-num serif" style={{ fontSize: "1.5rem" }}>
              {EMAIL}
            </div>
            <div className="small" style={{ marginTop: 10, color: "var(--brun-70)" }}>
              Pour vos questions et demandes de séjour
            </div>
            <div className="cta-foot">
              Envoyer un email <ArrowIcon />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
