import ButtonCommon from "@/common/button-common";
import DialogCommon from "@/common/dialog-common";
import NumberInput from "@/common/input-money";
import {
  formatNumber,
  generateCode,
  parseFormattedNumber,
  safeParseJSON,
} from "@/helpers";
import { GET_LOANS_CONFIGS } from "@/services/graphql/loans-config-gql";
import { CREATE_LOANS, GET_LOAN_USER } from "@/services/graphql/loans-gql";
import {
  ENUM_STATUS_LOAN_DETAIL,
  ENUM_STEP_LOAN,
  Loan,
} from "@/services/model/loans";
import { LoansConfig } from "@/services/model/loansconfig";
import { User } from "@/services/model/user";
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
  useQuery,
} from "@apollo/client";
import {
  Alert,
  TextField,
  InputAdornment,
  Typography,
  MenuItem,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

interface Props {
  setActiveStep: (value: number) => void;
  refetchCurrentLoan: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<any>>;
}
export const StepOne = (props: Props) => {
  const { setActiveStep, refetchCurrentLoan } = props;

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState(6);
  const principalPerMonth = amount / term;
  const [message, setMessage] = useState("");
  const [MAX_AMOUNT, setMaxAmount] = useState<number>(0);
  const [MIN_AMOUNT, setMinAmount] = useState<number>(0);
  const [MIN_TERM, setMinTerm] = useState<number>(0);
  const [MAX_TERM, setMaxTerm] = useState<number>(0);

  const [INTEREST_RATE, setInterestRate] = useState<number>(0);

  const { data }: { data: { loans_config: LoansConfig[] } } = useQuery(
    GET_LOANS_CONFIGS,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      onError: (err) => {
        console.error("Lỗi khi lấy cấu hình khoản vay:", err);
        setMessage("Không thể lấy cấu hình khoản vay. Vui lòng thử lại sau.");
      },
    }
  );

  const [createLoans, { data: dataCreateLoans, loading: loadingCreateLoans }] =
    useMutation(CREATE_LOANS);

  const getMonthlyDetails = () => {
    const details = [];
    const roundedPrincipal = Math.ceil(amount / term); // gốc mỗi tháng làm tròn
    let remaining = amount;

    for (let i = 0; i < term; i++) {
      const interest = Math.ceil((remaining * INTEREST_RATE) / 100); // lãi từng tháng
      const total = roundedPrincipal + interest;

      details.push({
        month: i + 1,
        due_date: dayjs()
          .add(i + 1, "month")
          .format("DD/MM/YYYY"),
        opening_balance: remaining,
        principal: roundedPrincipal,
        interest,
        total_payment: total,
        status: ENUM_STATUS_LOAN_DETAIL.UNPAID,
      });

      remaining -= roundedPrincipal;
    }

    return details;
  };

  const format = (num) =>
    new Intl.NumberFormat("vi-VN", { style: "decimal" }).format(num);

  const onSubmit = async () => {
    if (amount < MIN_AMOUNT) {
      setMessage(
        "Số tiền vay tối thiểu là: " + formatNumber(MIN_AMOUNT + "") + " VND"
      );
      return;
    }
    if (amount > MAX_AMOUNT) {
      setMessage(
        "Số tiền vay tối đa là: " + formatNumber(MAX_AMOUNT + "") + " VND"
      );
      return;
    }
    if (term < MIN_TERM) {
      setMessage("Thời gian vay tối thiểu là: " + MIN_TERM + " tháng");
      return;
    }
    if (term > MAX_TERM) {
      setMessage("Thời gian vay tối đa là: " + MAX_TERM + " tháng");
      return;
    }
    setMessage("");

    const userInfo = safeParseJSON(
      (Cookies.get("user_info") || "") as string
    ) as User;
    const inputData = [
      {
        price: amount,
        num_months: term,
        rate: INTEREST_RATE,
        user_id: userInfo.id,
        detail: getMonthlyDetails(),
        step: 0,
        loan_code: generateCode(userInfo.id),
      },
    ];

    try {
      const result = await createLoans({
        variables: {
          data: inputData,
        },
      });
      refetchCurrentLoan();
    } catch (err) {
      console.error("Lỗi khi tạo loan:", err);
    }
    setActiveStep(1);
  };

  useEffect(() => {
    if (data?.loans_config?.length > 0) {
      const config = data?.loans_config[0];
      setMaxAmount(config.max_loan_amount);
      setMinAmount(config.min_loan_amount);
      setMaxTerm(config.max_loan_months);
      setMinTerm(config.min_loan_months);
      setInterestRate(config.interest_rate_fixed);
    }
  }, [data?.loans_config]);

  return (
    <Container>
      <div className="border py-10 px-2 md:px-0">
        {!!message && (
          <div className="w-full flex justify-center mb-5">
            <div className="w-full md:!w-[600px]">
              <Alert severity="warning">{message}</Alert>
            </div>
          </div>
        )}

        <div className="w-full flex justify-center rounded-lg">
          <div className="md:!w-[600px]">
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <TextField
                  fullWidth
                  type="number"
                  label="Số tiền cần vay"
                  value={amount || ""}
                  onChange={(e) => {
                    const raw = e.target.value;
                    const cleaned = raw.replace(/^0+/, "");
                    const numeric = Number(cleaned);
                    setAmount(numeric || 0);
                  }}
                  inputProps={{
                    min: MIN_AMOUNT,
                    max: MAX_AMOUNT,
                  }}
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
                xs: "100%",
                sm: 600,
              },
            }}
          >
            <Typography variant="h6">Thông tin khoản vay</Typography>
            <Typography mt={4} className="flex justify-between">
              Số tiền:{" "}
              <span className="font-semibold">{format(amount as any)} VND</span>
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
                {format(getMonthlyDetails()?.[0]?.total_payment || 0)} VND
              </span>
            </Typography>
            <Typography mt={1} className="flex justify-between">
              Lãi suất ngân hàng: <span>{INTEREST_RATE}%</span>
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
            {/* <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={onSubmit}
            >
              TIẾP TỤC
            </Button> */}
            <ButtonCommon fullWidth onClick={onSubmit}>
              TIẾP TỤC
            </ButtonCommon>
          </Box>
        </div>
      </div>

      <DialogCommon
        open={open}
        onClose={() => setOpen(false)}
        title="Thông tin vay chi tiết"
        closeText="Đóng"
        footerAction
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Kỳ</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Ngày trả nợ</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  Dư nợ đầu kỳ
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  Gốc phải trả
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  Lãi phải trả
                </TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  Tổng phải trả
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getMonthlyDetails().map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {row.month}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {row.due_date}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {format(row.opening_balance)}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {format(row.principal)}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {format(row.interest)}
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {format(row.total_payment)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DialogCommon>
    </Container>
  );
};
