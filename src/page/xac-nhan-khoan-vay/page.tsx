import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Alert
} from "@mui/material";
import dayjs from "dayjs";
import { LOANS_STEPS } from "@/constants";
import { LoansStepper } from "./components/LoansSteps";
import { formatNumber, parseFormattedNumber } from "@/helpers";

const LoanCalculator = () => {
  const MIN_AMOUNT = 30000000;
  const MAX_AMOUNT = 500000000;
  const MIN_TERM = 6;
  const MAX_TERM = 60;
  const INTEREST_RATE = 0.0106; // 1.06%/tháng

  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(6);
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);


  const principalPerMonth = amount / term;

  const getMonthlyDetails = () => {
    const details = [];
    let remaining = amount;
    for (let i = 0; i < term; i++) {
      const interest = remaining * INTEREST_RATE;
      const total = principalPerMonth + interest;
      details.push({
        month: i + 1,
        date: dayjs().add(i + 1, 'month').format("DD/MM/YYYY"),
        remaining,
        principal: principalPerMonth,
        interest,
        total
      });
      remaining -= principalPerMonth;
    }
    return details;
  };

  const format = (num) =>
    new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(num);

  return (
    <Box p={4}>
      <div className="w-full bg-[#e9f2f9] text-center">
            <Typography variant="h4" >
                {LOANS_STEPS[activeStep].label.toUpperCase()}
            </Typography>
      </div>

        <LoansStepper activeStep={activeStep}/>

        <div className="w-full flex justify-center mb-5">
            <div className="w-full md:!w-[600px]">
                <Alert severity="warning">This is a warning Alert.</Alert>
            </div>
        </div>

     <div className="w-full flex justify-center">
      <div className="w-[600px]">
        <Grid container spacing={2} display="flex" justifyContent="space-between">
          <Grid item xs={12}>
            <TextField
              label="Số tiền cần vay"
              fullWidth
              type="text"
              value={formatNumber(amount)}
              onChange={(e) => setAmount(parseFormattedNumber(e.target.value))}
              helperText={`Số tiền cho vay từ ${formatNumber(MIN_AMOUNT)} đến ${formatNumber(MAX_AMOUNT)} VND`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>VND</Typography>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Kỳ hạn vay"
              fullWidth
              select
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              helperText={`Khoản vay từ ${MIN_TERM} đến ${MAX_TERM} tháng`}
              className="w-full"
            >
              {Array.from({ length: MAX_TERM - MIN_TERM + 1 }, (_, i) => i + MIN_TERM).map((val) => (
                <MenuItem key={val} value={val}>{val} tháng</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </div>
    </div>
      <div className="w-full flex justify-center">
        <Box mt={4} border={"1px solid #ddd"} borderRadius={2} p={2} width={600}>
        <Typography variant="h6">Thông tin khoản vay</Typography>
        <Typography mt={4} className="flex justify-between">Số tiền: <span className="font-semibold">{format(amount)} VND</span></Typography>
        <Typography mt={1} className="flex justify-between">Thời hạn vay: <span className="font-semibold">{term} tháng</span></Typography>
        <Typography mt={1} className="flex justify-between">Ngày đăng ký: <span>{dayjs().format("DD/MM/YYYY")}</span></Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>Kết quả:</span>  <Button onClick={() => setOpen(true)}>Chi tiết thanh toán</Button>
        </Box>
        <Typography mt={1} className="flex justify-between">
          Thanh toán kỳ đầu: <span className="font-semibold">{format(principalPerMonth + amount * INTEREST_RATE)} VND</span>
        </Typography>
        <Typography mt={1} className="flex justify-between">Lãi suất ngân hàng: <span>{(INTEREST_RATE * 100).toFixed(2)}%</span></Typography>
        
      </Box>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
  <DialogTitle>Chi tiết thanh toán</DialogTitle>
  <DialogContent sx={{ px: { xs: 1, sm: 3 } }}>
    <Box sx={{ overflowX: 'auto' }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Kỳ</TableCell>
            <TableCell>Ngày trả nợ</TableCell>
            <TableCell>Dư nợ đầu kỳ</TableCell>
            <TableCell>Gốc phải trả</TableCell>
            <TableCell>Lãi phải trả</TableCell>
            <TableCell>Tổng phải trả</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getMonthlyDetails().map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.month}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{format(row.remaining)}</TableCell>
              <TableCell>{format(row.principal)}</TableCell>
              <TableCell>{format(row.interest)}</TableCell>
              <TableCell>{format(row.total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>

    <Box textAlign="right" mt={2}>
      <Button onClick={() => setOpen(false)} variant="outlined" size="small">
        Đóng
      </Button>
    </Box>
  </DialogContent>
</Dialog>


      <Box mt={4}>
        <Button variant="contained" color="primary" size="large">
          TIẾP TỤC
        </Button>
      </Box>
    </Box>
  );
};

export default LoanCalculator;
