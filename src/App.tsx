import HeroCarousel from "./components/HeroCarousel";
import ProductServices from "./components/ProductServices";
import AboutSection from "./components/AboutSection";
import AppPromotion from "./components/AppPromotion";
import ServicesGrid from "./components/ServicesGrid";
import ThreePoints from "./components/ThreePoints";
import HelpSection from "./components/HelpSection";
import EventsSection from "./components/EventsSection";
import Partners from "./components/Partners";
import Careers from "./components/Careers";

function App() {
  return (
    <main>
      <HeroCarousel />
      <ProductServices />
      <AboutSection />
      <ServicesGrid />
      <ThreePoints />
      <HelpSection />
      <AppPromotion />
      <EventsSection />
      <Partners />
      <Careers />
    </main>
  );
}

export default App;
