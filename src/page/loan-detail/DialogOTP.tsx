import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import DialogCommon from "@/common/dialog-common";

const OTPDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    // Giả lập xử lý OTP
    setTimeout(() => {
      console.log("OTP đã nhập:", otp);
      setIsLoading(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <>
      <DialogCommon
        open={open}
        onClose={() => setOpen(false)}
        title="Xin giải ngân"
        footerAction
        submitText="Xác nhận OTP"
        closeText="Huỷ"
        isLoading={isLoading}
        onSubmit={handleSubmit}
      >
        <Box>
          <TextField
            fullWidth
            label="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            inputProps={{ maxLength: 6 }}
          />
        </Box>
      </DialogCommon>
    </>
  );
};

export default OTPDialog;
