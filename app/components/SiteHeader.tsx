"use client";

import { useEffect, useState } from "react";
import { Monogram } from "./Monogram";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", on);
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container site-header-inner">
        <a href="#hero" className="site-brand">
          <Monogram size={28} />
          <span className="serif" style={{ fontSize: "1.1rem" }}>
            La Feyssonne
          </span>
        </a>
        <nav className="site-nav">
          <a href="#maison">La maison</a>
          <a href="#dispos">Disponibilités</a>
          <a href="#alentours">Les alentours</a>
          <a href="#contact">Contact</a>
        </nav>
        <a href="#dispos" className="btn btn-primary btn-sm">
          Réserver
        </a>
      </div>
    </header>
  );
}
