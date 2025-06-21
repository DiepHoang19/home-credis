import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4 py-2 h-30 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="mr-4">
            <img
              src="https://www.homecredit.vn/static/2de334676802a591f9444bb556bd334f/f30c4/Microsoft_Teams_image_30_1_1_394b27a905.webp"
              alt="HomeCredit Logo"
              className="h-10"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-4 text-lg font-bold">
            <span className="text-gray-600">Hotline: 1900 633 999</span>
            <span className="text-gray-600">Tin tức</span>
            <span className="text-gray-600">Hỗ trợ</span>
            <span className="text-gray-600">Về chúng tôi</span>
          </div>

          <Button className="bg-[#E11E31] hover:bg-[#c01929] text-white font-bold rounded-full">
            Đăng nhập
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <div className="flex flex-col space-y-3">
            <span className="text-gray-600 py-2 border-b">
              Hotline: 1900 633 999
            </span>
            <span className="text-gray-600 py-2 border-b">Tin tức</span>
            <span className="text-gray-600 py-2 border-b">Hỗ trợ</span>
            <span className="text-gray-600 py-2 border-b">Về chúng tôi</span>

            <Button className="bg-[#E11E31] hover:bg-[#c01929] text-white rounded-full w-full">
              Đăng nhập
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
