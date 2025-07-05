import { ENUM_STEP_LOAN, Loan } from "@/services/model/loans";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/services/graphql/user-gql";
import { safeParseJSON } from "@/helpers";
import Cookies from "js-cookie";
import { User } from "@/services/model/user";
import { UPDATE_LOANS } from "@/services/graphql/loans-gql";
import BankSelect from "@/components/bank/SelectBank";

export interface BankForm {
  accountnumber: string;
  accountname: string;
  bankname: string;
}

interface Props {
  currentLoan: Loan;
  setActiveStep: (value: number) => void;
}

// Yup schema
const schema = yup.object({
  accountnumber: yup.string().required("Bắt buộc"),
  // .matches(/^[0-9]{10,20}$/, "Số tài khoản không hợp lệ"),
  accountname: yup.string().required("Bắt buộc"),
  bankname: yup.string().required("Bắt buộc"),
});

const StepFour = ({ currentLoan, setActiveStep }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BankForm>({
    defaultValues: {
      accountnumber: currentLoan?.user?.accountnumber || "",
      accountname: currentLoan?.user?.accountname || "",
      bankname: currentLoan?.user?.bankname || "",
    },
    resolver: yupResolver(schema),
  });
  const [updateUser, { loading }] = useMutation(UPDATE_USER);
  const [updateLoans, { loading: loadingUpdateLoan }] =
    useMutation(UPDATE_LOANS);

  const values = useWatch({ control });

  const maskedAccount = values?.accountnumber
    ? values?.accountnumber.replace(/\d(?=\d{4})/g, "*")
    : "**** **** **** ****";

  const onSubmit = async (data: BankForm) => {
    const userInfo = safeParseJSON(
      (Cookies.get("user_info") || "") as string
    ) as User;
    await Promise.all([
      updateLoans({
        variables: {
          id: currentLoan.id, // ID khoản vay
          data: {
            step: ENUM_STEP_LOAN.FOUR,
          },
        },
      }),
      updateUser({
        variables: {
          id: userInfo.id,
          data,
        },
      }),
    ]);
    setActiveStep(4);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        my: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* Card Preview */}
      <Paper
        sx={{
          background: "linear-gradient(to right, #0053a0, #003d80)",
          borderRadius: 2,
          color: "#fff",
          px: 3,
          py: 4,
          mb: 2,
          textAlign: "left",
          boxShadow: 3,
        }}
      >
        <Typography fontSize={18} fontWeight="bold">
          NGÂN HÀNG
        </Typography>
        <Typography variant="h6" sx={{ letterSpacing: 2, mt: 2 }}>
          {maskedAccount}
        </Typography>
        <Typography
          sx={{ mt: 4, textTransform: "uppercase", fontWeight: "bold" }}
        >
          CHỦ THẺ
        </Typography>
        <Typography variant="subtitle1">
          {values.accountname || "NGUYEN VAN A"}
        </Typography>
        <Typography sx={{ mt: 2 }}>HIỆU LỰC: 12/28</Typography>
      </Paper>

      <Typography
        variant="body2"
        textAlign="center"
        color="text.secondary"
        mb={3}
      >
        Thông tin bạn nhập sẽ hiển thị trên thẻ
      </Typography>

      {/* Section Header */}
      <Typography
        fontWeight="bold"
        color="#0066b3"
        mb={2}
        borderBottom="2px solid #eee"
        pb={1}
      >
        Thông tin tài khoản ngân hàng
      </Typography>

      {/* Alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        Thông tin ngân hàng của bạn được sử dụng để giải ngân khoản vay sau khi
        được duyệt.
      </Alert>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Account Number + Account Name */}
        <Box display="flex" gap={2} mb={2}>
          <Controller
            name="accountnumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Số tài khoản / thẻ ATM *"
                placeholder="Ví dụ: 1903 4567 8901 2345"
                error={!!errors.accountnumber}
                helperText={errors.accountnumber?.message}
              />
            )}
          />
          <Controller
            name="accountname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Tên tài khoản *"
                placeholder="Nhập tên chủ tài khoản"
                error={!!errors.accountname}
                helperText={errors.accountname?.message}
              />
            )}
          />
        </Box>

        {/* Bank Name */}
        <Controller
          name="bankname"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.bankname} sx={{ mb: 3 }}>
              <InputLabel>Ngân hàng *</InputLabel>
              <BankSelect field={field} />
              <Typography variant="caption" color="error">
                {errors.bankname?.message}
              </Typography>
            </FormControl>
          )}
        />

        <Box textAlign="center">
          <Button variant="contained" size="large" type="submit">
            TIẾP TỤC
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default StepFour;
