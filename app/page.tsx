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
import FAQ, { FAQS } from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import VoiceWidget from "@/components/VoiceWidget";
import { EMAIL, SITE_URL } from "@/lib/site";

const DESCRIPTION =
  "Done-for-you AI voice receptionists for home service businesses. Every call answered in under a second, 24/7, and booked straight into your calendar.";

/**
 * Structured data. A @graph so the business, the service and the FAQ are
 * separate linked nodes — Google reads the FAQ node for rich results.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "Vindro",
      description: DESCRIPTION,
      url: SITE_URL,
      email: EMAIL,
      image: `${SITE_URL}/og.png`,
      logo: `${SITE_URL}/logo.png`,
      priceRange: "$$",
      slogan: "Every call booked. Every job captured. Zero extra staff.",
      areaServed: {
        "@type": "Place",
        name: "Greater Toronto Area, Ontario, Canada",
      },
      address: {
        "@type": "PostalAddress",
        addressRegion: "ON",
        addressCountry: "CA",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: EMAIL,
        areaServed: "CA",
        availableLanguage: ["en"],
      },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/#service`,
      name: "AI voice receptionist for home service businesses",
      serviceType: "AI voice receptionist",
      provider: { "@id": `${SITE_URL}/#business` },
      areaServed: {
        "@type": "Place",
        name: "Greater Toronto Area, Ontario, Canada",
      },
      description: DESCRIPTION,
      offers: {
        "@type": "Offer",
        description:
          "First 30 days free, no setup costs, cancel anytime. Pricing quoted after a 15-minute demo.",
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: "0",
          priceCurrency: "CAD",
          description: "Free for the first 30 days, then quoted by call volume.",
        },
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
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
