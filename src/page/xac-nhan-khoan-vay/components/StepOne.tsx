import DialogCommon from "@/common/dialog-common"
import { formatNumber, parseFormattedNumber } from "@/helpers"
import { Alert, TextField, InputAdornment, Typography, MenuItem, Button, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import dayjs from "dayjs"
import { useState } from "react"

interface Props {
    setActiveStep: (value: number) => void,
}
export const StepOne = (props: Props) =>{
    const {setActiveStep, } = props
      const MIN_AMOUNT = 30000000;
  const MAX_AMOUNT = 500000000;
  const MIN_TERM = 6;
  const MAX_TERM = 60;
  const INTEREST_RATE = 0.0106; // 1.06%/tháng
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(6);
  const principalPerMonth = amount / term;
    const [message, setMessage] = useState("");
  
    const getMonthlyDetails = () => {
      const details = [];
      let remaining = amount;
      for (let i = 0; i < term; i++) {
        const interest = remaining * INTEREST_RATE;
        const total = principalPerMonth + interest;
        details.push({
          month: i + 1,
          date: dayjs()
            .add(i + 1, "month")
            .format("DD/MM/YYYY"),
          remaining,
          principal: principalPerMonth,
          interest,
          total,
        });
        remaining -= principalPerMonth;
      }
      return details;
    };
  
    const format = (num) =>
      new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(num);
  
    const onSubmit = () => {
        if( amount < MIN_AMOUNT){
            setMessage("Số tiền vay tối thiểu là: "+formatNumber(MIN_AMOUNT+"")+" VND")
            return
        }
        if( amount > MAX_AMOUNT){
            setMessage("Số tiền vay tối đa là: " +formatNumber(MAX_AMOUNT+"")+" VND")
            return
        }
        if( term < MIN_TERM){
            setMessage("Thời gian vay tối thiểu là: "+MIN_TERM+" tháng")
            return
        }
        if( term > MAX_TERM){
            setMessage("Thời gian vay tối đa là: " +MAX_TERM +" tháng")
            return
        }
        setMessage("")
        setActiveStep(1)

    }
return(
    <>
    <div className="md:w-[70vw] border py-10 px-2 md:px-0">
        {!!message && <div className="w-full flex justify-center mb-5">
          <div className="w-full md:!w-[600px]">
            <Alert severity="warning">{message}</Alert>
          </div>
        </div>}

        <div className="w-full flex justify-center">
          <div className="md:!w-[600px]">
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <TextField
                  label="Số tiền cần vay"
                  fullWidth
                  type="text"
                  value={formatNumber(amount)}
                  onChange={(e) =>
                    setAmount(parseFormattedNumber(e.target.value))
                  }
                  helperText={`Số tiền cho vay từ ${formatNumber(
                    MIN_AMOUNT
                  )} đến ${formatNumber(MAX_AMOUNT)} VND`}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                          }}
                        >
                          VND
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box>
                <TextField
                  label="Kỳ hạn vay"
                  fullWidth
                  select
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  helperText={`Khoản vay từ ${MIN_TERM} đến ${MAX_TERM} tháng`}
                >
                  {Array.from(
                    { length: MAX_TERM - MIN_TERM + 1 },
                    (_, i) => i + MIN_TERM
                  ).map((val) => (
                    <MenuItem key={val} value={val}>
                      {val} tháng
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Box
            mt={4}
            border={"1px solid #ddd"}
            borderRadius={2}
            p={2}
             sx={{
              width: {
                xs: "100%", // mobile
                sm: 600, // từ breakpoint "sm" (≥600px) trở lên
              },
            }}
          >
            <Typography variant="h6">Thông tin khoản vay</Typography>
            <Typography mt={4} className="flex justify-between">
              Số tiền:{" "}
              <span className="font-semibold">{format(amount as  any)} VND</span>
            </Typography>
            <Typography mt={1} className="flex justify-between">
              Thời hạn vay: <span className="font-semibold">{term} tháng</span>
            </Typography>
            <Typography mt={1} className="flex justify-between">
              Ngày đăng ký: <span>{dayjs().format("DD/MM/YYYY")}</span>
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <span>Kết quả:</span>{" "}
              <Button onClick={() => setOpen(true)}>Chi tiết thanh toán</Button>
            </Box>
            <Typography mt={1} className="flex justify-between">
              Thanh toán kỳ đầu:{" "}
              <span className="font-semibold">
                {format(principalPerMonth + amount * INTEREST_RATE)} VND
              </span>
            </Typography>
            <Typography mt={1} className="flex justify-between">
              Lãi suất ngân hàng:{" "}
              <span>{(INTEREST_RATE * 100).toFixed(2)}%</span>
            </Typography>
          </Box>
        </div>

        <div className="w-full flex justify-center">
          <Box
            mt={4}
            sx={{
              width: {
                xs: "100%", // mobile
                sm: 600, // từ breakpoint "sm" (≥600px) trở lên
              },
            }}
          >
            <Button variant="contained" color="primary" size="large" fullWidth onClick={onSubmit}>
              TIẾP TỤC
            </Button>
          </Box>
        </div>
      </div>

       <DialogCommon
        open={open}
        onClose={() => setOpen(false)}
        title="Thông tin vay chi tiết"
        closeText="Đóng"
        footerAction
      >
        <Box sx={{ overflowX: "auto" }}>
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
      </DialogCommon>
    </>
)
}