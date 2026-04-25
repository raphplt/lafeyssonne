"use client";

import { useState } from "react";
import { ArrowIcon, MailIcon, PhoneIcon, PinIcon } from "./Icons";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="section reveal">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Nous écrire</span>
          <h2 className="h1" style={{ marginTop: 10 }}>
            Une question, une demande particulière ?
          </h2>
        </div>
        <div className="contact-grid">
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="field">
              <label>Nom</label>
              <input type="text" required placeholder="Votre nom" />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" required placeholder="vous@exemple.fr" />
            </div>
            <div className="field">
              <label>Dates souhaitées</label>
              <input type="text" placeholder="Ex. du 12 au 22 juillet" />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea rows={5} placeholder="Votre projet de séjour…" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitted}>
              {submitted ? "Merci — nous vous écrivons" : "Envoyer le message"}
              {!submitted && <ArrowIcon />}
            </button>
          </form>

          <aside className="contact-info">
            <div className="info-block">
              <PinIcon />
              <div>
                <div className="serif" style={{ fontSize: "1.2rem" }}>
                  Bastide La Feyssonne
                </div>
                <div className="small">84750 Caseneuve · Luberon</div>
              </div>
            </div>
            <div className="info-block">
              <PhoneIcon />
              <a href="tel:+33643250543" className="serif" style={{ fontSize: "1.3rem" }}>
                06 43 25 05 43
              </a>
            </div>
            <div className="info-block">
              <MailIcon />
              <a
                href="mailto:courrier@lafeyssonne.com"
                className="serif"
                style={{ fontSize: "1.1rem" }}
              >
                courrier@lafeyssonne.com
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
