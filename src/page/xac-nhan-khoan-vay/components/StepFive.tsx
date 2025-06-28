import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { ENUM_STEP_LOAN, Loan } from "@/services/model/loans";
import { dataURLtoBlob, formatNumber } from "@/helpers";
import uploadServices from "@/services/upload.service";
import { UPDATE_LOANS } from "@/services/graphql/loans-gql";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
interface Props {
  currentLoan: Loan;
}

const Row = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <Box display="flex" justifyContent="space-between" py={0.75}>
    <Typography fontWeight={500}>{label}</Typography>
    <Typography
      fontWeight={highlight ? "bold" : 400}
      color={highlight ? "primary" : "text.primary"}
    >
      {value}
    </Typography>
  </Box>
);

const LoanDetailSection = ({ currentLoan }: Props) => {
  return (
    <Paper elevation={1} sx={{ p: 3, mb: 2, borderRadius: 1 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Chi tiết khoản vay của bạn
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Row label="Mã khoản vay:" value={currentLoan.loan_code} highlight />
      <Row label="Khoản vay:" value="Tiền mặt" />
      <Row label="Số tiền vay:" value={formatNumber(currentLoan.price)} />
      <Row label="Thời hạn vay:" value={`${currentLoan.num_months} tháng`} />
      <Row label="Lãi suất tháng:" value={`${currentLoan.rate}%/ tháng`} />
      <Row
        label="Ngày đăng ký:"
        value={dayjs(currentLoan.createdAt).format("DD/MM/YYYY")}
      />
      <Row
        label="Giới tính:"
        value={!!currentLoan.user?.gender ? "Nam" : "Nữ"}
      />
    </Paper>
  );
};

export default function StepFive({ currentLoan }: Props) {
  const [isAgree, setIsAgree] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const sigRef = useRef<SignatureCanvas>(null);
  const [updateLoans, { data, loading }] = useMutation(UPDATE_LOANS);
  const router = useNavigate();
  const handleSubmit = async () => {
    setIsSubmitted(true);
    setError("");

    const isSigned = !sigRef.current?.isEmpty();

    if (!isAgree) {
      setError("Vui lòng xác nhận bạn đã đọc và đồng ý.");
      return;
    }

    if (!isSigned) {
      setError("Vui lòng ký tên của bạn ở bên cạnh để xác nhận.");
      return;
    }

    const signatureImage = sigRef.current
      // ?.getTrimmedCanvas()
      .toDataURL("image/png");
    const formData = new FormData();
    formData.append("image", dataURLtoBlob(signatureImage));
    formData.append("upload_preset", "ml_default");

    const res = await uploadServices.uploadImage(formData);

    const signature = res.data.imageUrl;
    if (!!signature) {
      await updateLoans({
        variables: {
          id: currentLoan.id, // ID khoản vay
          data: {
            updatedAt: new Date().toISOString(),
            signature,
            step: ENUM_STEP_LOAN.DONE,
          },
        },
      });
      router("/chi-tiet-khoan-vay?id=" + currentLoan.id);
    }
  };

  const handleClear = () => {
    sigRef.current?.clear();
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 4,
        p: 2,
      }}
    >
      <LoanDetailSection currentLoan={currentLoan} />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography fontWeight="bold" mb={2}>
          🖋️ Ký xác nhận khoản vay
        </Typography>

        <Typography color="primary" fontWeight="bold" mb={1}>
          Xác nhận đồng ý với hợp đồng vay
        </Typography>

        <Typography variant="body2" mb={2}>
          Bạn vui lòng đọc kỹ hợp đồng vay và các điều khoản trước khi ký xác
          nhận.
        </Typography>

        <Box display="flex" alignItems="start" gap={3} flexWrap="wrap">
          {/* Checkbox */}
          <Box flex={1} minWidth={260}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAgree}
                  onChange={(e) => setIsAgree(e.target.checked)}
                />
              }
              label={
                <Typography variant="body2">
                  Tôi đã đọc, hiểu và đồng ý với các điều khoản hợp đồng vay
                </Typography>
              }
            />
            {isSubmitted && !isAgree && (
              <Typography color="error" variant="caption">
                {error}
              </Typography>
            )}
          </Box>

          {/* Signature box */}
          <Box
            flex={1}
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 1,
              width: 300,
              height: 150,
              position: "relative",
              p: 1,
            }}
          >
            <SignatureCanvas
              penColor="black"
              canvasProps={{
                width: 280,
                height: 130,
                className: "sigCanvas",
              }}
              ref={sigRef}
            />
            {!sigRef.current?.isEmpty() && (
              <Button
                size="small"
                variant="outlined"
                onClick={handleClear}
                sx={{ position: "absolute", bottom: 8, left: 8 }}
              >
                Xoá chữ ký
              </Button>
            )}
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                fontSize: "12px",
              }}
            >
              Ngày ký: {dayjs().format("DD/MM/YYYY")}
            </Typography>
          </Box>
        </Box>

        {isSubmitted && sigRef.current?.isEmpty() && (
          <Typography color="error" mt={1} variant="caption">
            {error}
          </Typography>
        )}

        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            size="large"
          >
            XÁC NHẬN KHOẢN VAY
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
