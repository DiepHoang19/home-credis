import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useState } from "react";
import { Lock, History } from "@mui/icons-material";
import { useForm } from "react-hook-form";
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
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useRouter } from "@/hook";
import InputCommon from "@/common/input-common";
import LoadingButtonCommon from "@/common/loading-button";
import { queryVerifyOtpCode } from "@/services/graphql/user-gql";
import authenService from "@/service/auth.service";
import { USER_INFO } from "@/contants/contants";
import { mutationUdpateRemoveOtp } from "@/graphql/mutation";

// 👇 Yup schema
const schema = yup.object({
  otp_code: yup.string().required("Mã otp không được để trống"),
  currentPassword: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type FormValues = {
  currentPassword: string;
  otp_code: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordAndLoginHistory() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const toggleShow = (key: keyof typeof showPassword) =>
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const router = useRouter();

  const [updateRemoveOtp] = useMutation(mutationUdpateRemoveOtp);

  const [queryVerify] = useLazyQuery(queryVerifyOtpCode);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await queryVerify({
        variables: { verify_code: data.otp_code },
      });
      if (response.data?.users?.length === 0) {
        toast.warning("Mã otp không chính xác");
        return;
      }
      const res = await authenService.onChangePassword({
        new_password: data.newPassword,
        old_password: data.currentPassword,
        id: userInfo?.id,
      });

      if (res.status === 200) {
        await updateRemoveOtp({
          variables: { id: userInfo?.id, verify_code: null },
        });
        toast.success(res.data.message);
        Cookies.remove(USER_INFO);
        Cookies.remove("access_token");
        router.push("/dang-nhap");
        router.refresh();
      } else {
        toast.warning(res.data.message);
      }
    } catch (error) {
      toast.warning("Quá trình đổi mật khẩu thất bại");
    }
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
    <Box className="space-y-6 max-w-4xl">
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
          <InputCommon
            name="otp_code"
            errors={errors.otp_code}
            control={control}
            label="Mã Otp"
            type="number"
          />
          <InputCommon
            name="currentPassword"
            errors={errors.currentPassword}
            control={control}
            label="Mật khẩu hiện tại"
            inputPassword
            type="password"
          />
          <InputCommon
            type="password"
            name="newPassword"
            errors={errors.newPassword}
            control={control}
            label="Mật khẩu mới"
            inputPassword
          />
          <InputCommon
            name="confirmPassword"
            errors={errors.confirmPassword}
            control={control}
            label="Xác nhận lại mật khẩu"
            inputPassword
            type="password"
          />

          <LoadingButtonCommon title="Cập nhật mật khẩu" loading={loading} />
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
