"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Place } from "./SurroundingsMap";

const Map = dynamic(() => import("./SurroundingsMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "var(--ivoire-90)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--brun-50)",
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        fontSize: 14,
      }}
    >
      Carte en chargement…
    </div>
  ),
});

const HOME: Place = {
  id: "home",
  name: "La Feyssonne · Caseneuve",
  lat: 43.886887,
  lng: 5.484011,
};

const PLACES: Place[] = [
  { id: "bonnieux",     name: "Bonnieux",                       lat: 43.8232, lng: 5.3105, duration: "15 min" },
  { id: "lacoste",      name: "Lacoste",                        lat: 43.8351, lng: 5.2785, duration: "20 min" },
  { id: "oppede",       name: "Oppède",                         lat: 43.8385, lng: 5.1665, duration: "25 min" },
  { id: "gordes",       name: "Gordes",                         lat: 43.9116, lng: 5.1985, duration: "30 min" },
  { id: "roussillon",   name: "Roussillon",                     lat: 43.9011, lng: 5.2934, duration: "15 min" },
  { id: "rustrel",      name: "Rustrel — Colorado provençal",   lat: 43.9402, lng: 5.5023, duration: "4 km à pied" },
  { id: "simiane",      name: "Simiane-la-Rotonde",             lat: 43.9806, lng: 5.5640, duration: "35 min" },
  { id: "banon",        name: "Banon",                          lat: 43.9879, lng: 5.6332, duration: "40 min" },
  { id: "forcalquier",  name: "Forcalquier",                    lat: 43.9598, lng: 5.7811, duration: "50 min" },
];

type Market = { day: string; villages: string; note?: string };

const MARKETS: Market[] = [
  { day: "Lundi",    villages: "Forcalquier" },
  { day: "Mardi",    villages: "Apt (marché paysan), Gordes, Banon" },
  { day: "Mercredi", villages: "Lacoste, Viens", note: "matin" },
  { day: "Mercredi", villages: "Sault, Rustrel",  note: "après-midi" },
  { day: "Jeudi",    villages: "Céreste, Goult, Ménerbes, Roussillon, Aubignan, Isle-sur-la-Sorgue", note: "matin" },
  { day: "Vendredi", villages: "Bonnieux, Lourmarin, Carpentras, Apt, Manosque", note: "matin" },
  { day: "Samedi",   villages: "Pernes-les-Fontaines, Apt, Isle-sur-la-Sorgue", note: "matin" },
  { day: "Dimanche", villages: "Coustellet, Isle-sur-la-Sorgue", note: "matin" },
];

export function Surroundings() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="alentours" className="section reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Le territoire</span>
          <h2 className="h1" style={{ marginTop: 10 }}>
            Le village <em style={{ fontStyle: "italic" }}>&amp;</em> les alentours
          </h2>
        </div>

        <div className="surr-grid">
          <div className="surr-col">
            <div className="surr-sub">
              <span className="surr-label serif">Au village</span>
              <p>
                Producteurs locaux de fromages, miel et vins. Deux tables honnêtes :{" "}
                <em>Le Sanglier Paresseux</em> et <em>L&rsquo;Authentic Bistrot</em>. Le marché
                dominical pour les fruits et les herbes séchées.
              </p>
            </div>
            <hr className="divider" />
            <div className="surr-sub">
              <span className="surr-label serif">Aux alentours</span>
              <p>
                Équitation, VTT, randonnée au départ de la maison. Parapente à
                Saint-André-les-Alpes, escalade à Buoux, golf à Saumane. Vignobles de Ventoux
                et de Luberon à portée.
              </p>
            </div>
          </div>

          <div className="surr-col">
            <div className="surr-sub">
              <span className="surr-label serif">À visiter</span>
              <ul className="surr-places">
                {PLACES.map((p) => (
                  <li
                    key={p.id}
                    className={`surr-place ${activeId === p.id ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveId(p.id)}
                    onMouseLeave={() => setActiveId(null)}
                    onFocus={() => setActiveId(p.id)}
                    onBlur={() => setActiveId(null)}
                    tabIndex={0}
                  >
                    <span>{p.name}</span>
                    <span className="surr-place-dur">{p.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="surr-map">
            <Map
              home={HOME}
              places={PLACES}
              activeId={activeId}
              onActiveChange={setActiveId}
            />
          </div>
        </div>

        <div className="surr-markets">
          <span className="surr-label serif">Les marchés du coin</span>
          <ul className="markets-list">
            {MARKETS.map((m, i) => (
              <li key={i} className="markets-row">
                <span className="markets-day serif">
                  {m.day}
                  {m.note ? <em className="markets-note"> · {m.note}</em> : null}
                </span>
                <span className="markets-villages">{m.villages}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
