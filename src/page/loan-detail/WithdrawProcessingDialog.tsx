import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import DialogCommon from "@/common/dialog-common";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Loan } from "@/services/model/loans";
import { formatNumber } from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import { setIsShow } from "@/redux/slices/toggleBoxChat";

const WithdrawProcessingDialog = ({
  open,
  setOpen,
  loan,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  loan: Loan;
}) => {
  const isShow = useSelector((state: any) => state.toggleBoxChat.isShow);
  const dispatch = useDispatch();

  return (
    <DialogCommon
      open={open}
      onClose={() => setOpen(false)}
      title=""
      footerAction
      submitText="Ấn vào đây để liên hệ CSKH"
      onSubmit={() => dispatch(setIsShow(true))}
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
