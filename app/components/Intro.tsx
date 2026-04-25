import { Ornament } from "./Ornament";

export function Intro() {
  return (
    <section className="section reveal" style={{ textAlign: "center" }}>
      <div className="container" style={{ maxWidth: 780 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 40,
            color: "var(--olive)",
          }}
        >
          <Ornament />
        </div>
        <p className="lead" style={{ fontStyle: "italic" }}>
          À quelques pas du village médiéval de Caseneuve, une bastide de charme pour 6 à 8
          personnes. Quatre chambres, piscine chauffée, cuisine d&rsquo;été, parc arboré.
          <span style={{ color: "var(--terracotta)" }}> Le Luberon, simplement.</span>
        </p>
      </div>
    </section>
  );
}
