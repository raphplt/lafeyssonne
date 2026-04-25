export function Surroundings() {
  return (
    <section id="alentours" className="section reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Le territoire</span>
          <h2 className="h1" style={{ marginTop: 10 }}>
            Le village <em style={{ fontStyle: "italic" }}>&amp;</em> les alentours
          </h2>
        </div>

        <div className="surr-grid">
          <div className="surr-col">
            <div className="surr-sub">
              <span className="surr-label serif">Au village</span>
              <p>
                Producteurs locaux de fromages, miel et vins. Deux tables honnêtes :{" "}
                <em>Le Sanglier Paresseux</em> et <em>L&rsquo;Authentic Bistrot</em>. Le marché
                dominical pour les fruits et les herbes séchées.
              </p>
            </div>
            <hr className="divider" />
            <div className="surr-sub">
              <span className="surr-label serif">Aux alentours</span>
              <p>
                Équitation, VTT, randonnée au départ de la maison. Parapente à
                Saint-André-les-Alpes, escalade à Buoux, golf à Saumane. Vignobles de Ventoux
                et de Luberon à portée.
              </p>
            </div>
          </div>

          <div className="surr-col">
            <div className="surr-sub">
              <span className="surr-label serif">À visiter</span>
              <ul className="surr-places">
                <li>
                  Bonnieux <span>15 min</span>
                </li>
                <li>
                  Lacoste <span>20 min</span>
                </li>
                <li>
                  Oppède <span>25 min</span>
                </li>
                <li>
                  Gordes <span>30 min</span>
                </li>
                <li>
                  Roussillon <span>15 min</span>
                </li>
                <li>
                  Rustrel — Colorado provençal <span>4 km à pied</span>
                </li>
                <li>
                  Simiane-la-Rotonde <span>35 min</span>
                </li>
                <li>
                  Banon <span>40 min</span>
                </li>
                <li>
                  Forcalquier <span>50 min</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="surr-map">
            <MiniMap />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniMap() {
  const villages = [
    { x: 60, y: 80, n: "Gordes" },
    { x: 160, y: 60, n: "Roussillon" },
    { x: 240, y: 40, n: "Rustrel" },
    { x: 340, y: 80, n: "Simiane" },
    { x: 100, y: 220, n: "Bonnieux" },
    { x: 180, y: 250, n: "Lacoste" },
    { x: 340, y: 220, n: "Forcalquier" },
  ];
  return (
    <svg viewBox="0 0 420 320" fill="none" style={{ width: "100%", height: "auto" }}>
      <rect width="420" height="320" fill="var(--ivoire-90)" />
      <path
        d="M 20 180 Q 120 160 210 170 T 400 150"
        stroke="var(--brun-30)"
        strokeWidth="0.6"
        fill="none"
      />
      <path
        d="M 40 60 Q 140 110 210 170 T 380 240"
        stroke="var(--brun-15)"
        strokeWidth="0.5"
        fill="none"
      />
      <path d="M 210 170 L 210 40" stroke="var(--brun-15)" strokeWidth="0.5" fill="none" />
      <path d="M 210 170 L 310 260" stroke="var(--brun-15)" strokeWidth="0.5" fill="none" />
      {villages.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="2.5" fill="var(--brun-70)" />
          <text
            x={p.x + 8}
            y={p.y + 4}
            fontFamily="var(--serif)"
            fontSize="11"
            fill="var(--brun-70)"
            fontStyle="italic"
          >
            {p.n}
          </text>
        </g>
      ))}
      <circle
        cx="210"
        cy="170"
        r="10"
        fill="none"
        stroke="var(--terracotta)"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <circle cx="210" cy="170" r="5" fill="var(--terracotta)" />
      <text
        x="222"
        y="174"
        fontFamily="var(--serif)"
        fontSize="13"
        fill="var(--terracotta)"
        fontWeight="500"
      >
        La Feyssonne
      </text>
      <text
        x="222"
        y="188"
        fontFamily="var(--sans)"
        fontSize="9"
        fill="var(--brun-70)"
        letterSpacing="0.1em"
      >
        CASENEUVE · 84750
      </text>
      <g transform="translate(380 290)">
        <circle r="12" fill="none" stroke="var(--brun-30)" strokeWidth="0.5" />
        <text
          y="-16"
          fontFamily="var(--sans)"
          fontSize="8"
          fill="var(--brun-70)"
          textAnchor="middle"
          letterSpacing="0.1em"
        >
          N
        </text>
        <path d="M 0 -6 L -3 6 L 0 3 L 3 6 Z" fill="var(--brun-70)" />
      </g>
    </svg>
  );
}
