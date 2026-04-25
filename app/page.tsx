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

export default function Home() {
  return (
    <>
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
    </>
  );
}
