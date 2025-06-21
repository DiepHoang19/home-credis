import { useState } from 'react';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import ProductServices from './components/ProductServices';
import AboutSection from './components/AboutSection';
import AppPromotion from './components/AppPromotion';
import ServicesGrid from './components/ServicesGrid';
import ThreePoints from './components/ThreePoints';
import HelpSection from './components/HelpSection';
import EventsSection from './components/EventsSection';
import Partners from './components/Partners';
import Careers from './components/Careers';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white font-lexend">
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;