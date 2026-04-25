"use client";

import { PRICING, addDays, daysBetween } from "../lib/calendar";
import { ArrowIcon } from "./Icons";

type Props = {
  checkIn: Date | null;
  checkOut: Date | null;
  onReset: () => void;
};

export function ReservationSummary({ checkIn, checkOut, onReset }: Props) {
  if (!checkIn) {
    return (
      <div className="pc-summary pc-summary-empty">
        <div className="small">Sélectionnez vos dates</div>
        <div
          className="serif"
          style={{ fontSize: "1.3rem", marginTop: 6, color: "var(--brun-70)" }}
        >
          Cliquez une date d&rsquo;arrivée, puis votre date de départ
        </div>
      </div>
    );
  }
  if (!checkOut) {
    return (
      <div className="pc-summary">
        <div className="small">Arrivée sélectionnée</div>
        <div className="serif" style={{ fontSize: "1.5rem", marginTop: 4 }}>
          {checkIn.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </div>
        <div className="small" style={{ marginTop: 10, color: "var(--terracotta)" }}>
          Choisissez votre date de départ ↘
        </div>
      </div>
    );
  }

  const nights = daysBetween(checkIn, checkOut);
  let total = 0;
  let cur = new Date(checkIn);
  for (let i = 0; i < nights; i++) {
    const m = cur.getMonth() + 1;
    total += PRICING[m]?.price ?? 220;
    cur = addDays(cur, 1);
  }
  const month = checkIn.getMonth() + 1;
  const minNights = PRICING[month]?.min ?? 7;
  const monthLabel = PRICING[month]?.label ?? "";
  const meets = nights >= minNights;

  return (
    <div className="pc-summary">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div className="small">Arrivée</div>
          <div className="serif" style={{ fontSize: "1.25rem", marginTop: 2 }}>
            {checkIn.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
        <div style={{ color: "var(--brun-30)" }}>→</div>
        <div>
          <div className="small">Départ</div>
          <div className="serif" style={{ fontSize: "1.25rem", marginTop: 2 }}>
            {checkOut.toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <div className="small">Nuits</div>
          <div className="serif" style={{ fontSize: "1.5rem", marginTop: 2 }}>
            {nights}
          </div>
        </div>
      </div>

      <hr className="divider" style={{ margin: "22px 0" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <div className="small">Total estimé · tarif {monthLabel.toLowerCase()}</div>
          {!meets && (
            <div className="small" style={{ color: "var(--terracotta)", marginTop: 6 }}>
              Séjour minimum {minNights} nuits en {monthLabel.toLowerCase()}.
            </div>
          )}
        </div>
        <div
          className="serif"
          style={{ fontSize: "2.4rem", fontWeight: 300, letterSpacing: "-0.02em" }}
        >
          {total.toLocaleString("fr-FR")} €
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
        <button
          className="btn btn-primary"
          disabled={!meets}
          onClick={() => {
            const el = document.getElementById("reservation-cta");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Demander ces dates <ArrowIcon />
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onReset}>
          Effacer
        </button>
      </div>
    </div>
  );
}
