import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { EmojiPeople, CorporateFare } from "@mui/icons-material";
import { useState } from "react";
import DialogCommon from "@/common/dialog-common";
import Cookies from "js-cookie";
import { USER_INFO } from "@/contants/contants";
import { useRouter } from "@/hook";

const menuItems = [
  {
    label: "Thông tin cá nhân",
    icon: <CorporateFare />,
    key: "ho-so",
    link: "/ho-so",
  },
  { label: "Đăng xuất", icon: <EmojiPeople />, key: "logout" },
];

export default function DropdownMenuMock() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove(USER_INFO);
    Cookies.remove("access_token");
    router.push("/dang-nhap");
    setOpenModal(false);
  };

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          width: 260,
          borderRadius: 3,
          py: 1,
          px: 0.5,
          position: "absolute",
          top: "80px",
          right: "100px",
          zIndex: 1300,
        }}
      >
        <List>
          {menuItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <ListItemButton
                key={index}
                onClick={() => {
                  if (item.key === "logout") {
                    setOpenModal(true);
                  }
                  setActiveIndex(index);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  // bgcolor: isActive ? "#fceeee" : "transparent",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                  },
                }}
              >
                {/* <ListItemIcon
                  sx={{
                    color: isActive ? "error.main" : "grey.700",
                    minWidth: 32,
                  }}
                >
                  {item.icon}
                </ListItemIcon> */}
                <ListItemText
                  primary={
                    <Typography fontWeight="bold" color="text.primary">
                      {item.label}
                    </Typography>
                  }
                  onClick={() => !!item.link && router.push(item.link)}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
      <DialogCommon
        title="Thông báo đăng xuất tài khoản"
        content="Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"
        open={openModal}
        footerAction
        closeText="Đóng"
        submitText="Đăng xuất"
        color="ERROR"
        onSubmit={onLogout}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}
