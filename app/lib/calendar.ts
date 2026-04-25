export const MONTHS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const WEEKDAYS_FR = ["L", "M", "M", "J", "V", "S", "D"];

export type BookedRange = { start: string; end: string; label: string };

export const BOOKED_RANGES: BookedRange[] = [
  { start: "2026-05-10", end: "2026-05-17", label: "Famille R." },
  { start: "2026-06-05", end: "2026-06-14", label: "Couple M." },
  { start: "2026-07-11", end: "2026-07-25", label: "Famille G." },
  { start: "2026-08-01", end: "2026-08-15", label: "Famille D." },
  { start: "2026-08-22", end: "2026-08-29", label: "Couple L." },
  { start: "2026-09-12", end: "2026-09-19", label: "Famille B." },
];

export type PricingEntry = { price: number; min: number; label: string };

export const PRICING: Record<number, PricingEntry> = {
  4: { price: 220, min: 7, label: "Avril" },
  5: { price: 220, min: 7, label: "Mai" },
  6: { price: 250, min: 7, label: "Juin" },
  7: { price: 350, min: 10, label: "Juillet" },
  8: { price: 350, min: 10, label: "Août" },
  9: { price: 220, min: 7, label: "Septembre" },
  10: { price: 220, min: 7, label: "Octobre" },
};

export function fmtKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function parseKey(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

export function startOfMonth(y: number, m: number): Date {
  return new Date(y, m, 1);
}

export function daysInMonth(y: number, m: number): number {
  return new Date(y, m + 1, 0).getDate();
}

// Sunday = 6 (week starts on Monday)
export function mondayIndex(day: number): number {
  return (day + 6) % 7;
}

export function buildBookedSet(ranges: BookedRange[]): Set<string> {
  const s = new Set<string>();
  ranges.forEach(({ start, end }) => {
    let cur = parseKey(start);
    const last = parseKey(end);
    while (cur <= last) {
      s.add(fmtKey(cur));
      cur = addDays(cur, 1);
    }
  });
  return s;
}
