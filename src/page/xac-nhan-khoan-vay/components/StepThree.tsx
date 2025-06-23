import { formatNumber, safeParseJSON } from "@/helpers";
import { Loan } from "@/services/model/loans";
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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { UPDATE_USER } from "@/services/graphql/user-gql";
import { UPDATE_LOANS } from "@/services/graphql/loans-gql";
import { useMutation } from "@apollo/client";
import { User } from "@/services/model/user";
import Cookies from "js-cookie";

interface Props {
  currentLoan: Loan;
  setActiveStep: (value: number) => void;
}

interface StepThreeForm {
  fullname: string;
  cccd: string;
  phone: string;
  dob: Date | null;
  gender: string;
  job: string;
  income: number;
  purpose: string;
  address: string;
  relativePhone1: string;
  relativeRelation1: string;
  relativePhone2: string;
  relativeRelation2: string;
}

const schema = yup.object().shape({
  fullname: yup.string().required("Họ và tên không được để trống"),
  cccd: yup
    .string()
    .matches(/^\d{9,12}$/, "CCCD không hợp lệ")
    .required("CCCD không được để trống"),
  phone: yup
    .string()
    .matches(/^(0|\+84)\d{9}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được để trống"),
  dob: yup
    .date()
    .typeError("Ngày sinh không hợp lệ")
    .required("Ngày sinh không được để trống"),
  gender: yup.string().required("Giới tính không được để trống"),
  job: yup.string().required("Nghề nghiệp không được để trống"),
  income: yup.number().required("Thu nhập không được để trống"),
  purpose: yup.string().required("Mục đích vay không được để trống"),
  address: yup.string().required("Địa chỉ không được để trống"),
  relativePhone1: yup
    .string()
    .matches(/^(0|\+84)\d{9}$/, "SĐT người thân không hợp lệ")
    .required("SDT người thân không được để trống"),
  relativeRelation1: yup.string().required("Mối quan hệ không được để trống"),
  relativePhone2: yup.string().notRequired(),
  relativeRelation2: yup.string().notRequired(),
});

export default function StepThree({ currentLoan, setActiveStep }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StepThreeForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: currentLoan.user?.full_name || "",
      cccd: currentLoan.user?.identity_number || "",
      phone: currentLoan?.user?.phone_number || "",
      dob: currentLoan?.user?.date_of_birth
        ? dayjs(currentLoan?.user?.date_of_birth).toDate()
        : null,
      gender: currentLoan?.user?.gender ? "male" : "female",
      job: currentLoan?.user?.job || "",
      income: currentLoan?.user?.income || 0,
      purpose: "",
      address: currentLoan?.user?.address || "",
      relativePhone1: currentLoan?.user?.relatives?.[0]?.phone || "",
      relativeRelation1: currentLoan?.user?.relatives?.[0]?.relationship || "",
      relativePhone2: currentLoan?.user?.relatives?.[1]?.phone || "",
      relativeRelation2: currentLoan?.user?.relatives?.[1]?.relationship || "",
    },
  });

  const [updateLoans, { loading: loadingUpdateLoan }] =
    useMutation(UPDATE_LOANS);
  const [updateUser, { loading }] = useMutation(UPDATE_USER);
  const userInfo = safeParseJSON(
    (Cookies.get("user_info") || "") as string
  ) as User;

  const allowedit = !currentLoan.user?.full_name;
  const onSubmit = async (data: StepThreeForm) => {
    const relatives = [
      {
        phone: data.relativePhone1,
        relationship: data.relativeRelation1,
      },
      {
        phone: data.relativePhone2,
        relationship: data.relativeRelation2,
      },
    ];
    const dataUpdateUser = {
      full_name: data.fullname || "",
      identity_number: data.cccd || "",
      phone_number: data.phone || "",
      date_of_birth: data.dob,
      gender: data.gender === "male",
      job: data.job || "",
      income: data.income || 0,
      address: data.address || "",
      relatives,
    };
    await updateLoans({
      variables: {
        id: currentLoan.id, // ID khoản vay
        data: {
          purpose: data.purpose,
          step: 2,
        },
      },
    });

    if (allowedit) {
      updateUser({
        variables: {
          id: userInfo.id,
          data: dataUpdateUser,
        },
      });
    }

    setActiveStep(3);
  };

  const renderError = (message?: string) =>
    message ? (
      <Typography color="error" fontSize={12}>
        {message}
      </Typography>
    ) : null;

  return (
    <Box
      sx={{
        display: "block",
        width: "700px",
        mx: "auto",
        my: 4,
        p: 3,
        backgroundColor: "#fff",
      }}
    >
      <Paper
        elevation={1}
        sx={{ p: 2, mb: 3, borderLeft: "4px solid #0066b3" }}
      >
        <Typography fontWeight="bold" mb={1} color="#0066b3">
          Thông tin khoản vay đã chọn
        </Typography>
        <div className="flex justify-between ">
          <div className="w-[250px]">
            <Typography variant="body2" className="flex justify-between">
              Sản phẩm: <strong>Tiền mặt</strong>
            </Typography>
            <Typography variant="body2" className="flex justify-between">
              Số tiền vay:{" "}
              <strong>{formatNumber(currentLoan?.price || 0)} VND</strong>
            </Typography>
          </div>
          <div className="w-[250px]">
            <Typography variant="body2" className="flex justify-between">
              Thời hạn vay:{" "}
              <strong>{currentLoan?.num_months || 0} tháng</strong>
            </Typography>
            <Typography variant="body2" className="flex justify-between">
              Mã khoản vay: <strong>{currentLoan?.loan_code || ""}</strong>
            </Typography>
          </div>
        </div>
      </Paper>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Thông tin cơ bản */}
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography
            fontWeight="bold"
            mb={3}
            color="#0066b3"
            borderBottom="1px solid #DEE2E6"
            pb={2}
          >
            Thông tin cơ bản
          </Typography>
          <Box display="flex" gap={2} mb={2}>
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Họ và tên*"
                  error={!!errors.fullname}
                  helperText={errors.fullname?.message}
                />
              )}
              disabled={!allowedit}
            />
            <Controller
              name="cccd"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Số CMND / CCCD*"
                  error={!!errors.cccd}
                  helperText={errors.cccd?.message}
                />
              )}
              disabled={!allowedit}
            />
          </Box>
          <Box display="flex" gap={2} mb={2}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Điện thoại di động*"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
              disabled={!allowedit}
            />
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Ngày sinh*"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? dayjs(date).toDate() : "")
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.dob,
                        helperText: errors.dob?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
              disabled={!allowedit}
            />
          </Box>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel>Giới tính</InputLabel>
                <Select {...field} label="Giới tính*">
                  <MenuItem value="male">Nam</MenuItem>
                  <MenuItem value="female">Nữ</MenuItem>
                </Select>
                {renderError(errors.gender?.message)}
              </FormControl>
            )}
            disabled={!allowedit}
          />
        </Paper>

        {/* Thông tin nghề nghiệp */}
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography
            fontWeight="bold"
            mb={3}
            color="#0066b3"
            borderBottom="1px solid #DEE2E6"
            pb={2}
          >
            Thông tin nghề nghiệp
          </Typography>
          <Box display="flex" gap={2} mb={2}>
            <Controller
              name="job"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Nghề nghiệp*"
                  error={!!errors.job}
                  helperText={errors.job?.message}
                />
              )}
              disabled={!allowedit}
            />
            <Controller
              name="income"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Khoản thu nhập*"
                  error={!!errors.income}
                  helperText={errors.income?.message}
                />
              )}
              disabled={!allowedit}
            />
          </Box>
          <Box display="flex" gap={2}>
            <Controller
              name="purpose"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mục đích vay*"
                  error={!!errors.purpose}
                  helperText={errors.purpose?.message}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Địa chỉ*"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
              disabled={!allowedit}
            />
          </Box>
        </Paper>

        {/* Thông tin người thân */}
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography
            fontWeight="bold"
            mb={3}
            color="#0066b3"
            borderBottom="1px solid #DEE2E6"
            pb={2}
          >
            Thông tin người thân
          </Typography>
          <Box display="flex" gap={2} mb={2}>
            <Controller
              name="relativePhone1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="SDT người thân 1*"
                  error={!!errors.relativePhone1}
                  helperText={errors.relativePhone1?.message}
                />
              )}
              disabled={!allowedit}
            />
            <Controller
              name="relativeRelation1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mối quan hệ người thân 1*"
                  error={!!errors.relativeRelation1}
                  helperText={errors.relativeRelation1?.message}
                />
              )}
            />
          </Box>
          <Box display="flex" gap={2}>
            <Controller
              name="relativePhone2"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="SDT người thân 2" />
              )}
            />
            <Controller
              name="relativeRelation2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Mối quan hệ người thân 2"
                />
              )}
            />
          </Box>
        </Paper>

        <Box textAlign="center" mt={4}>
          <Button variant="contained" size="large" type="submit">
            HOÀN TẤT ĐĂNG KÝ VAY
          </Button>
        </Box>
      </form>
    </Box>
  );
}
