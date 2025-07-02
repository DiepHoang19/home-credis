import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import DialogCommon from "@/common/dialog-common";
import WarningAmberIcon from "@mui/icons-material/WarningAmber"; // hoặc bạn dùng svg icon OTP bên trên
import { Loan } from "@/services/model/loans";
import { formatNumber } from "@/helpers";

const WithdrawProcessingDialog = ({
  open,
  setOpen,
  loan,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  loan: Loan;
}) => {
  const handleContact = () => {
    // Chuyển sang trang CSKH hoặc mở chat hỗ trợ
    window.open("/ho-so?type=3", "_blank");
  };

  return (
    <DialogCommon
      open={open}
      onClose={() => setOpen(false)}
      title=""
      footerAction
      submitText="Ấn vào đây để liên hệ CSKH"
      onSubmit={handleContact}
      closeText="Đóng"
    >
      <Box textAlign="center" py={2}>
        <WarningAmberIcon sx={{ fontSize: 48, color: "#f0ad4e", mb: 2 }} />

        <Typography>
          Giao dịch rút tiền với số tiền{" "}
          <Typography component="span" fontWeight="bold" color="error">
            {formatNumber(loan?.price || 0)} VNĐ
          </Typography>{" "}
          đang được xử lý
        </Typography>

        <Typography mt={2} color="text.secondary">
          Liên hệ CSKH trực tuyến để được hỗ trợ
        </Typography>
      </Box>
    </DialogCommon>
  );
};

export default WithdrawProcessingDialog;
