"use client";

import { useMemo, useState } from "react";
import {
  MONTHS_FR,
  daysBetween,
  fmtKey,
  parseKey,
} from "../../lib/calendar";
import { AdminMonth, type Reservation } from "./AdminMonth";

type FormState = {
  status: Reservation["status"];
  note: string;
  id?: number;
};

const INITIAL_RESERVATIONS: Reservation[] = [
  { id: 1, start: "2026-05-10", end: "2026-05-17", status: "reserved", note: "Réservation Airbnb — Famille R." },
  { id: 2, start: "2026-06-05", end: "2026-06-14", status: "reserved", note: "Direct — Couple Moreau" },
  { id: 3, start: "2026-07-11", end: "2026-07-25", status: "reserved", note: "Abritel — Famille Guyot" },
  { id: 4, start: "2026-08-01", end: "2026-08-15", status: "reserved", note: "Direct — Famille Delorme" },
  { id: 5, start: "2026-08-22", end: "2026-08-29", status: "blocked", note: "Famille propriétaire" },
  { id: 6, start: "2026-09-12", end: "2026-09-19", status: "reserved", note: "Airbnb — Couple Leblanc" },
];

const STATUS_OPTIONS: { k: Reservation["status"]; l: string }[] = [
  { k: "available", l: "Disponible" },
  { k: "reserved", l: "Réservé" },
  { k: "blocked", l: "Bloqué (perso)" },
];

export function AdminCalendarView() {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const [anchor, setAnchor] = useState(() => new Date(2026, 4, 1));
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [selStart, setSelStart] = useState<Date | null>(null);
  const [selEnd, setSelEnd] = useState<Date | null>(null);
  const [form, setForm] = useState<FormState>({ status: "reserved", note: "" });
  const [toast, setToast] = useState<string | null>(null);

  function findReservation(d: Date) {
    return reservations.find((r) => {
      const s = parseKey(r.start);
      const e = parseKey(r.end);
      return d >= s && d <= e;
    });
  }

  function clickDay(d: Date) {
    const existing = findReservation(d);
    if (existing) {
      setSelStart(parseKey(existing.start));
      setSelEnd(parseKey(existing.end));
      setForm({ status: existing.status, note: existing.note, id: existing.id });
      return;
    }
    if (!selStart || (selStart && selEnd)) {
      setSelStart(d);
      setSelEnd(null);
      setForm({ status: "reserved", note: "" });
    } else if (d < selStart) {
      setSelStart(d);
    } else {
      setSelEnd(d);
    }
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function saveRange() {
    if (!selStart) return;
    const end = selEnd || selStart;
    if (form.id !== undefined) {
      const id = form.id;
      setReservations((rs) =>
        rs.map((r) =>
          r.id === id
            ? {
                ...r,
                start: fmtKey(selStart),
                end: fmtKey(end),
                status: form.status,
                note: form.note,
              }
            : r,
        ),
      );
    } else {
      setReservations((rs) => [
        ...rs,
        {
          id: Date.now(),
          start: fmtKey(selStart),
          end: fmtKey(end),
          status: form.status,
          note: form.note,
        },
      ]);
    }
    showToast(
      `Enregistré · ${selStart.toLocaleDateString("fr-FR")} → ${end.toLocaleDateString("fr-FR")}`,
    );
    setSelStart(null);
    setSelEnd(null);
    setForm({ status: "reserved", note: "" });
  }

  function deleteRange() {
    if (form.id !== undefined) {
      const id = form.id;
      setReservations((rs) => rs.filter((r) => r.id !== id));
      showToast("Réservation supprimée");
    }
    setSelStart(null);
    setSelEnd(null);
    setForm({ status: "reserved", note: "" });
  }

  function cancel() {
    setSelStart(null);
    setSelEnd(null);
    setForm({ status: "reserved", note: "" });
  }

  const upcoming = useMemo(
    () => [...reservations].sort((a, b) => a.start.localeCompare(b.start)),
    [reservations],
  );

  const months = [
    anchor,
    new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1),
    new Date(anchor.getFullYear(), anchor.getMonth() + 2, 1),
  ];

  return (
    <div className="admin-cal-view">
      <div className="admin-card">
        <div className="admin-card-head">
          <div>
            <div className="admin-card-title">Calendrier</div>
            <div className="admin-card-sub">
              Cliquez un jour pour créer une réservation ou éditer une existante.
            </div>
          </div>
          <div className="admin-cal-nav">
            <button
              className="admin-icon-btn"
              onClick={() =>
                setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1))
              }
              aria-label="Mois précédent"
            >
              ‹
            </button>
            <div className="admin-cal-label">
              {MONTHS_FR[anchor.getMonth()]} {anchor.getFullYear()} —{" "}
              {MONTHS_FR[months[2].getMonth()]} {months[2].getFullYear()}
            </div>
            <button
              className="admin-icon-btn"
              onClick={() =>
                setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1))
              }
              aria-label="Mois suivant"
            >
              ›
            </button>
            <button
              className="admin-btn admin-btn-ghost admin-btn-sm"
              onClick={() => setAnchor(new Date(today.getFullYear(), today.getMonth(), 1))}
            >
              Aujourd&rsquo;hui
            </button>
          </div>
        </div>

        <div className="admin-cal-legend">
          <span>
            <span className="admin-dot admin-dot-avail" /> Disponible
          </span>
          <span>
            <span className="admin-dot admin-dot-reserved" /> Réservé
          </span>
          <span>
            <span className="admin-dot admin-dot-blocked" /> Bloqué (perso)
          </span>
          <span>
            <span className="admin-dot admin-dot-sel" /> Sélectionné
          </span>
        </div>

        <div className="admin-cal-grid">
          <div className="admin-cal-months">
            {months.map((m, i) => (
              <AdminMonth
                key={i}
                year={m.getFullYear()}
                month={m.getMonth()}
                today={today}
                reservations={reservations}
                selStart={selStart}
                selEnd={selEnd}
                onClick={clickDay}
              />
            ))}
          </div>

          <aside className="admin-cal-side">
            <div className="admin-side-title">
              {form.id
                ? "Éditer la réservation"
                : selStart
                  ? "Nouvelle période"
                  : "Sélection"}
            </div>
            {!selStart && (
              <div className="admin-empty">
                Aucune période sélectionnée.
                <br />
                Cliquez sur un jour pour commencer.
              </div>
            )}
            {selStart && (
              <>
                <div className="admin-range">
                  <div>
                    <div className="admin-k">Début</div>
                    <div className="admin-v">
                      {selStart.toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="admin-k">Fin</div>
                    <div className="admin-v">
                      {(selEnd || selStart).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="admin-k">Nuits</div>
                    <div className="admin-v">
                      {daysBetween(selStart, selEnd || selStart) || 1}
                    </div>
                  </div>
                </div>

                <label className="admin-label">Statut</label>
                <div className="admin-radio-group">
                  {STATUS_OPTIONS.map((o) => (
                    <label
                      key={o.k}
                      className={`admin-radio ${form.status === o.k ? "active" : ""}`}
                    >
                      <input
                        type="radio"
                        checked={form.status === o.k}
                        onChange={() => setForm((f) => ({ ...f, status: o.k }))}
                      />
                      {o.l}
                    </label>
                  ))}
                </div>

                <label className="admin-label">Commentaire</label>
                <input
                  className="admin-input"
                  placeholder="Réservation Airbnb — Famille X"
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                />

                <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
                  <button className="admin-btn admin-btn-primary" onClick={saveRange}>
                    Enregistrer
                  </button>
                  {form.id !== undefined && (
                    <button className="admin-btn admin-btn-danger" onClick={deleteRange}>
                      Supprimer
                    </button>
                  )}
                  <button className="admin-btn admin-btn-ghost" onClick={cancel}>
                    Annuler
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <div>
            <div className="admin-card-title">Prochaines réservations</div>
            <div className="admin-card-sub">Triées par date d&rsquo;arrivée</div>
          </div>
          <button className="admin-btn admin-btn-ghost admin-btn-sm">
            Importer .ics Airbnb
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Arrivée</th>
              <th>Départ</th>
              <th>Nuits</th>
              <th>Statut</th>
              <th>Commentaire</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {upcoming.map((r) => {
              const s = parseKey(r.start);
              const e = parseKey(r.end);
              const statusLabel =
                r.status === "reserved"
                  ? "Réservé"
                  : r.status === "blocked"
                    ? "Bloqué"
                    : "Disponible";
              return (
                <tr key={r.id}>
                  <td>
                    {s.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    {e.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>{daysBetween(s, e)}</td>
                  <td>
                    <span className={`admin-pill admin-pill-${r.status}`}>{statusLabel}</span>
                  </td>
                  <td style={{ color: "var(--a-muted)" }}>{r.note}</td>
                  <td style={{ textAlign: "right" }}>
                    <button className="admin-link" onClick={() => clickDay(s)}>
                      Éditer
                    </button>
                    <button
                      className="admin-link admin-link-danger"
                      onClick={() =>
                        setReservations((rs) => rs.filter((x) => x.id !== r.id))
                      }
                    >
                      Suppr.
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <div>
            <div className="admin-card-title">Synchronisation iCal</div>
            <div className="admin-card-sub">
              Importez les calendriers Airbnb et Abritel pour éviter les doubles
              réservations.
            </div>
          </div>
        </div>
        <div className="admin-form-grid">
          <div>
            <label className="admin-label">URL iCal Airbnb</label>
            <input
              className="admin-input"
              placeholder="https://www.airbnb.com/calendar/ical/..."
            />
          </div>
          <div>
            <label className="admin-label">URL iCal Abritel</label>
            <input
              className="admin-input"
              placeholder="https://www.abritel.fr/icalendar/..."
            />
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <button className="admin-btn admin-btn-ghost">Synchroniser maintenant</button>
        </div>
      </div>

      {toast && <div className="admin-toast">✓ {toast}</div>}
    </div>
  );
}
