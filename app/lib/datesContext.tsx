"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type DatesCtx = {
  checkIn: Date | null;
  checkOut: Date | null;
  setCheckIn: (d: Date | null) => void;
  setCheckOut: (d: Date | null) => void;
};

const DatesContext = createContext<DatesCtx | null>(null);

export function DatesProvider({ children }: { children: ReactNode }) {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  return (
    <DatesContext.Provider value={{ checkIn, checkOut, setCheckIn, setCheckOut }}>
      {children}
    </DatesContext.Provider>
  );
}

export function useDates(): DatesCtx {
  const ctx = useContext(DatesContext);
  if (!ctx) throw new Error("useDates must be used within DatesProvider");
  return ctx;
}
