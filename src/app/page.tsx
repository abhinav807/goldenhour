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
import Timeline from "@/components/Timeline";
import Prizes from "@/components/Prizes";
import BackToTop from "@/components/BackToTop";

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
        <Timeline />
        <Countdown />
        <Dispatch />
        <Rules />
        <Organizers />
        <Prizes />
        <Marquee reverse speed={45} bg="bg-black" borderColor="border-sunset" />
        <Sponsors />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
      <MobileCTA />
      <BackToTop />
    </>
  );
}
