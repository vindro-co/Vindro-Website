import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemBar from "@/components/ProblemBar";
import LiveDemo from "@/components/LiveDemo";
import Capabilities from "@/components/Capabilities";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import WeeklyReports from "@/components/WeeklyReports";
import ROICalculator from "@/components/ROICalculator";
import GrandSlamOffer from "@/components/GrandSlamOffer";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import VoiceWidget from "@/components/VoiceWidget";

/** Structured data so search engines understand the service, area and offer. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vindro",
  description:
    "Done-for-you AI voice receptionists for home service businesses. Every call answered in under a second, 24/7, and booked straight into your calendar.",
  url: "https://vindro.co",
  email: "noel@vindro.co",
  telephone: "+1-437-265-0812",
  areaServed: {
    "@type": "Place",
    name: "Greater Toronto Area, Ontario, Canada",
  },
  serviceType: "AI voice receptionist for home service businesses",
  slogan: "Every call booked. Every job captured. Zero extra staff.",
  offers: {
    "@type": "Offer",
    description:
      "First 30 days free, no setup costs, cancel anytime. Pricing quoted after a 15-minute demo.",
    availability: "https://schema.org/InStock",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <ProblemBar />
        <LiveDemo />
        <HowItWorks />
        <Comparison />
        <WeeklyReports />
        <ROICalculator />
        <GrandSlamOffer />
        <Capabilities />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />

      {/* Mounted at the root, outside <main>, so no animated/transformed
          ancestor can disturb its fixed positioning. See VoiceWidget.tsx. */}
      <VoiceWidget />
    </>
  );
}
