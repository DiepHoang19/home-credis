import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import DialogCommon from "@/common/dialog-common";
import { useLazyQuery, useMutation } from "@apollo/client";
import { COMFIRM_OTP_LOAN } from "@/services/graphql/user-gql";
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
  const [comfirmOTP] = useLazyQuery(COMFIRM_OTP_LOAN);
  const [updateLoans, { data, loading }] = useMutation(UPDATE_LOANS);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data } = await comfirmOTP({
        variables: {
          otp, // Mã OTP nhập vào
          id: loanID,
        },
      });

      if (!!data?.loans?.[0]?.id) {
        await updateLoans({
          variables: {
            id: loanID, // ID khoản vay
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
        toast.error("Mã OTP không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.");
      }
      // Xử lý khi thành công
    } catch (error) {
      console.error("Lỗi xác nhận OTP:", error);
      // Có thể hiện lỗi ở đây nếu muốn
    } finally {
      setIsLoading(false);
    }
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
        <Box sx={{ padding: 2 }}>
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
