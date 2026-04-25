"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";

export type LightboxPhoto = {
  src: string;
  label: string;
};

type Props = {
  photos: LightboxPhoto[];
  startIndex: number;
  onClose: () => void;
};

export function Lightbox({ photos, startIndex, onClose }: Props) {
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
