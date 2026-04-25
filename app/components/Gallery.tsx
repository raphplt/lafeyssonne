"use client";

import { useEffect, useState } from "react";
import { ArrowIcon, ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";

type Photo = { src: string; label: string; span: string };

const PHOTOS: Photo[] = [
  {
    src: "/images/pictbien_68cab2ecee520.avif",
    label: "façade sud au coucher du soleil",
    span: "a",
  },
  {
    src: "/images/pictbien_68cab2f6e900f.avif",
    label: "la piscine chauffée",
    span: "b",
  },
  {
    src: "/images/cuisinedete.avif",
    label: "cuisine d'été sous la tonnelle",
    span: "c",
  },
  {
    src: "/images/pictbien_68cab30625d79.avif",
    label: "chambre sud, lumière de l'après-midi",
    span: "d",
  },
  {
    src: "/images/IMG_0328.avif",
    label: "le parc — oliviers centenaires",
    span: "e",
  },
  {
    src: "/images/pictbien_68cab306ace68.avif",
    label: "terrasse couverte",
    span: "f",
  },
  {
    src: "/images/Piscine nu_it.avif",
    label: "volets fermés, heure bleue",
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

type LightboxProps = {
  photos: Photo[];
  startIndex: number;
  onClose: () => void;
};

function Lightbox({ photos, startIndex, onClose }: LightboxProps) {
  const [i, setI] = useState(startIndex);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((x) => (x + 1) % photos.length);
      if (e.key === "ArrowLeft") setI((x) => (x - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, photos.length]);

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="Fermer">
        <CloseIcon />
      </button>
      <button
        className="lb-nav lb-prev"
        onClick={(e) => {
          e.stopPropagation();
          setI((x) => (x - 1 + photos.length) % photos.length);
        }}
        aria-label="Photo précédente"
      >
        <ChevronLeftIcon />
      </button>
      <div className="lb-body" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[i].src}
          alt={photos[i].label}
          style={{
            width: "min(1100px, 90vw)",
            maxHeight: "80vh",
            height: "auto",
            objectFit: "contain",
            margin: "0 auto",
          }}
        />
        <div className="lb-caption">
          {photos[i].label} ·{" "}
          <span style={{ opacity: 0.5 }}>
            {i + 1} / {photos.length}
          </span>
        </div>
      </div>
      <button
        className="lb-nav lb-next"
        onClick={(e) => {
          e.stopPropagation();
          setI((x) => (x + 1) % photos.length);
        }}
        aria-label="Photo suivante"
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
}
