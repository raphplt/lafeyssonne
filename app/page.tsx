import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Availability } from "./components/Availability";
import { Contact } from "./components/Contact";
import { Gallery } from "./components/Gallery";
import { Hero } from "./components/Hero";
import { House } from "./components/House";
import { Intro } from "./components/Intro";
import { MobileSticky } from "./components/MobileSticky";
import { ReservationCTA } from "./components/ReservationCTA";
import { RevealMount } from "./components/RevealMount";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Surroundings } from "./components/Surroundings";
import { Testimonials } from "./components/Testimonials";
import { DatesProvider } from "./lib/datesContext";
import {
  SiteDataProvider,
  type BookedRange,
  type PricingRow,
} from "./lib/siteData";

export default async function Home() {
  const supabase = createClient(await cookies());
  const today = new Date().toISOString().slice(0, 10);

  const [pricingRes, reservationsRes] = await Promise.all([
    supabase
      .from("pricing")
      .select("id, period, month_number, price, min_nights, sort_order")
      .order("sort_order", { ascending: true }),
    supabase
      .from("reservations")
      .select("start_date, end_date")
      .gte("end_date", today)
      .in("status", ["reserved", "blocked"]),
  ]);

  const pricing: PricingRow[] = pricingRes.data ?? [];
  const bookedRanges: BookedRange[] = (reservationsRes.data ?? []).map((r) => ({
    start: r.start_date,
    end: r.end_date,
  }));

  return (
    <DatesProvider>
      <SiteDataProvider initial={{ pricing, bookedRanges }}>
        <RevealMount />
        <SiteHeader />
        <main>
          <Hero />
          <Intro />
          <Gallery />
          <House />
          <Availability />
          <ReservationCTA />
          <Surroundings />
          <Testimonials />
          <Contact />
        </main>
        <SiteFooter />
        <MobileSticky />
      </SiteDataProvider>
    </DatesProvider>
  );
}
