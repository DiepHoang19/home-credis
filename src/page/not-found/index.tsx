import { useEffect, useState } from "react";
import "./not-found.css";
import { Link } from "react-router-dom";
import { PUBLIC_ROUTER } from "@/router/section";

function NotFound() {
  const [stars, setStars] = useState([]);

  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 4,
      direction: Math.random() > 0.5 ? "topLeft" : "topRight",
    }));
  };

  useEffect(() => {
    setStars(generateStars(30));

    const interval = setInterval(() => {
      setStars((prev) => [...prev.slice(-20), ...generateStars(10)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex items-center justify-center">
      <div className="absolute inset-0 bg-space"></div>

      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute ${
              star.direction === "topLeft"
                ? "animate-fall-topLeft"
                : "animate-fall-topRight"
            }`}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          >
            <div className="h-full w-full rounded-full bg-white opacity-80" />
          </div>
        ))}
      </div>

      <div className="ufo">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8794272-p5k6GdbD8O2RIat5GWtUGJGkDgXoxf.png"
          alt="UFO"
          width={300}
          height={150}
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-2 text-7xl font-bold text-white">404</h1>
        <p className="mb-8 text-xl text-white">
          Oops! Trang bạn tìm kiếm không tồn tại
        </p>
        <Link
          to={PUBLIC_ROUTER.HOME}
          className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}
export default NotFound;
