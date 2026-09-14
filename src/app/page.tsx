import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Events from "@/components/Events";
import Countdown from "@/components/Countdown";
import Rules from "@/components/Rules";
import Organizers from "@/components/Organizers";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CursorFollower from "@/components/CursorFollower";
import MobileCTA from "@/components/MobileCTA";
import Dispatch from "@/components/Dispatch";
import Organizers from "@/components/Organizers";

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
        <Dispatch />
        <Rules />
        <Organizers />
        <Marquee reverse speed={45} bg="bg-black" borderColor="border-sunset" />
        <Sponsors />
        <Organizers />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
