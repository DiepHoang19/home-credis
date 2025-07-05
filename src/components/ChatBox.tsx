import React from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";

interface ChatBoxProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function ChatBox({ open, setOpen }: ChatBoxProps) {
  return (
    <>
      {open && (
        <Paper
          elevation={6}
          sx={{
            width: 360,
            height: 500,
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            bottom: 20,
            right: 85,
            borderRadius: 2,
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: "error.main",
              color: "white",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight="bold">
              HomeCRD - hỗ trợ trực tuyến
            </Typography>
            <IconButton
              onClick={() => setOpen(false)}
              size="small"
              sx={{ color: "white" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              backgroundColor: "#f4f6f8",
            }}
          >
            {/* Bot message */}
            <Box display="flex" gap={1} alignItems="flex-start">
              <ChatIcon fontSize="small" color="primary" />
              <Box
                sx={{
                  bgcolor: "#1976d2",
                  color: "white",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "80%",
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                <Typography>
                  HomeCRD rất hân hạnh được phục vụ Quý khách. Hiện tại, Bên em
                  đang có ứng dụng HomeCRD trên điện thoại giúp Quý khách dễ
                  theo dõi giao dịch và thanh toán. Quý khách có thể tải ứng
                  dụng trên App Store hoặc CH Play. Chúc Quý khách một ngày tốt
                  lành!
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Input */}
          <Box p={1} borderTop="1px solid #ccc">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Nhập tin nhắn"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Paper>
      )}
    </>
  );
}
