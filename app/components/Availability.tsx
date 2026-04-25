"use client";

import { useState } from "react";
import { PublicCalendar } from "./PublicCalendar";
import { ReservationSummary } from "./ReservationSummary";

const PRICES = [
  { m: "Mai", p: 220 },
  { m: "Juin", p: 250 },
  { m: "Juillet", p: 350 },
  { m: "Août", p: 350 },
  { m: "Septembre", p: 220 },
];

export function Availability() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  return (
    <section id="dispos" className="section reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Réservation</span>
          <h2 className="h1" style={{ marginTop: 10 }}>
            Disponibilités <em style={{ fontStyle: "italic" }}>&amp;</em> tarifs
          </h2>
        </div>

        <div className="avail-grid">
          <div className="avail-cal">
            <PublicCalendar
              checkIn={checkIn}
              checkOut={checkOut}
              setCheckIn={setCheckIn}
              setCheckOut={setCheckOut}
            />
            <div className="avail-summary">
              <ReservationSummary
                checkIn={checkIn}
                checkOut={checkOut}
                onReset={() => {
                  setCheckIn(null);
                  setCheckOut(null);
                }}
              />
            </div>
          </div>

          <aside className="avail-price">
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              Tarifs · 2026
            </div>
            <ul className="price-list">
              {PRICES.map((r, i) => (
                <li key={i}>
                  <span className="price-month">{r.m}</span>
                  <span className="price-leader" />
                  <span className="price-num serif">
                    {r.p} €<span className="price-unit">/nuit</span>
                  </span>
                </li>
              ))}
            </ul>
            <hr className="divider" style={{ margin: "32px 0 24px" }} />
            <div className="small" style={{ lineHeight: 1.7 }}>
              <div>
                Caution <span style={{ color: "var(--brun)" }}>500 €</span>
              </div>
              <div>Draps et linge fournis</div>
              <div>Entretien jardin et piscine inclus</div>
            </div>
            <hr className="divider" style={{ margin: "24px 0" }} />
            <div className="small" style={{ lineHeight: 1.7 }}>
              <div>Séjour minimum 7 nuits</div>
              <div>10 nuits en juillet / août</div>
              <div>Jour d&rsquo;arrivée libre</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
