import React from "react";
import HeroCarousel from "./components/HeroCarousel";
import ProductServices from "./components/ProductServices";
import AboutSection from "./components/AboutSection";
import ServicesGrid from "./components/ServicesGrid";
import ThreePoints from "./components/ThreePoints";
import HelpSection from "./components/HelpSection";
import EventsSection from "./components/EventsSection";
import Partners from "./components/Partners";
import Careers from "./components/Careers";
import LoanCalculator from "./components/loans/SectionLoans";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://api-auction.site/uploads/images/background-173b99034a8eb0e44bdb113920a4ddf4-1751142371348.webp")',
        backgroundSize: "cover",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeroCarousel />
      <ProductServices />
      <LoanCalculator />
      <AboutSection />
      <ServicesGrid />
      <ThreePoints />
      <HelpSection />
      <EventsSection />
      <Partners />
      <Careers />
    </main>
  );
}

export default App;
