import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Slider,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(15000000);
  const [duration, setDuration] = useState(11);

  const calculateMonthlyPayment = () => {
    const interestRate = 0.02; // lãi suất giả định 2%/tháng
    const monthly = (loanAmount * (1 + interestRate * duration)) / duration;
    return monthly.toFixed(0);
  };

  return (
    <Box sx={{ backgroundColor: "#f4fafc", p: 4 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={5}>
          <img
            src="/your-image-path.png" // thay bằng đường dẫn ảnh bạn upload
            alt="family"
            style={{ width: "100%", borderRadius: 12 }}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
            NHU CẦU CỦA BẠN
          </Typography>

          {/* Loan Amount */}
          <Typography gutterBottom>Số tiền bạn cần:</Typography>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => setLoanAmount((prev) => Math.max(1000000, prev - 1000000))}>
              <RemoveIcon />
            </IconButton>
            <TextField
              value={loanAmount.toLocaleString("vi-VN") + " VND"}
              InputProps={{ readOnly: true }}
              variant="outlined"
              fullWidth
              size="small"
            />
            <IconButton onClick={() => setLoanAmount((prev) => prev + 1000000)}>
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
            <IconButton onClick={() => setDuration((prev) => Math.max(1, prev - 1))}>
              <RemoveIcon />
            </IconButton>
            <TextField
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
          <Typography align="center" variant="h5" color="error" fontWeight="bold">
            {parseInt(calculateMonthlyPayment()).toLocaleString("vi-VN")} VND
          </Typography>
          <Typography fontSize={12} color="gray" align="center">
            Số tiền thực tế có thể thay đổi tùy vào từng trường hợp và/hoặc gói vay cụ thể.
          </Typography>

          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" color="error" size="large">
              Tôi muốn vay ngay
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoanCalculator;
