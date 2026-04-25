import { PhoneIcon } from "./Icons";

export function MobileSticky() {
  return (
    <div className="mobile-sticky">
      <a href="#dispos" className="btn btn-primary">
        Réserver
      </a>
      <a
        href="tel:+33643250543"
        className="btn btn-ghost"
        style={{ background: "var(--ivoire)" }}
        aria-label="Appeler"
      >
        <PhoneIcon />
      </a>
    </div>
  );
}
