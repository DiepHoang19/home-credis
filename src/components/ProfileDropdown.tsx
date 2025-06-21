import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import {
  Business,
  Group,
  EmojiPeople,
  Phone,
  Groups,
  Work,
  CorporateFare,
} from "@mui/icons-material";
import { useState } from "react";

const menuItems = [
  { label: "Home Credit Việt Nam", icon: <CorporateFare /> },
  { label: "Tập đoàn Home Credit", icon: <Business />, active: true },
  { label: "Phát triển bền vững", icon: <EmojiPeople /> },
  { label: "Quan hệ Nhà Đầu Tư", icon: <Group /> },
  { label: "Liên hệ", icon: <Phone /> },
  { label: "Đối tác", icon: <Groups /> },
  { label: "Cơ hội việc làm", icon: <Work /> },
];

export default function DropdownMenuMock() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
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
              onClick={() => setActiveIndex(index)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                bgcolor: isActive ? "#fceeee" : "transparent",
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "error.main" : "grey.700",
                  minWidth: 32,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    fontWeight={isActive ? "bold" : "normal"}
                    color={isActive ? "error.main" : "text.primary"}
                  >
                    {item.label}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}
