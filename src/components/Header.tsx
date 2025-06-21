import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { PUBLIC_ROUTER } from "@/router/section";
import { useRouter } from "@/hook";
import ButtonCommon from "@/common/button-common";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthen } from "@/hook/useAuthen";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import DropdownMenuMock from "./ProfileDropdown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const userInfo = useAuthen();

  const handleNavigate = () => {
    router.push(PUBLIC_ROUTER.ACCOUNT.LOGIN);
    setIsMenuOpen(false);
  };

  const [openProfile, setOpenProfile] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4 py-2 h-30 flex justify-between items-center">
        <div className="flex items-center">
          <Link to={PUBLIC_ROUTER.HOME} className="mr-4">
            <img
              src="https://www.homecredit.vn/static/2de334676802a591f9444bb556bd334f/f30c4/Microsoft_Teams_image_30_1_1_394b27a905.webp"
              alt="HomeCredit Logo"
              className="h-10"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex items-center space-x-4"
          onMouseLeave={() => setOpenProfile(false)}
        >
          <div className="flex items-center space-x-4 text-lg font-bold">
            <a
              href="tel:1900633999"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Hotline: 1900 633 999
            </a>
            <span className="text-gray-600">Tin tức</span>
            <span className="text-gray-600">Hỗ trợ</span>
            <span className="text-gray-600">Về chúng tôi</span>
          </div>

          {userInfo ? (
            <>
              <Stack spacing={1} alignItems="center" direction="row">
                <AccountCircleIcon sx={{ fontSize: 40 }} />
                <Typography>{userInfo.phone_number}</Typography>
                <IconButton onMouseEnter={() => setOpenProfile(true)}>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Stack>
              {openProfile && <DropdownMenuMock />}
            </>
          ) : (
            <ButtonCommon
              onClick={handleNavigate}
              color="error"
              sx={{ borderRadius: 10 }}
            >
              Đăng nhập
            </ButtonCommon>
          )}
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
            <a
              href="tel:1900633999"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Hotline: 1900 633 999
            </a>
            <span className="text-gray-600 py-2 border-b">Tin tức</span>
            <span className="text-gray-600 py-2 border-b">Hỗ trợ</span>
            <span className="text-gray-600 py-2 border-b">Về chúng tôi</span>

            <Button
              onClick={handleNavigate}
              className="bg-[#E11E31] hover:bg-[#c01929] text-white rounded-full w-full"
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
