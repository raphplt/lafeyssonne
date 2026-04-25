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

async function fetchSiteData(): Promise<{
  pricing: PricingRow[];
  bookedRanges: BookedRange[];
}> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  ) {
    return { pricing: [], bookedRanges: [] };
  }

  try {
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

    return {
      pricing: pricingRes.data ?? [],
      bookedRanges: (reservationsRes.data ?? []).map((r) => ({
        start: r.start_date,
        end: r.end_date,
      })),
    };
  } catch (err) {
    console.error("[page] Supabase fetch failed:", err);
    return { pricing: [], bookedRanges: [] };
  }
}

export default async function Home() {
  const { pricing, bookedRanges } = await fetchSiteData();

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
