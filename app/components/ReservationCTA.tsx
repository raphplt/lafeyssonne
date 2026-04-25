"use client";

import { fmtKey } from "../lib/calendar";
import { useDates } from "../lib/datesContext";
import { ArrowIcon, ExternalIcon, PhoneIcon } from "./Icons";

const AIRBNB_BASE = "https://www.airbnb.fr/rooms/1110140582764648931";
const ABRITEL_BASE = "https://www.abritel.fr/location-vacances/p992349";

function buildUrl(base: string, params: Record<string, string>): string {
  const search = new URLSearchParams(params).toString();
  return search ? `${base}?${search}` : base;
}

export function ReservationCTA() {
  const { checkIn, checkOut } = useDates();
  const hasDates = checkIn && checkOut;

  const airbnbUrl = hasDates
    ? buildUrl(AIRBNB_BASE, {
        check_in: fmtKey(checkIn),
        check_out: fmtKey(checkOut),
      })
    : AIRBNB_BASE;

  const abritelUrl = hasDates
    ? buildUrl(ABRITEL_BASE, {
        chkin: fmtKey(checkIn),
        chkout: fmtKey(checkOut),
      })
    : ABRITEL_BASE;

  const datesLabel = hasDates
    ? `${checkIn.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} → ${checkOut.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}`
    : null;

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
            Trois manières de nous contacter
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
        <div className="cta-trio">
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

          <a
            href={airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-card"
          >
            <div className="cta-platform serif">Airbnb</div>
            <div className="cta-label small">Plateforme</div>
            <div className="cta-num serif" style={{ fontSize: "1.6rem" }}>
              {hasDates ? "Réserver ces dates" : "Voir l’annonce"}
            </div>
            <div className="small" style={{ marginTop: 10, color: "var(--brun-70)" }}>
              Avis vérifiés · Annulation gratuite
            </div>
            <div className="cta-foot">
              Ouvrir Airbnb <ExternalIcon />
            </div>
          </a>

          <a
            href={abritelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-card"
          >
            <div className="cta-platform serif">Abritel</div>
            <div className="cta-label small">Plateforme</div>
            <div className="cta-num serif" style={{ fontSize: "1.6rem" }}>
              {hasDates ? "Réserver ces dates" : "Voir l’annonce"}
            </div>
            <div className="small" style={{ marginTop: 10, color: "var(--brun-70)" }}>
              Paiement sécurisé
            </div>
            <div className="cta-foot">
              Ouvrir Abritel <ExternalIcon />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
