import Image from "next/image";

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
    </footer>
  );
}
