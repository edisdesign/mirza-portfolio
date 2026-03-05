import { Hero } from "../components/Hero";
import { Works } from "../components/Works";
import { About } from "../components/About";
import { ProcessSection } from "../components/ProcessSection";
import { Marquee } from "../components/Marquee";
import { Exhibitions } from "../components/Exhibitions";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { AtelierSection } from "../components/AtelierSection";
import { usePageTitle } from "../hooks/usePageTitle";
import { TragoviBanner } from "../components/TragoviBanner";

export function HomePage() {
  usePageTitle();
  return (
    <>
      <Hero />
      <Marquee />
      <Works limit={6} />
      <About />
      <AtelierSection />
      <ProcessSection />
      <TragoviBanner />
      <Marquee />
      <Exhibitions />
      <Contact />
      <Footer />
    </>
  );
}