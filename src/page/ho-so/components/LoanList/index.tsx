import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { Add, Visibility } from "@mui/icons-material";
import {
  ENUM_STATUS_LOAN,
  ENUM_STATUS_LOAN_LABEL,
  Loan,
} from "@/services/model/loans";
import { formatNumber } from "@/helpers";
import dayjs from "dayjs";
import { COLOR_STATUS } from "@/contants/contants";
import { useRouter } from "@/hook";

export default function LoanListSection({ list }: { list: Loan[] }) {
  const router = useRouter();
  return (
    <Paper className="shadow-md rounded-xl overflow-hidden">
      {/* Header */}
      <Box className="bg-[#2c3763] text-white flex justify-between items-center px-4 py-3">
        <Typography fontWeight="bold">Danh Sách Khoản Vay</Typography>
        {[ENUM_STATUS_LOAN.DONE, ENUM_STATUS_LOAN.REJECT].includes(
          list?.[0].status
        ) && (
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<Add />}
            className="!normal-case"
          >
            Đăng ký khoản vay mới
          </Button>
        )}
      </Box>

      {/* Table */}
      <Box className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Mã khoản vay",
                "Sản phẩm",
                "Số tiền",
                "Thời hạn",
                "Ngày đăng ký",
                "Trạng thái",
                "Thao tác",
              ].map((head) => (
                <TableCell key={head} className="!font-semibold">
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((loan) => (
              <TableRow>
                <TableCell>{loan?.loan_code || ""}</TableCell>
                <TableCell>Tiền mặt</TableCell>
                <TableCell>{formatNumber(loan?.price || 0)} VND</TableCell>
                <TableCell>{loan?.num_months || 0} tháng</TableCell>
                <TableCell>
                  {dayjs(loan?.updatedAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  <Box
                    className={`${
                      COLOR_STATUS[loan?.status]
                    } px-2 py-1 text-sm rounded`}
                  >
                    {ENUM_STATUS_LOAN_LABEL[loan?.status]}
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Visibility />}
                    sx={{
                      backgroundColor: "#00c4ff",
                      "&:hover": {
                        backgroundColor: "#00afd6",
                      },
                    }}
                    onClick={() =>
                      router.push("/chi-tiet-khoan-vay?id=" + loan.id)
                    }
                  >
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}
