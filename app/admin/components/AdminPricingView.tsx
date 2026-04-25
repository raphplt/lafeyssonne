"use client";

import { useState } from "react";

type Row = { id: number; period: string; price: number; min: number };

const INITIAL_ROWS: Row[] = [
  { id: 1, period: "Mai", price: 220, min: 7 },
  { id: 2, period: "Juin", price: 250, min: 7 },
  { id: 3, period: "Juillet", price: 350, min: 10 },
  { id: 4, period: "Août", price: 350, min: 10 },
  { id: 5, period: "Septembre", price: 220, min: 7 },
];

export function AdminPricingView() {
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
  const [open, setOpen] = useState({ tarifs: true, liens: true, contenu: false });
  const [links, setLinks] = useState({
    airbnb: "https://www.airbnb.fr/rooms/1110140582764648931",
    abritel: "https://www.abritel.fr/location-vacances/p992349",
    phone: "+33 6 43 25 05 43",
    caution: "500",
  });
  const [saved, setSaved] = useState(false);

  function updateRow<K extends keyof Row>(id: number, key: K, val: Row[K]) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [key]: val } : r)));
  }
  function addRow() {
    setRows((rs) => [
      ...rs,
      { id: Date.now(), period: "Nouvelle période", price: 200, min: 7 },
    ]);
  }
  function removeRow(id: number) {
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div className="admin-pricing-view">
      <div className="admin-card">
        <button
          className="admin-collapse"
          onClick={() => setOpen((o) => ({ ...o, tarifs: !o.tarifs }))}
        >
          <span className="admin-card-title">Tarifs par saison</span>
          <span className="admin-chev">{open.tarifs ? "−" : "+"}</span>
        </button>
        {open.tarifs && (
          <>
            <div className="admin-card-sub" style={{ marginBottom: 18 }}>
              Modifiez prix et séjour minimum. Les changements sont appliqués au site
              dès l&rsquo;enregistrement.
            </div>
            <table className="admin-table admin-table-edit">
              <thead>
                <tr>
                  <th>Période</th>
                  <th style={{ width: 180 }}>Prix / nuit</th>
                  <th style={{ width: 160 }}>Séjour min</th>
                  <th style={{ width: 40 }} />
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <input
                        className="admin-input admin-input-inline"
                        value={r.period}
                        onChange={(e) => updateRow(r.id, "period", e.target.value)}
                      />
                    </td>
                    <td>
                      <div className="admin-input-with-suffix">
                        <input
                          className="admin-input admin-input-inline"
                          type="number"
                          value={r.price}
                          onChange={(e) => updateRow(r.id, "price", +e.target.value)}
                        />
                        <span>€</span>
                      </div>
                    </td>
                    <td>
                      <div className="admin-input-with-suffix">
                        <input
                          className="admin-input admin-input-inline"
                          type="number"
                          value={r.min}
                          onChange={(e) => updateRow(r.id, "min", +e.target.value)}
                        />
                        <span>nuits</span>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="admin-link admin-link-danger"
                        onClick={() => removeRow(r.id)}
                        aria-label="Supprimer la ligne"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="admin-btn admin-btn-ghost admin-btn-sm"
              onClick={addRow}
              style={{ marginTop: 16 }}
            >
              + Ajouter une période
            </button>
          </>
        )}
      </div>

      <div className="admin-card">
        <button
          className="admin-collapse"
          onClick={() => setOpen((o) => ({ ...o, liens: !o.liens }))}
        >
          <span className="admin-card-title">Liens de réservation &amp; informations</span>
          <span className="admin-chev">{open.liens ? "−" : "+"}</span>
        </button>
        {open.liens && (
          <div className="admin-form-grid" style={{ marginTop: 10 }}>
            <div>
              <label className="admin-label">URL Airbnb</label>
              <input
                className="admin-input"
                value={links.airbnb}
                onChange={(e) => setLinks({ ...links, airbnb: e.target.value })}
              />
            </div>
            <div>
              <label className="admin-label">URL Abritel</label>
              <input
                className="admin-input"
                value={links.abritel}
                onChange={(e) => setLinks({ ...links, abritel: e.target.value })}
              />
            </div>
            <div>
              <label className="admin-label">Numéro de téléphone affiché</label>
              <input
                className="admin-input"
                value={links.phone}
                onChange={(e) => setLinks({ ...links, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="admin-label">Caution (€)</label>
              <input
                className="admin-input"
                value={links.caution}
                onChange={(e) => setLinks({ ...links, caution: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      <div className="admin-card">
        <button
          className="admin-collapse"
          onClick={() => setOpen((o) => ({ ...o, contenu: !o.contenu }))}
        >
          <span className="admin-card-title">
            Contenu éditorial <span className="admin-badge">v2</span>
          </span>
          <span className="admin-chev">{open.contenu ? "−" : "+"}</span>
        </button>
        {open.contenu && (
          <div style={{ marginTop: 8 }}>
            <label className="admin-label">Texte d&rsquo;intro</label>
            <textarea
              className="admin-input"
              rows={4}
              defaultValue="À quelques pas du village médiéval de Caseneuve, une bastide de charme pour 6 à 8 personnes. 4 chambres, piscine chauffée, cuisine d'été, parc arboré. Le Luberon, simplement."
            />
            <label className="admin-label" style={{ marginTop: 14 }}>
              Équipements (un par ligne)
            </label>
            <textarea
              className="admin-input"
              rows={4}
              defaultValue={"Climatisation\nWifi haut débit\nCheminée\nPiscine chauffée"}
            />
            <label className="admin-label" style={{ marginTop: 14 }}>
              Témoignages
            </label>
            <div className="admin-empty" style={{ padding: 20 }}>
              Gestion CRUD des témoignages — disponible en v2.
            </div>
          </div>
        )}
      </div>

      <div className="admin-sticky-foot">
        <div style={{ color: "var(--a-muted)", fontSize: 13 }}>
          {saved ? "✓ Modifications enregistrées" : "Modifications non enregistrées"}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="admin-btn admin-btn-ghost">Annuler</button>
          <button className="admin-btn admin-btn-primary" onClick={save}>
            Enregistrer les modifications
          </button>
        </div>
      </div>

      {saved && <div className="admin-toast">✓ Modifications enregistrées</div>}
    </div>
  );
}
