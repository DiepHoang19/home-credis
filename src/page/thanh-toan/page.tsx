import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
  AlertTitle,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import vi from "dayjs/locale/vi";
import { useMemo, useState } from "react";
import { safeParseJSON } from "@/helpers";
import { useRouter } from "@/hook";
import { GET_LOAN_BY_ID, UPDATE_LOANS } from "@/services/graphql/loans-gql";
import {
  ENUM_STATUS_LOAN,
  ENUM_STATUS_LOAN_DETAIL,
  Loan,
  LoanDetail,
} from "@/services/model/loans";
import { User } from "@/services/model/user";
import {
  OperationVariables,
  ApolloQueryResult,
  useQuery,
  useMutation,
} from "@apollo/client";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CheckIcon } from "lucide-react";
import { GET_LOANS_CONFIGS } from "@/services/graphql/loans-config-gql";
import { LoansConfig } from "@/services/model/loansconfig";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.locale(vi);

interface Debt {
  due_date: string;
  principal: number;
  interest: number;
  total_payment: number;
  opening_balance: number;
  status: 0 | 1;
}

export default function DebtList() {
  const userInfo = safeParseJSON(
    (Cookies.get("user_info") || "") as string
  ) as User;
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const {
    data: dataLoanByID,
    refetch: refetchCurrentLoan,
    loading,
  }: {
    data: { loans: Loan[] };
    refetch: (
      variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
    loading: boolean;
  } = useQuery(GET_LOAN_BY_ID, {
    variables: {
      id: Number(id),
    },
    skip: !Number(id),
  });
  const { data: dataLoanConfigs }: { data: { loans_config: LoansConfig[] } } =
    useQuery(GET_LOANS_CONFIGS);
  const [status, setStatus] = useState(null); // null: chưa thực hiên    1: thành công   0: không thành công

  const [updateLoans] = useMutation(UPDATE_LOANS);
  const today = dayjs();

  const onPay = async (item: LoanDetail) => {
    const newDetail = dataLoanByID?.loans?.[0].detail.map((i) => {
      if (i.due_date === item.due_date) {
        return {
          ...i,
          status: ENUM_STATUS_LOAN_DETAIL.COMFIRM,
          updatedAt: new Date().toISOString(),
        };
      }
      return i;
    });
    try {
      await updateLoans({
        variables: {
          id: dataLoanByID?.loans?.[0].id, // ID khoản vay
          data: {
            detail: newDetail,
          },
        },
      });
      refetchCurrentLoan();
      setStatus(1);
    } catch (error) {
      setStatus(0);
    }
  };

  const renderMessage = () => {
    if (status === 1) {
      return (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          className="mb-1"
        >
          Thanh toán thành công
        </Alert>
      );
    }
    if (status === 0) {
      return (
        <Alert
          icon={<AlertTitle fontSize="inherit" />}
          severity="error"
          className="mb-1"
        >
          Thanh toán thất bại
        </Alert>
      );
    }
  };
  return (
    <Paper className="rounded-xl overflow-hidden mx-5 my-10">
      <Box padding="3px 0px">
        <img src={dataLoanConfigs?.loans_config?.[0]?.url_qr_admin} alt="" />
        <Typography className="text-center">
          Mã QR thanh toán cho hệ thống
        </Typography>
      </Box>
      {renderMessage()}
      <Box className="bg-[#2c3763] text-white px-4 py-2">
        <Typography fontWeight="bold">Danh Sách Khoản Phải Trả</Typography>
      </Box>
      <Table sx={{ overflowX: "auto" }}>
        <TableHead>
          <TableRow>
            <TableCell>Ngày đến hạn</TableCell>
            <TableCell>Gốc</TableCell>
            <TableCell>Lãi</TableCell>
            <TableCell>Tổng tiền phải trả trong kỳ</TableCell>
            {/* <TableCell>Dư nợ đầu kỳ</TableCell> */}
            <TableCell>Trạng thái</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataLoanByID?.loans?.[0]?.detail?.map((item, idx) => {
            const due = dayjs(item.due_date, "DD/MM/YYYY");
            const daysLeft = due.diff(today, "day");

            const canPay =
              item.status === 0 &&
              daysLeft <= 10 &&
              daysLeft >= 0 &&
              dataLoanByID?.loans?.[0]?.status === ENUM_STATUS_LOAN.IN_CONTACT;

            const status_item = item.status || 0;
            const renderButton = () => {
              if (status_item === ENUM_STATUS_LOAN_DETAIL.UNPAID && canPay) {
                return (
                  <Box className="text-red-600 font-semibold">
                    Chưa thanh toán
                  </Box>
                );
              } else if (status_item === ENUM_STATUS_LOAN_DETAIL.COMFIRM) {
                return (
                  <Box className="text-yellow-600 font-semibold">
                    Chờ xác nhận
                  </Box>
                );
              } else if (
                status_item === ENUM_STATUS_LOAN_DETAIL.UNPAID &&
                !canPay
              ) {
                return (
                  <Box className="text-gray-600 font-semibold">
                    Chưa đến ngày thanh toán
                  </Box>
                );
              }
              return (
                <Box className="text-green-600 font-semibold">
                  Đã thanh toán
                </Box>
              );
            };
            return (
              <TableRow key={idx}>
                <TableCell>{item.due_date}</TableCell>
                <TableCell>{item.principal.toLocaleString()}₫</TableCell>
                <TableCell>{item.interest.toLocaleString()}₫</TableCell>
                <TableCell>{item.total_payment.toLocaleString()}₫</TableCell>
                {/* <TableCell>{item.opening_balance.toLocaleString()}₫</TableCell> */}
                <TableCell>{renderButton()}</TableCell>
                <TableCell>
                  {canPay ? (
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => onPay(item)}
                    >
                      Thanh toán ngay
                    </Button>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
