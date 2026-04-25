import { ArrowIcon, ExternalIcon, PhoneIcon } from "./Icons";

export function ReservationCTA() {
  return (
    <section
      id="reservation-cta"
      className="section reveal"
      style={{ background: "var(--pierre)" }}
    >
      <div className="container">
        <div className="section-head" style={{ textAlign: "center" }}>
          <span className="eyebrow">Réserver</span>
          <h2 className="h2" style={{ marginTop: 8 }}>
            Trois manières de nous contacter
          </h2>
        </div>
        <div className="cta-trio">
          <a href="tel:+33643250543" className="cta-card">
            <PhoneIcon />
            <div className="cta-label small">Appeler</div>
            <div className="cta-num serif">06 43 25 05 43</div>
            <div className="small" style={{ marginTop: 10, color: "var(--brun-70)" }}>
              Réponse directe, tous les jours
            </div>
            <div className="cta-foot">
              Nous appeler <ArrowIcon />
            </div>
          </a>

          <a href="#" target="_blank" rel="noopener" className="cta-card">
            <div className="cta-platform serif">Airbnb</div>
            <div className="cta-label small">Plateforme</div>
            <div className="cta-num serif" style={{ fontSize: "1.6rem" }}>
              Voir l&rsquo;annonce
            </div>
            <div className="small" style={{ marginTop: 10, color: "var(--brun-70)" }}>
              Avis vérifiés · Annulation gratuite
            </div>
            <div className="cta-foot">
              Ouvrir Airbnb <ExternalIcon />
            </div>
          </a>

          <a href="#" target="_blank" rel="noopener" className="cta-card">
            <div className="cta-platform serif">Abritel</div>
            <div className="cta-label small">Plateforme</div>
            <div className="cta-num serif" style={{ fontSize: "1.6rem" }}>
              Voir l&rsquo;annonce
            </div>
            <div className="small" style={{ marginTop: 10, color: "var(--brun-70)" }}>
              Paiement sécurisé
            </div>
            <div className="cta-foot">
              Ouvrir Abritel <ExternalIcon />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
