"use client";

import { useState } from "react";
import {
  BedIcon,
  ChefIcon,
  FireIcon,
  ParkIcon,
  PoolIcon,
  TreeIcon,
  WasherIcon,
  WifiIcon,
} from "./Icons";
import { Lightbox, type LightboxPhoto } from "./Lightbox";

const BEDROOMS: LightboxPhoto[] = [
  { src: "/images/chambre-deux-lits.avif", label: "Chambre deux lits" },
  { src: "/images/chambre-bois.avif",    label: "Chambre bois" },
  { src: "/images/chambre-orange.avif",  label: "Chambre orange" },
  { src: "/images/chambre-rose.avif",    label: "Chambre rose" },
];

export function House() {
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  return (
    <section id="maison" className="section reveal" style={{ background: "var(--ivoire-90)" }}>
      <div className="container house-grid">
        <div className="house-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/piscine-transats-jour.avif"
            alt="la piscine, transats au soleil"
            style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }}
            loading="lazy"
          />
        </div>
        <div className="house-body">
          <span className="eyebrow">La maison</span>
          <h2 className="h1" style={{ marginTop: 14, marginBottom: 36 }}>
            Quatre chambres,
            <br />
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>une vue</em>.
          </h2>
          <ol className="spec-list">
            <li>
              <span className="spec-num">01</span>
              <span className="spec-txt">4 chambres · 3 salles d&rsquo;eau · 3 WC</span>
            </li>
            <li>
              <span className="spec-num">02</span>
              <span className="spec-txt">Séjour et salon traversants</span>
            </li>
            <li>
              <span className="spec-num">03</span>
              <span className="spec-txt">Deux cuisines — intérieure &amp; d&rsquo;été</span>
            </li>
            <li>
              <span className="spec-num">04</span>
              <span className="spec-txt">Terrasse couverte et terrasse ouverte</span>
            </li>
            <li>
              <span className="spec-num">05</span>
              <span className="spec-txt">Piscine chauffée · parc arboré</span>
            </li>
            <li>
              <span className="spec-num">06</span>
              <span className="spec-txt">6 à 8 personnes (8 maximum)</span>
            </li>
          </ol>

          <div style={{ marginTop: 56 }}>
            <span className="eyebrow">Les chambres</span>
            <div className="bedrooms-grid" style={{ marginTop: 20 }}>
              {BEDROOMS.map((c, i) => (
                <button
                  key={c.src}
                  type="button"
                  className="bedroom-tile"
                  onClick={() => setLbIndex(i)}
                  aria-label={`Ouvrir la photo : ${c.label}`}
                >
                  <div className="bedroom-tile-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.src} alt={c.label} loading="lazy" />
                  </div>
                  <span className="bedroom-name serif">{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 56 }}>
            <span className="eyebrow">Équipements</span>
            <div className="equip-grid">
              <div className="equip-col">
                <h4 className="equip-title">Confort</h4>
                <ul>
                  <li>
                    <WifiIcon /> Wifi haut débit
                  </li>
                  <li>
                    <BedIcon /> Linge de maison fourni
                  </li>
                  <li>
                    <FireIcon /> Cheminée
                  </li>
                  <li>Télévision satellite &amp; lecteur DVD</li>
                  <li>Sèche-cheveux, fer à repasser &amp; table</li>
                  <li>Jeux de société</li>
                </ul>
              </div>
              <div className="equip-col">
                <h4 className="equip-title">Cuisine</h4>
                <ul>
                  <li>
                    <ChefIcon /> 2 cuisines équipées (intérieure &amp; d&rsquo;été)
                  </li>
                  <li>
                    <WasherIcon /> 2 lave-vaisselle · 1 lave-linge
                  </li>
                  <li>
                    <FireIcon /> Gazinière, four électrique, plaque gaz &amp; électrique
                  </li>
                  <li>2 réfrigérateurs / congélateurs</li>
                  <li>2 fours micro-ondes</li>
                  <li>Petit électroménager</li>
                </ul>
              </div>
              <div className="equip-col">
                <h4 className="equip-title">Extérieur &amp; jeux</h4>
                <ul>
                  <li>
                    <PoolIcon /> Piscine chauffée · transats
                  </li>
                  <li>
                    <TreeIcon /> Parc arboré
                  </li>
                  <li>
                    <ParkIcon /> Parking privé
                  </li>
                  <li>Salon de jardin</li>
                  <li>Tables, chaises &amp; fauteuils</li>
                  <li>Boulodrome &amp; boules de pétanque</li>
                  <li>Table de ping-pong, panier de basket, filet de volley</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lbIndex !== null && (
        <Lightbox
          photos={BEDROOMS}
          startIndex={lbIndex}
          onClose={() => setLbIndex(null)}
        />
      )}
    </section>
  );
}
