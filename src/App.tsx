import React, { useState } from "react";
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
import { Button, Tooltip } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ChatBox from "./components/ChatBox";
import LoanCalculator from "./components/loans/SectionLoans";

function App() {
  const [openChatBox, setOpenChatBox] = useState(false);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://www.homecredit.vn/static/background-173b99034a8eb0e44bdb113920a4ddf4.webp")',
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
      <AppPromotion />
      <EventsSection />
      <Partners />
      <Careers />
    </main>
  );
}

export default App;
