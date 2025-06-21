import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image:
      "https://www.homecredit.vn/static/b22fc1561a5821fa6745e558a104d838/0f57a/Web_banner_desktop_7a8bb72a4e.webp",
    title: "Vươn hơn. Tiện lợi hơn. Bảo mật hơn.",
    buttonText: "Tìm hiểu thêm",
  },
  {
    id: 2,
    image:
      "https://www.homecredit.vn/static/c7304e29bfc68cc53910dbb5086fafc4/7bb03/web_banner_desktop_4_265dca3494.webp",
    title: "Vươn hơn. Tiện lợi hơn. Bảo mật hơn.",
    buttonText: "Tìm hiểu thêm",
  },
  {
    id: 3,
    image:
      "https://www.homecredit.vn/static/71f1b39ec94290fe2465ddf5e35cb80f/0f57a/web_banner_desktop_payment_cc412ca321.webp",
    title: "Vươn hơn. Tiện lợi hơn. Bảo mật hơn.",
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
              alt={slide.title}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                {slide.title}
              </h2>
              <Button className="bg-[#E11E31] hover:bg-[#c01929] text-white rounded-full">
                {slide.buttonText}
              </Button>
            </div>
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
