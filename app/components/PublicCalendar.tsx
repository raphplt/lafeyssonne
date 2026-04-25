"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MONTHS_FR,
  WEEKDAYS_FR,
  addDays,
  buildBookedSet,
  daysInMonth,
  fmtKey,
  mondayIndex,
  startOfMonth,
} from "../lib/calendar";
import type { BookedRange } from "../lib/siteData";
import { ChevronLeftIcon, ChevronRightIcon } from "./Icons";

type Props = {
  checkIn: Date | null;
  checkOut: Date | null;
  setCheckIn: (d: Date | null) => void;
  setCheckOut: (d: Date | null) => void;
  bookedRanges: BookedRange[];
};

export function PublicCalendar({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  bookedRanges,
}: Props) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const [anchor, setAnchor] = useState(() => new Date(2026, 4, 1));
  const bookedSet = useMemo(() => buildBookedSet(bookedRanges), [bookedRanges]);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  function isBooked(d: Date) {
    return bookedSet.has(fmtKey(d));
  }

  function clickDay(d: Date) {
    if (isBooked(d) || d < today) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(d);
      setCheckOut(null);
      return;
    }
    if (d <= checkIn) {
      setCheckIn(d);
      return;
    }
    let cur = addDays(checkIn, 1);
    while (cur <= d) {
      if (isBooked(cur)) {
        setCheckIn(d);
        setCheckOut(null);
        return;
      }
      cur = addDays(cur, 1);
    }
    setCheckOut(d);
  }

  function prev() {
    setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1));
  }
  function next() {
    setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1));
  }

  const months = isMobile
    ? [anchor]
    : [anchor, new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1)];

  return (
    <div className="pc-root">
      <div className="pc-header">
        <div className="pc-legend">
          <span>
            <span className="pc-dot pc-dot-avail" /> Disponible
          </span>
          <span>
            <span className="pc-dot pc-dot-booked" /> Réservé
          </span>
          <span>
            <span className="pc-dot pc-dot-selected" /> Votre séjour
          </span>
        </div>
        <div className="pc-nav">
          <button className="pc-nav-btn" onClick={prev} aria-label="Mois précédent">
            <ChevronLeftIcon />
          </button>
          <button className="pc-nav-btn" onClick={next} aria-label="Mois suivant">
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="pc-months">
        {months.map((m, i) => (
          <MonthGrid
            key={i}
            year={m.getFullYear()}
            month={m.getMonth()}
            today={today}
            bookedSet={bookedSet}
            checkIn={checkIn}
            checkOut={checkOut}
            hoverDate={hoverDate}
            onHover={setHoverDate}
            onClick={clickDay}
          />
        ))}
      </div>
    </div>
  );
}

type MonthProps = {
  year: number;
  month: number;
  today: Date;
  bookedSet: Set<string>;
  checkIn: Date | null;
  checkOut: Date | null;
  hoverDate: Date | null;
  onHover: (d: Date | null) => void;
  onClick: (d: Date) => void;
};

function MonthGrid({
  year,
  month,
  today,
  bookedSet,
  checkIn,
  checkOut,
  hoverDate,
  onHover,
  onClick,
}: MonthProps) {
  const firstDay = startOfMonth(year, month);
  const total = daysInMonth(year, month);
  const leading = mondayIndex(firstDay.getDay());
  const cells: (Date | null)[] = [];

  for (let i = 0; i < leading; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d));

  const rangeEnd = checkOut || hoverDate;

  function cellState(d: Date | null): string {
    if (!d) return "empty";
    if (d < today) return "past";
    if (bookedSet.has(fmtKey(d))) return "booked";
    const isToday = fmtKey(d) === fmtKey(today);
    if (checkIn && fmtKey(d) === fmtKey(checkIn)) return isToday ? "selected today" : "selected";
    if (checkOut && fmtKey(d) === fmtKey(checkOut)) return isToday ? "selected today" : "selected";
    if (checkIn && rangeEnd && d > checkIn && d < rangeEnd)
      return isToday ? "in-range today" : "in-range";
    return isToday ? "available today" : "available";
  }

  return (
    <div className="pc-month">
      <div className="pc-month-title serif">
        {MONTHS_FR[month]} <span style={{ opacity: 0.5 }}>{year}</span>
      </div>
      <div className="pc-grid">
        {WEEKDAYS_FR.map((w, i) => (
          <div key={`w${i}`} className="pc-wday">
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          const state = cellState(d);
          const baseState = state.split(" ")[0];
          const classes = [
            "pc-cell",
            `pc-${baseState}`,
            state.includes("today") ? "pc-today" : "",
            state.includes("in-range") ? "pc-in-range" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <button
              key={i}
              className={classes}
              disabled={!d || state === "past" || state === "booked"}
              onMouseEnter={() => d && onHover(d)}
              onMouseLeave={() => onHover(null)}
              onClick={() => d && onClick(d)}
              aria-label={d ? d.toLocaleDateString("fr-FR") : ""}
            >
              {d ? d.getDate() : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
