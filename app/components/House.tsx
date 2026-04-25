import {
  AcIcon,
  BedIcon,
  ChefIcon,
  FireIcon,
  ParkIcon,
  PoolIcon,
  TreeIcon,
  WasherIcon,
  WifiIcon,
} from "./Icons";

export function House() {
  return (
    <section id="maison" className="section reveal" style={{ background: "var(--ivoire-90)" }}>
      <div className="container house-grid">
        <div className="house-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/_DSC6325.avif"
            alt="entrée, pierre sèche & cyprès"
            style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }}
            loading="lazy"
          />
        </div>
        <div className="house-body">
          <span className="eyebrow">La maison</span>
          <h2 className="h1" style={{ marginTop: 14, marginBottom: 36 }}>
            Quatre chambres,
            <br />
            <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>une vue</em>.
          </h2>
          <ol className="spec-list">
            <li>
              <span className="spec-num">01</span>
              <span className="spec-txt">4 chambres · 3 salles d&rsquo;eau · 3 WC</span>
            </li>
            <li>
              <span className="spec-num">02</span>
              <span className="spec-txt">Séjour et salon traversants</span>
            </li>
            <li>
              <span className="spec-num">03</span>
              <span className="spec-txt">Deux cuisines — intérieure &amp; d&rsquo;été</span>
            </li>
            <li>
              <span className="spec-num">04</span>
              <span className="spec-txt">Terrasse couverte et terrasse ouverte</span>
            </li>
            <li>
              <span className="spec-num">05</span>
              <span className="spec-txt">Piscine chauffée · parc arboré</span>
            </li>
            <li>
              <span className="spec-num">06</span>
              <span className="spec-txt">6 à 8 personnes (8 maximum)</span>
            </li>
          </ol>

          <div style={{ marginTop: 56 }}>
            <span className="eyebrow">Équipements</span>
            <div className="equip-grid">
              <div className="equip-col">
                <h4 className="equip-title">Confort</h4>
                <ul>
                  <li>
                    <AcIcon /> Climatisation
                  </li>
                  <li>
                    <WifiIcon /> Wifi haut débit
                  </li>
                  <li>
                    <BedIcon /> Linge de maison fourni
                  </li>
                  <li>
                    <FireIcon /> Cheminée
                  </li>
                </ul>
              </div>
              <div className="equip-col">
                <h4 className="equip-title">Cuisine</h4>
                <ul>
                  <li>
                    <ChefIcon /> Cuisine équipée
                  </li>
                  <li>
                    <WasherIcon /> Lave-vaisselle · lave-linge
                  </li>
                  <li>
                    <FireIcon /> Four, plaque induction
                  </li>
                </ul>
              </div>
              <div className="equip-col">
                <h4 className="equip-title">Extérieur</h4>
                <ul>
                  <li>
                    <PoolIcon /> Piscine chauffée
                  </li>
                  <li>
                    <TreeIcon /> Parc clos &amp; arboré
                  </li>
                  <li>
                    <ParkIcon /> Parking privé
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
