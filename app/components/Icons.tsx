import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const PhoneIcon = (p: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const ArrowIcon = (p: IconProps) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const DownIcon = (p: IconProps) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ExternalIcon = (p: IconProps) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" {...p}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
  </svg>
);

export const WifiIcon = (p: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" {...p}>
    <path d="M5 12.55a11 11 0 0 1 14 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.94 0" />
    <circle cx="12" cy="20" r="0.6" fill="currentColor" />
  </svg>
);

export const PoolIcon = (p: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" {...p}>
    <path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5S16 18 18 18s2-1.5 4-1.5M2 14c2 0 2-1.5 4-1.5S8 14 10 14s2-1.5 4-1.5S16 14 18 14s2-1.5 4-1.5M6 4v10M18 4v10M6 8h12" />
  </svg>
);

export const TreeIcon = (p: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" {...p}>
    <path d="M12 22V15M8 15h8M12 15c-4 0-6-3-6-6s2-6 6-6 6 3 6 6-2 6-6 6z" />
  </svg>
);

export const BedIcon = (p: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" {...p}>
    <path d="M2 18v-7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7M2 15h20M6 9V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2" />
  </svg>
);

export const ChefIcon = (p: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" {...p}>
    <path d="M6 17h12M6 13a4 4 0 1 1 3-7 4 4 0 0 1 6 0 4 4 0 1 1 3 7zM7 20h10" />
  </svg>
);

export const FireIcon = (p: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" {...p}>
    <path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 0 2-1 3-2 3-1-2-1-5-3-7-1 2-3 4-3 8 0 5 1 10 5 10z" />
  </svg>
);

export const AcIcon = (p: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" {...p}>
    <path d="M12 3v18M3 12h18M5.64 5.64l12.73 12.73M5.64 18.37L18.37 5.64" />
  </svg>
);

export const WasherIcon = (p: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" {...p}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <circle cx="12" cy="13" r="5" />
    <circle cx="8" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

export const ParkIcon = (p: IconProps) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" {...p}>
    <rect x="3" y="8" width="18" height="12" rx="1" />
    <path d="M7 8V6a5 5 0 0 1 10 0v2M10 13h4" />
  </svg>
);
