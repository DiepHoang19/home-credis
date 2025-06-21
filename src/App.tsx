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
      <AboutSection />
      <ServicesGrid />
      <ThreePoints />
      <HelpSection />
      <AppPromotion />
      <EventsSection />
      <Partners />
      <Careers />
      <Tooltip title="Hỗ trợ trực tuyến">
        <Button
          onClick={() => setOpenChatBox(!openChatBox)}
          variant="contained"
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 999,
            width: 56,
            height: 56,
            borderRadius: "50%",
            minWidth: "unset",
            padding: 0,
          }}
        >
          <ChatOutlinedIcon />
        </Button>
      </Tooltip>

      <ChatBox open={openChatBox} setOpen={setOpenChatBox} />
    </main>
  );
}

export default App;
