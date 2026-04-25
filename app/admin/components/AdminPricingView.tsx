"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Row = {
  id: string;
  period: string;
  month_number: number | null;
  price: number;
  min_nights: number;
  sort_order: number;
};

type DraftRow = Row & { _new?: boolean; _dirty?: boolean };

const supabase = createClient();

export function AdminPricingView() {
  const [rows, setRows] = useState<DraftRow[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [open, setOpen] = useState({ tarifs: true, liens: true, contenu: false });
  const [links, setLinks] = useState({
    airbnb: "https://www.airbnb.fr/rooms/1110140582764648931",
    abritel: "https://www.abritel.fr/location-vacances/p992349",
    phone: "+33 6 43 25 05 43",
    caution: "500",
  });

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("pricing")
        .select("id, period, month_number, price, min_nights, sort_order")
        .order("sort_order", { ascending: true });
      if (!active) return;
      if (error) setError(error.message);
      else setRows((data as Row[]).map((r) => ({ ...r })));
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  function updateRow<K extends keyof Row>(id: string, key: K, val: Row[K]) {
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, [key]: val, _dirty: true } : r)),
    );
  }
  function addRow() {
    const tempId = `new_${Date.now()}`;
    const nextOrder = (rows.at(-1)?.sort_order ?? 0) + 1;
    setRows((rs) => [
      ...rs,
      {
        id: tempId,
        period: "Nouvelle période",
        month_number: null,
        price: 200,
        min_nights: 7,
        sort_order: nextOrder,
        _new: true,
        _dirty: true,
      },
    ]);
  }
  function removeRow(id: string) {
    const row = rows.find((r) => r.id === id);
    if (row && !row._new) setDeletedIds((ids) => [...ids, id]);
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  const isDirty =
    deletedIds.length > 0 || rows.some((r) => r._dirty || r._new);

  async function save() {
    if (!isDirty || saving) return;
    setSaving(true);

    const errors: string[] = [];

    if (deletedIds.length) {
      const { error } = await supabase
        .from("pricing")
        .delete()
        .in("id", deletedIds);
      if (error) errors.push(error.message);
    }

    for (const r of rows) {
      if (r._new) {
        const { data, error } = await supabase
          .from("pricing")
          .insert({
            period: r.period,
            month_number: r.month_number,
            price: r.price,
            min_nights: r.min_nights,
            sort_order: r.sort_order,
          })
          .select()
          .single();
        if (error) errors.push(error.message);
        else if (data)
          setRows((cur) =>
            cur.map((cr) =>
              cr.id === r.id ? ({ ...(data as Row), _new: false, _dirty: false }) : cr,
            ),
          );
      } else if (r._dirty) {
        const { error } = await supabase
          .from("pricing")
          .update({
            period: r.period,
            month_number: r.month_number,
            price: r.price,
            min_nights: r.min_nights,
            sort_order: r.sort_order,
          })
          .eq("id", r.id);
        if (error) errors.push(error.message);
        else
          setRows((cur) =>
            cur.map((cr) => (cr.id === r.id ? { ...cr, _dirty: false } : cr)),
          );
      }
    }

    setDeletedIds([]);
    setSaving(false);

    if (errors.length) {
      setError(errors.join(" · "));
    } else {
      setError(null);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2200);
    }
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
              Modifiez prix, mois ciblé et séjour minimum. Les changements
              s&rsquo;appliquent au site dès l&rsquo;enregistrement.
            </div>

            {loading && <div className="admin-empty">Chargement…</div>}

            {!loading && (
              <table className="admin-table admin-table-edit">
                <thead>
                  <tr>
                    <th>Période</th>
                    <th style={{ width: 110 }}>Mois</th>
                    <th style={{ width: 160 }}>Prix / nuit</th>
                    <th style={{ width: 150 }}>Séjour min</th>
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
                        <select
                          className="admin-input admin-input-inline"
                          value={r.month_number ?? ""}
                          onChange={(e) =>
                            updateRow(
                              r.id,
                              "month_number",
                              e.target.value === "" ? null : Number(e.target.value),
                            )
                          }
                        >
                          <option value="">—</option>
                          <option value="1">01 · Janv.</option>
                          <option value="2">02 · Févr.</option>
                          <option value="3">03 · Mars</option>
                          <option value="4">04 · Avr.</option>
                          <option value="5">05 · Mai</option>
                          <option value="6">06 · Juin</option>
                          <option value="7">07 · Juil.</option>
                          <option value="8">08 · Août</option>
                          <option value="9">09 · Sept.</option>
                          <option value="10">10 · Oct.</option>
                          <option value="11">11 · Nov.</option>
                          <option value="12">12 · Déc.</option>
                        </select>
                      </td>
                      <td>
                        <div className="admin-input-with-suffix">
                          <input
                            className="admin-input admin-input-inline"
                            type="number"
                            value={r.price}
                            onChange={(e) =>
                              updateRow(r.id, "price", Number(e.target.value) || 0)
                            }
                          />
                          <span>€</span>
                        </div>
                      </td>
                      <td>
                        <div className="admin-input-with-suffix">
                          <input
                            className="admin-input admin-input-inline"
                            type="number"
                            value={r.min_nights}
                            onChange={(e) =>
                              updateRow(r.id, "min_nights", Number(e.target.value) || 1)
                            }
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
            )}

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
          <span className="admin-card-title">
            Liens de réservation &amp; informations
          </span>
          <span className="admin-chev">{open.liens ? "−" : "+"}</span>
        </button>
        {open.liens && (
          <>
            <div className="admin-card-sub" style={{ marginBottom: 12 }}>
              Cette section n&rsquo;est pas encore persistée — réservée à une v2.
            </div>
            <div className="admin-form-grid">
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
          </>
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

      {error && (
        <div
          className="admin-empty"
          style={{ background: "#fef2f2", borderColor: "#fecaca", color: "#b91c1c" }}
        >
          {error}
        </div>
      )}

      <div className="admin-sticky-foot">
        <div style={{ color: "var(--a-muted)", fontSize: 13 }}>
          {saving
            ? "Enregistrement…"
            : isDirty
              ? "Modifications non enregistrées"
              : "✓ À jour"}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            className="admin-btn admin-btn-primary"
            onClick={save}
            disabled={!isDirty || saving}
          >
            Enregistrer les modifications
          </button>
        </div>
      </div>

      {savedToast && <div className="admin-toast">✓ Modifications enregistrées</div>}
    </div>
  );
}
