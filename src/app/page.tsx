import { SiteFooter } from "@/components/chrome/site-footer";
import { SiteHeader } from "@/components/chrome/site-header";
import { About } from "@/components/sections/about";
import { Academics } from "@/components/sections/academics";
import { Admissions } from "@/components/sections/admissions";
import { Boarding } from "@/components/sections/boarding";
import { CampusStats } from "@/components/sections/campus-stats";
import { Hero } from "@/components/sections/hero";
import { Personalities } from "@/components/sections/personalities";
import { Proof } from "@/components/sections/proof";
import { Rankings } from "@/components/sections/rankings";
import { Sports } from "@/components/sections/sports";
import { Testimonials } from "@/components/sections/testimonials";

/** Re-rendered once a day so the footer's copyright year never goes stale. */
export const revalidate = 86400;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Academics />
        <Boarding />
        <Sports />
        <CampusStats />
        <Rankings />
        <Personalities />
        <Proof />
        <Testimonials />
        <Admissions />
      </main>
      <SiteFooter />
    </>
  );
}
