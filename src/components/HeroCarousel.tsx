import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://api-auction.site/uploads/images/02E771BE-5B7F-4CCE-B7AA-3BACAE16258D-1751141787872.png",
    buttonText: "Tìm hiểu thêm",
  },
  {
    id: 2,
    image:
      "https://api-auction.site/uploads/images/web_banner_desktop_6_960ccea116-1751141787873.webp",
    buttonText: "Tìm hiểu thêm",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative">
            <img
              src={slide.image}
              alt={slide.image}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 rounded-full p-2"
        onClick={prevSlide}
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 rounded-full p-2"
        onClick={nextSlide}
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
