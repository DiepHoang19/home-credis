import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import { useRef, useState } from "react";
import dayjs from "dayjs";

export default function StepFive() {
  const [isAgree, setIsAgree] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const sigRef = useRef<SignatureCanvas>(null);

  const handleSubmit = () => {
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

    // Submit logic here
    const signatureImage = sigRef.current?.getTrimmedCanvas().toDataURL("image/png");
    console.log("✅ Submitted with signature:", signatureImage);

    alert("Gửi thành công!");
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
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography fontWeight="bold" mb={2}>
          🖋️ Ký xác nhận khoản vay
        </Typography>

        <Typography color="primary" fontWeight="bold" mb={1}>
          Xác nhận đồng ý với hợp đồng vay
        </Typography>

        <Typography variant="body2" mb={2}>
          Bạn vui lòng đọc kỹ hợp đồng vay và các điều khoản trước khi ký xác nhận.
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
