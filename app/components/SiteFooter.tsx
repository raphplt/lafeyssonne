import { Monogram } from "./Monogram";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Monogram size={36} />
          <div>
            <div className="serif" style={{ fontSize: "1.1rem" }}>
              Bastide La Feyssonne
            </div>
            <div className="small">Location de charme · Luberon</div>
          </div>
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
