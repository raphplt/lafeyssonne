import type { CSSProperties } from "react";

type Tone = "warm" | "stone" | "olive" | "sunset" | "sky" | "night";

type Props = {
  label?: string;
  ratio?: string;
  tone?: Tone;
  className?: string;
  style?: CSSProperties;
};

const PALETTES: Record<Tone, [string, string, string]> = {
  warm: ["#C9B89A", "#B8A687", "#D9CFBE"],
  stone: ["#A99F8D", "#948A77", "#C4B8A4"],
  olive: ["#7F8A6C", "#6B7A5A", "#9AA584"],
  sunset: ["#C27A5B", "#A9654A", "#D4916F"],
  sky: ["#8FA5B0", "#7591A0", "#A9BCC5"],
  night: ["#3B3428", "#2A2419", "#544938"],
};

export function ImgPlaceholder({
  label,
  ratio = "4/5",
  tone = "warm",
  className = "",
  style,
}: Props) {
  const [c1, c2, c3] = PALETTES[tone];
  return (
    <div
      className={`img-ph ${className}`}
      style={{
        aspectRatio: ratio,
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 14px)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 70%, transparent 40%, rgba(0,0,0,0.25) 100%)",
        }}
      />
      {label && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 14,
            right: 14,
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.72)",
            textTransform: "lowercase",
          }}
        >
          ▸ {label}
        </div>
      )}
    </div>
  );
}
