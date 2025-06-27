import {
  Box,
  Typography,
  Paper,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
} from "@mui/material";
import { useState } from "react";

export default function AccountHistorySection() {
  const [filter, setFilter] = useState("all");

  return (
    <Box className="space-y-6">
      {/* Lịch sử biến động tài khoản */}
      <Paper className=" !rounded-[10px] overflow-hidden ">
        <Box className="bg-[#2c3763] text-white px-4 py-2 flex justify-between items-center">
          <Typography fontWeight="bold">Lịch sử biến động tài khoản</Typography>
          <Select
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              minWidth: 160,
              height: 32,
              fontSize: 14,
            }}
          >
            <MenuItem value="all">Tất cả giao dịch</MenuItem>
            <MenuItem value="in">Giao dịch vào</MenuItem>
            <MenuItem value="out">Giao dịch ra</MenuItem>
          </Select>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-sm">Mã GD</TableCell>
              <TableCell className="font-bold text-sm">
                Ngày giao dịch
              </TableCell>
              <TableCell className="font-bold text-sm">Số tiền</TableCell>
              <TableCell className="font-bold text-sm">Loại</TableCell>
              <TableCell className="font-bold text-sm">Ghi chú</TableCell>
              <TableCell className="font-bold text-sm">
                Người thực hiện
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography align="center" fontSize={14}>
                  Không có giao dịch nào
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      {/* Lịch thanh toán sắp tới */}
      <Paper className="rounded-xl overflow-hidden">
        <Box className="bg-[#2c3763] text-white px-4 py-2">
          <Typography fontWeight="bold">Lịch thanh toán sắp tới</Typography>
        </Box>
        <Box p={2}>
          <Alert severity="info" className="bg-[#d4f1fa] text-[#0c5460]">
            Bạn chưa có khoản thanh toán nào sắp tới.
          </Alert>
        </Box>
      </Paper>
    </Box>
  );
}
