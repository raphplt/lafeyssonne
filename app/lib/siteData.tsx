"use client";

import { createContext, useContext, type ReactNode } from "react";

export type PricingRow = {
  id: string;
  period: string;
  month_number: number | null;
  price: number;
  min_nights: number;
  sort_order: number;
};

export type BookedRange = {
  start: string;
  end: string;
};

export type SiteData = {
  pricing: PricingRow[];
  bookedRanges: BookedRange[];
};

const Ctx = createContext<SiteData | null>(null);

export function SiteDataProvider({
  initial,
  children,
}: {
  initial: SiteData;
  children: ReactNode;
}) {
  return <Ctx.Provider value={initial}>{children}</Ctx.Provider>;
}

export function useSiteData(): SiteData {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSiteData must be used within SiteDataProvider");
  return v;
}

export function buildPricingByMonth(
  pricing: PricingRow[],
): Record<number, PricingRow> {
  const map: Record<number, PricingRow> = {};
  for (const row of pricing) {
    if (row.month_number != null) map[row.month_number] = row;
  }
  return map;
}
