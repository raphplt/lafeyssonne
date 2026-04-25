type Props = {
  size?: number;
  color?: string;
};

export function Monogram({ size = 32, color = "currentColor" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="23" stroke={color} strokeWidth="0.75" opacity="0.4" />
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontFamily="var(--serif)"
        fontWeight="300"
        fontSize="18"
        fill={color}
        letterSpacing="-0.5"
      >
        LF
      </text>
    </svg>
  );
}
