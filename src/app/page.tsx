import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Events from "@/components/Events";
import Countdown from "@/components/Countdown";
import Rules from "@/components/Rules";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CursorFollower from "@/components/CursorFollower";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <CursorFollower />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Events />
        <Countdown />
        <Rules />
        <Marquee reverse speed={45} bg="bg-black" borderColor="border-sunset" />
        <Sponsors />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
