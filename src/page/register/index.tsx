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
import authenService from "@/service/auth.service";

interface PayloadRegister {
  phone_number: string;
  password: string;
}

function Register() {
  const router = useRouter();
  const schemaLogin = yup.object({
    phone_number: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .matches(/^[0-9+]{0,11}$/, "Số điện thoại không hợp lệ"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirm_password: yup
      .string()
      .required("Vui lòng nhập mật khẩu")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
  });

  const defaultValues = {
    phone_number: "",
    password: "",
    confirm_password: "",
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

  const onSubmitForm = async (values: PayloadRegister) => {
    const { phone_number, password } = values;
    const dataRegister = {
      phone_number,
      password,
    };
    try {
      await authenService.onRegister(dataRegister);
      toast.success("Đăng ký tài khoản thành công");
      router.push(PUBLIC_ROUTER.ACCOUNT.LOGIN);
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
        Đăng ký tài khoản
      </h2>
      <Paper sx={{ p: 4, borderRadius: 4 }} elevation={3}>
        <FormProvider
          methods={methods}
          onSubmitForm={handleSubmit(onSubmitForm)}
        >
          <Stack spacing={3}>
            <InputCommon
              errors={errors.phone_number}
              control={control}
              name="phone_number"
              label="Số điện thoại"
              type="number"
            />
            <InputCommon
              inputPassword
              errors={errors.password}
              control={control}
              name="password"
              type="password"
              label="Mật khẩu"
            />
            <InputCommon
              inputPassword
              errors={errors.confirm_password}
              control={control}
              name="confirm_password"
              type="password"
              label="Xác nhận mật khẩu"
            />
            <LoadingButtonCommon
              loading={isSubmitting}
              fullWidth
              title="Đăng ký"
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
          <Typography>Nếu bạn đã có tài khoản?</Typography>
          <Typography
            onClick={() => router.push(PUBLIC_ROUTER.ACCOUNT.LOGIN)}
            component="button"
            color="error"
            sx={{
              fontWeight: 600,
              cursor: "pointer",
              ":hover": { textDecoration: "underline" },
            }}
          >
            Đăng nhập ngay
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
