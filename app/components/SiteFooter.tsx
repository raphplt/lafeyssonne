import Image from "next/image";
import { GithubIcon, GlobeIcon, HeartIcon, LinkedinIcon } from "./Icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Image
            src="/logo.png"
            alt="La Feyssonne — Bastide · Luberon"
            width={180}
            height={110}
            className="footer-logo"
          />
        </div>
        <div className="footer-links small">
          <a href="#maison">La maison</a>
          <a href="#dispos">Disponibilités</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="small" style={{ color: "var(--brun-50)" }}>
          © 2026 · Mentions légales
        </div>
      </div>
      <div className="container footer-credits small">
        <span>
          Fait avec <HeartIcon className="footer-heart" aria-hidden="true" /> par Raphaël
        </span>
        <span className="footer-credits-links">
          <a
            href="https://github.com/raphplt"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/raphaël-plassart"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://atlas.raphael-plassart.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Atlas"
          >
            <GlobeIcon />
          </a>
        </span>
      </div>
    </footer>
  );
}
