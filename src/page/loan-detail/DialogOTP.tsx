import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import DialogCommon from "@/common/dialog-common";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import {
  COMFIRM_OTP_LOAN,
  mutationUpdateTimeOtpLog,
} from "@/services/graphql/user-gql";
import { toast } from "sonner";
import { UPDATE_LOANS } from "@/services/graphql/loans-gql";
import { ENUM_STATUS_LOAN } from "@/services/model/loans";

const OTPDialog = ({
  open,
  setOpen,
  loanID,
  setOpenComfirmDialogOTP,
  refetchCurrentLoan,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  loanID: number;
  setOpenComfirmDialogOTP: (value: boolean) => void;
  refetchCurrentLoan: () => void;
}) => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSubscription(COMFIRM_OTP_LOAN, {
    variables: {
      id: loanID,
    },
    fetchPolicy: "network-only",
  });
  const [updateLoans] = useMutation(UPDATE_LOANS);
  const [updateOtpLog] = useMutation(mutationUpdateTimeOtpLog);

  const handleSubmit = async () => {
    console.log("run submit");
    setIsLoading(true);
    try {
      if (data?.otp_logs?.length > 0 && otp === data.otp_logs?.[0]?.otpcode) {
        await updateOtpLog({
          variables: {
            loan_id: loanID,
          },
        });
        await updateLoans({
          variables: {
            id: loanID,
            data: {
              status: ENUM_STATUS_LOAN.IN_CONTACT,
            },
          },
        });
        setOpenComfirmDialogOTP(true);
        setOpen(false);
        refetchCurrentLoan();
        toast.success("Xác nhận OTP thành công! Vui lòng chờ giải ngân.");
      } else {
        setOpen(false);
        toast.warning(
          "Mã OTP không hợp lệ hoặc đã hết hạn. Vui lòng thử lại sau."
        );
      }
    } catch (error) {
      console.error("Lỗi xác nhận OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogCommon
      open={open}
      onClose={() => setOpen(false)}
      title="Xin giải ngân"
      footerAction
      submitText="Xác nhận OTP"
      closeText="Đóng"
      isLoading={isLoading}
      onSubmit={handleSubmit}
      fullWidth
      maxWidth="sm"
    >
      <Box p={2}>
        <TextField
          fullWidth
          label="Nhập mã OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          inputProps={{ maxLength: 6 }}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
        />
      </Box>
    </DialogCommon>
  );
};

export default OTPDialog;
