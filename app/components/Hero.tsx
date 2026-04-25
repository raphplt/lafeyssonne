import { ArrowIcon, PhoneIcon } from "./Icons";
import { HeroVideo } from "./HeroVideo";
import { Ornament } from "./Ornament";

export function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-img">
        <HeroVideo
          src="/videos/video-promo-light.mp4"
          poster="/images/pictbien_68cab2ebe7e0e.avif"
          posterAlt="Bastide La Feyssonne — façade au coucher du soleil"
        />
      </div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <div className="hero-eyebrow">
          <Ornament />
          <span className="eyebrow" style={{ color: "rgba(247,244,238,0.9)" }}>
            Caseneuve · Luberon · 84
          </span>
        </div>
        <h1 className="h-display" style={{ color: "var(--ivoire)", marginBottom: "0.5rem" }}>
          Bastide
          <br />
          La Feyssonne
        </h1>
        <p
          className="serif"
          style={{
            fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
            fontStyle: "italic",
            color: "rgba(247,244,238,0.85)",
            maxWidth: 520,
            fontWeight: 300,
          }}
        >
          Une maison de pierre face au Luberon.
        </p>
        <div className="hero-cta">
          <a href="#dispos" className="btn btn-primary">
            Vérifier les disponibilités <ArrowIcon />
          </a>
          <a href="tel:+33643250543" className="btn btn-outline">
            <PhoneIcon /> 06 43 25 05 43
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <span
          className="eyebrow"
          style={{ color: "rgba(247,244,238,0.7)", fontSize: 10 }}
        >
          Découvrir
        </span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
