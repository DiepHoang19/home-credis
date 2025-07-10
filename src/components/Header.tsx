import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DollarSign, HomeIcon, Menu, Package, X } from "lucide-react";
import { setIsShow } from "@/redux/slices/toggleBoxChat";
import { Link } from "react-router-dom";
import { PUBLIC_ROUTER } from "@/router/section";
import { useRouter } from "@/hook";
import ButtonCommon from "@/common/button-common";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthen } from "@/hook/useAuthen";
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DropdownMenuMock from "./ProfileDropdown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDispatch } from "react-redux";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userInfo = useAuthen();

  const handleNavigate = () => {
    router.push(PUBLIC_ROUTER.ACCOUNT.LOGIN);
    setIsMenuOpen(false);
  };
  const router = useRouter();
  const pathname = router.pathname;
  const [openProfile, setOpenProfile] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (pathname === PUBLIC_ROUTER.HOME) setValue(0);
    else if (pathname === PUBLIC_ROUTER.LOANS) setValue(1);
    else if (pathname === PUBLIC_ROUTER.THANH_TOAN) setValue(2);
    else if (pathname === PUBLIC_ROUTER.PROFILE) setValue(3);
    else setValue(null);
  }, [JSON.stringify(pathname)]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push(PUBLIC_ROUTER.HOME);
        break;
      case 1:
        router.push(PUBLIC_ROUTER.LOANS);
        break;
      case 2:
        router.push(PUBLIC_ROUTER.THANH_TOAN);
        break;
      case 3:
        router.push(PUBLIC_ROUTER.PROFILE);
        break;
    }
  };

  const scrollToNews = () => {
    document.getElementById("news")?.scrollIntoView();
  };

  const dispatch = useDispatch();
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4 py-2 h-30 md:flex justify-between items-center hidden">
        <div className="flex items-center">
          <Link to={PUBLIC_ROUTER.HOME} className="mr-4">
            <img
              src="http://api-auction.site/uploads/images/logo-v2-removebg-preview-1751857685183.png"
              alt="Logo"
              className="h-24"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex items-center select-none space-x-4"
          onMouseLeave={() => setOpenProfile(false)}
        >
          <div className="flex items-center space-x-4 text-lg font-bold">
            <a
              href="tel:19007115"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Hotline: 1900 7115
            </a>
            <span
              onClick={scrollToNews}
              className="text-gray-600 cursor-pointer"
            >
              Tin tức
            </span>
            <span
              className="text-gray-600 cursor-pointer"
              onClick={() => dispatch(setIsShow(true))}
            >
              Hỗ trợ
            </span>
            <span
              className="text-gray-600 cursor-pointer"
              onClick={() => router.push("/ho-so?type=5")}
            >
              Thông báo
            </span>
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

      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: "white",
          padding: "5px 0px",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        className="md:hidden"
      >
        <BottomNavigation value={value} onChange={handleChange} showLabels>
          <BottomNavigationAction label="Trang chủ" icon={<HomeIcon />} />
          <BottomNavigationAction label="Khoản vay" icon={<DollarSign />} />
          <BottomNavigationAction label="Thanh toán" icon={<Package />} />
          <BottomNavigationAction
            label="Cá nhân"
            icon={<AccountCircleIcon />}
          />
        </BottomNavigation>
      </Paper>

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
            <span
              className="text-gray-600 py-2 border-b"
              onClick={scrollToNews}
            >
              Tin tức
            </span>
            <span
              className="text-gray-600 py-2 border-b"
              onClick={() => dispatch(setIsShow(true))}
            >
              Hỗ trợ
            </span>
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
