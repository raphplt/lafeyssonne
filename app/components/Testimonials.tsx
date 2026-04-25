"use client";

import { useState } from "react";
import { StarIcon } from "./Icons";

const ITEMS = [
  {
    q: "Une maison qui tient ses promesses, posée dans un paysage qui en dit long. Nous sommes repartis changés, sans vraiment savoir par quoi.",
    n: "Hélène L.",
    s: "Séjour en juillet · famille de six",
  },
  {
    q: "Le calme, la qualité de la pierre, la lumière d'octobre dans le séjour. La piscine chauffée fait honneur à son nom. Je reviendrai.",
    n: "Jean-Jacques R.",
    s: "Séjour d'automne · couple",
  },
  {
    q: "De tous les lieux que nous avons loués en Provence, celui-ci est celui où l'on revient. Discret, bien tenu, une vraie maison, pas un décor.",
    n: "Carolle G.",
    s: "Fidèle depuis 2021",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  return (
    <section
      className="section reveal"
      style={{ background: "var(--brun)", color: "var(--ivoire)" }}
    >
      <div className="container" style={{ maxWidth: 920, textAlign: "center" }}>
        <span className="eyebrow" style={{ color: "rgba(247,244,238,0.6)" }}>
          Témoignages
        </span>

        <div className="reputation">
          <span className="reputation-stars" aria-hidden="true">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
          </span>
          <span className="reputation-score serif">
            10<span className="reputation-out">/10</span>
          </span>
          <span className="reputation-meta">
            <em>Exceptionnel</em> — 52 avis vérifiés sur Abritel
          </span>
        </div>
        <div
          style={{
            minHeight: 260,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <blockquote style={{ margin: 0 }}>
            <p
              className="serif"
              style={{
                fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)",
                lineHeight: 1.3,
                fontStyle: "italic",
                fontWeight: 300,
                color: "var(--ivoire)",
              }}
            >
              «&nbsp;{ITEMS[i].q}&nbsp;»
            </p>
            <footer style={{ marginTop: 36 }}>
              <div className="serif" style={{ fontSize: "1.1rem" }}>
                {ITEMS[i].n}
              </div>
              <div
                className="small"
                style={{ color: "rgba(247,244,238,0.55)", marginTop: 4 }}
              >
                {ITEMS[i].s}
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="test-pag">
          {ITEMS.map((_, k) => (
            <button
              key={k}
              className={`test-dot ${k === i ? "active" : ""}`}
              onClick={() => setI(k)}
              aria-label={`Témoignage ${k + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
