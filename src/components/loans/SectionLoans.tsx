import React, { useEffect, useState } from "react";
import {
  Box,
  // Grid,
  Typography,
  Slider,
  TextField,
  IconButton,
  Container,
  Paper,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ButtonCommon from "@/common/button-common";
import { useRouter } from "@/hook";
import { useLocation } from "react-router-dom";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(15000000);
  const [duration, setDuration] = useState(11);

  const calculateMonthlyPayment = () => {
    const interestRate = 0.02; // lãi suất giả định 2%/tháng
    const monthly = (loanAmount * (1 + interestRate * duration)) / duration;
    return monthly.toFixed(0);
  };

  const router = useRouter();

  return (
    <Container maxWidth="xl" sx={{ p: 4 }}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Nhu cầu của bạn
      </h2>
      <Paper sx={{ p: 4, borderRadius: 4 }} elevation={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {/* Cột trái: Ảnh */}
          <Box sx={{ flex: 1 }}>
            <img
              src="https://www.hdsaison.com.vn/vnt_upload/File/Image/imgfrm.jpg"
              alt="family"
              style={{ width: "100%", borderRadius: 12 }}
            />
          </Box>

          {/* Cột phải: Form */}
          <Box sx={{ flex: 1 }}>
            {/* Loan Amount */}
            <Typography gutterBottom>Số tiền bạn cần:</Typography>
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={() =>
                  setLoanAmount((prev) => Math.max(1000000, prev - 1000000))
                }
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                value={loanAmount.toLocaleString("vi-VN") + " VND"}
                InputProps={{ readOnly: true }}
                variant="outlined"
                fullWidth
                size="small"
              />
              <IconButton
                onClick={() => setLoanAmount((prev) => prev + 1000000)}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Slider
              value={loanAmount}
              onChange={(e, val) => setLoanAmount(val as number)}
              step={1000000}
              min={1000000}
              max={50000000}
              sx={{ mt: 2 }}
            />
            {/* Duration */}

            <Typography gutterBottom sx={{ mt: 3 }}>
              Thời hạn bạn trả:
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={() => setDuration((prev) => Math.max(1, prev - 1))}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                onCopy={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
                value={`${duration} tháng`}
                InputProps={{ readOnly: true }}
                variant="outlined"
                fullWidth
                size="small"
              />
              <IconButton onClick={() => setDuration((prev) => prev + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Slider
              value={duration}
              onChange={(e, val) => setDuration(val as number)}
              step={1}
              min={1}
              max={24}
              sx={{ mt: 2 }}
            />
            {/* Monthly payment */}
            <Typography align="center" sx={{ mt: 4, mb: 1 }}>
              Số tiền bạn trả mỗi tháng
            </Typography>
            <Typography
              align="center"
              variant="h5"
              color="error"
              fontWeight="bold"
            >
              {parseInt(calculateMonthlyPayment()).toLocaleString("vi-VN")} VND
            </Typography>
            <Typography
              id="vay-tien"
              component="div"
              fontSize={12}
              color="gray"
              align="center"
            >
              Số tiền thực tế có thể thay đổi tùy vào từng trường hợp và/hoặc
              gói vay cụ thể.
            </Typography>
            <Box display="flex" justifyContent="center" mt={3}>
              <ButtonCommon
                onClick={() => router.push("/xac-nhan-khoan-vay")}
                variant="outlined"
                title="Tôi muốn vay ngay"
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoanCalculator;
