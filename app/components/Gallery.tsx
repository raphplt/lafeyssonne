"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";
import { Lightbox } from "./Lightbox";

type Photo = { src: string; label: string; span: string };

const PHOTOS: Photo[] = [
  {
    src: "/images/facade-sud-jardin.avif",
    label: "façade sud, à l'ombre des chênes",
    span: "a",
  },
  {
    src: "/images/piscine-vue-maison.avif",
    label: "la piscine chauffée, vue depuis la maison",
    span: "b",
  },
  {
    src: "/images/cuisine-ete-tonnelle.avif",
    label: "cuisine d'été sous la tonnelle",
    span: "c",
  },
  {
    src: "/images/chambre-bois.avif",
    label: "chambre bois, sous les toits",
    span: "d",
  },
  {
    src: "/images/sejour-salon.avif",
    label: "le séjour, lumière douce",
    span: "e",
  },
  {
    src: "/images/parc-cabanon.avif",
    label: "le parc — cabanon sous les chênes",
    span: "f",
  },
  {
    src: "/images/piscine-nuit.avif",
    label: "la piscine à la nuit tombée",
    span: "g",
  },
];

export function Gallery() {
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  return (
    <>
      <section className="section reveal">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Galerie</span>
            <h2 className="h2">La maison en images</h2>
          </div>
          <div className="bento">
            {PHOTOS.map((p, i) => (
              <button
                key={i}
                className={`bento-${p.span} bento-item`}
                onClick={() => setLbIndex(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.label} loading="lazy" />
                <div className="bento-caption serif">{p.label}</div>
              </button>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn btn-ghost" onClick={() => setLbIndex(0)}>
              Voir toutes les photos <ArrowIcon />
            </button>
          </div>
        </div>
      </section>

      {lbIndex !== null && (
        <Lightbox
          photos={PHOTOS}
          startIndex={lbIndex}
          onClose={() => setLbIndex(null)}
        />
      )}
    </>
  );
}
