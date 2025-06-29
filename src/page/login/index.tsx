import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Container, Typography, Box, Paper } from "@mui/material";
import FormProvider from "@/common/form-provider";
import InputCommon from "@/common/input-common";
import LoadingButtonCommon from "@/common/loading-button";
import { useRouter } from "@/hook";
import { PUBLIC_ROUTER } from "@/router/section";
import { toast } from "sonner";
import cookies from "js-cookie";
import { USER_INFO } from "@/contants/contants";
import authenService from "@/service/auth.service";

interface PayloadLogin {
  phone_number: string;
  password: string;
}

function Login() {
  const schemaLogin = yup.object({
    phone_number: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .matches(
        /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5,8]|9[0-9])[0-9]{7}$/,
        "Số điện thoại không hợp lệ"
      ),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });

  const defaultValues = {
    phone_number: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(schemaLogin),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = methods;

  const router = useRouter();

  const onSubmitForm = async (values: PayloadLogin) => {
    const { phone_number, password } = values;
    const dataLogin = {
      phone_number,
      password,
    };
    try {
      const data = await authenService.onLogin(dataLogin);
      toast.success("Đăng nhập thành công");
      cookies.set(USER_INFO, JSON.stringify(data.data.data.user));
      cookies.set("access_token", data.data.data.access_token);
      window.location.replace(PUBLIC_ROUTER.HOME);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Đã có lỗi xảy ra, vui lòng thử lại sau";
      toast.error(message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ p: 10 }}>
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Đăng nhập tài khoản
      </h2>
      <Paper sx={{ p: 4, borderRadius: 4 }} elevation={2}>
        <FormProvider
          methods={methods}
          onSubmitForm={handleSubmit(onSubmitForm)}
        >
          <Stack spacing={3}>
            <InputCommon
              control={control}
              errors={errors.phone_number}
              name="phone_number"
              label="Số điện thoại"
              type="number"
            />
            <InputCommon
              control={control}
              errors={errors.password}
              name="password"
              type="password"
              label="Mật khẩu"
              inputPassword
            />
            <LoadingButtonCommon
              loading={isSubmitting}
              fullWidth
              title="Đăng nhập"
              type="submit"
              size="large"
            />
          </Stack>
        </FormProvider>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 1,
          }}
        >
          <Typography>Nếu bạn chưa có tài khoản?</Typography>
          <Typography
            onClick={() => router.push(PUBLIC_ROUTER.ACCOUNT.REGISTER)}
            component="button"
            color="error"
            sx={{
              fontWeight: 600,
              cursor: "pointer",
              ":hover": { textDecoration: "underline" },
            }}
          >
            Đăng ký ngay
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
