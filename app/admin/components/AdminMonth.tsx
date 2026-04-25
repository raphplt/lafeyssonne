"use client";

import { useMemo } from "react";
import {
  MONTHS_FR,
  WEEKDAYS_FR,
  addDays,
  fmtKey,
  parseKey,
} from "../../lib/calendar";

type Reservation = {
  id: number;
  start: string;
  end: string;
  status: "reserved" | "blocked" | "available";
  note: string;
};

type Props = {
  year: number;
  month: number;
  today: Date;
  reservations: Reservation[];
  selStart: Date | null;
  selEnd: Date | null;
  onClick: (d: Date) => void;
};

export function AdminMonth({
  year,
  month,
  today,
  reservations,
  selStart,
  selEnd,
  onClick,
}: Props) {
  const firstDay = new Date(year, month, 1);
  const total = new Date(year, month + 1, 0).getDate();
  const leading = (firstDay.getDay() + 6) % 7;
  const cells: (Date | null)[] = [];
  for (let i = 0; i < leading; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d));

  const bookedSet = useMemo(() => {
    const m = new Map<string, Reservation["status"]>();
    reservations.forEach((r) => {
      let cur = parseKey(r.start);
      const last = parseKey(r.end);
      while (cur <= last) {
        m.set(fmtKey(cur), r.status);
        cur = addDays(cur, 1);
      }
    });
    return m;
  }, [reservations]);

  const selRangeEnd = selEnd || selStart;

  return (
    <div className="admin-month">
      <div className="admin-month-title">
        {MONTHS_FR[month]} {year}
      </div>
      <div className="admin-m-grid">
        {WEEKDAYS_FR.map((w, i) => (
          <div key={`w${i}`} className="admin-wday">
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d)
            return <div key={i} className="admin-mcell admin-mcell-empty" />;
          const status = bookedSet.get(fmtKey(d));
          const isPast = d < today;
          const isToday = fmtKey(d) === fmtKey(today);
          const inSel =
            !!selStart && !!selRangeEnd && d >= selStart && d <= selRangeEnd;
          const cls = [
            "admin-mcell",
            isPast ? "admin-mcell-past" : "",
            isToday ? "admin-mcell-today" : "",
            status === "reserved" ? "admin-mcell-reserved" : "",
            status === "blocked" ? "admin-mcell-blocked" : "",
            inSel ? "admin-mcell-sel" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={i}
              className={cls}
              onClick={() => onClick(d)}
              disabled={isPast}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { Reservation };
