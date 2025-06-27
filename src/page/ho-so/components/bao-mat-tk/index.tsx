import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff, Lock, History } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { safeParseJSON } from "@/helpers";
import Cookies from "js-cookie";
import { User } from "@/services/model/user";
import { GET_LOGIN_LOG } from "@/services/graphql/login-log-gql";
import { LoginLog } from "@/services/model/login-log";
import {
  OperationVariables,
  ApolloQueryResult,
  useQuery,
} from "@apollo/client";
import dayjs from "dayjs";
import { changePassword } from "@/services/auth";

// 👇 Yup schema
const schema = yup.object({
  currentPassword: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordAndLoginHistory() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggleShow = (key: keyof typeof showPassword) =>
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const userInfo = safeParseJSON(
    (Cookies.get("user_info") || "") as string
  ) as User;

  const {
    data: dataLoginLog,
  }: {
    data: { login_logs: LoginLog[] };
    refetch: (
      variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
    loading: boolean;
  } = useQuery(GET_LOGIN_LOG, {
    variables: {
      user_id: userInfo?.id,
    },
    skip: !userInfo?.id,
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Submit password change: ", data);
    const rs = await changePassword({
      new_password: data.newPassword,
      old_password: data.currentPassword,
      id: userInfo?.id,
    });

    // if(rs.)
  };

  function getDeviceAndBrowserInfo(userAgent: string) {
    let browser = "Unknown";
    let os = "Unknown";

    // Detect OS
    if (/Windows NT/.test(userAgent)) {
      os = "Windows";
    } else if (/Macintosh/.test(userAgent)) {
      os = "Mac OS";
    } else if (/iPhone/.test(userAgent)) {
      os = "iOS";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (/Linux/.test(userAgent)) {
      os = "Linux";
    }

    // Detect Browser
    if (/Chrome\/\d+/.test(userAgent) && /Safari\/\d+/.test(userAgent)) {
      browser = "Chrome";
    } else if (/Safari\/\d+/.test(userAgent) && !/Chrome/.test(userAgent)) {
      browser = "Safari";
    } else if (/Firefox\/\d+/.test(userAgent)) {
      browser = "Firefox";
    } else if (/Edg\/\d+/.test(userAgent)) {
      browser = "Edge";
    } else if (/OPR\/\d+/.test(userAgent)) {
      browser = "Opera";
    }

    return `${browser} trên ${os}`;
  }

  return (
    <Box className="space-y-6">
      {/* Đổi mật khẩu */}
      <Paper className=" !rounded-[10px] overflow-hidden">
        <Box className="bg-[#2c3763] text-white px-4 py-2 flex items-center gap-2">
          <Lock fontSize="small" />
          <Typography fontWeight="bold">Đổi Mật Khẩu</Typography>
        </Box>
        <Box
          className="p-4 space-y-4"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Mật khẩu hiện tại"
                type={showPassword.current ? "text" : "password"}
                required
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => toggleShow("current")}>
                        {showPassword.current ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Mật khẩu mới"
                type={showPassword.new ? "text" : "password"}
                required
                error={!!errors.newPassword}
                helperText={
                  errors.newPassword?.message ||
                  "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => toggleShow("new")}>
                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Xác nhận mật khẩu mới"
                type={showPassword.confirm ? "text" : "password"}
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => toggleShow("confirm")}>
                        {showPassword.confirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ mt: 2, textTransform: "none", fontWeight: "bold" }}
          >
            Cập nhật mật khẩu
          </Button>
        </Box>
      </Paper>

      {/* Lịch sử đăng nhập */}
      <Paper className=" !rounded-[10px] overflow-hidden">
        <Box className="bg-[#2c3763] text-white px-4 py-2 flex items-center gap-2">
          <History fontSize="small" />
          <Typography fontWeight="bold">Lịch Sử Đăng Nhập</Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-bold text-sm">Thời gian</TableCell>
              <TableCell className="font-bold text-sm">Địa chỉ IP</TableCell>
              <TableCell className="font-bold text-sm">Thiết bị</TableCell>
              <TableCell className="font-bold text-sm">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataLoginLog?.login_logs?.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  {dayjs(row?.created_at).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>{row?.ip_public}</TableCell>
                <TableCell>{getDeviceAndBrowserInfo(row?.browser)} </TableCell>
                <TableCell>
                  <Box
                    className={`inline-block bg-green-100 ${
                      row?.status === 1 ? "text-green-800" : "text-red-800"
                    } text-xs font-semibold px-2 py-1 rounded`}
                  >
                    {row.status === 1 ? "Thành công" : "Thất bại"}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
