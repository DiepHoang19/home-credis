import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Card, Container, Typography, Box } from "@mui/material";
import FormProvider from "@/common/form-provider";
import InputCommon from "@/common/input-common";
import LoadingButtonCommon from "@/common/loading-button";
import { useRouter } from "@/hook";
import { PUBLIC_ROUTER } from "@/router/section";
import { useLazyQuery } from "@apollo/client";
import { queryLogin } from "@/graphql/query";
import { toast } from "sonner";
import cookies from "js-cookie";
import { USER_INFO } from "@/contants/contants";

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
    register,
  } = methods;

  const [LoginMutation] = useLazyQuery(queryLogin);
  const router = useRouter();

  const onSubmitForm = async (values: PayloadLogin) => {
    const { phone_number, password } = values;
    try {
      const data = await LoginMutation({
        variables: {
          phone_number,
          password,
        },
      });
      if (!data.data.users[0]) {
        toast.warning("Thông tin tài khoản không chính xác");
        return;
      }
      toast.success("Đăng nhập thành công");
      cookies.set(USER_INFO, JSON.stringify(data.data.users[0]));
      router.push(PUBLIC_ROUTER.HOME);
    } catch (error) {
      console.log("err", error);
      toast.error("Đã có lỗi xảy ra,vui lòng thử lại sau");
    }
  };

  return (
    <Container maxWidth="md" sx={{ p: 10 }}>
      <Card sx={{ p: 10, borderRadius: 2 }}>
        <FormProvider
          methods={methods}
          onSubmitForm={handleSubmit(onSubmitForm)}
        >
          <Stack spacing={3}>
            <InputCommon
              errors={errors.phone_number}
              register={register}
              name="phone_number"
              label="Số điện thoại"
              type="number"
            />
            <InputCommon
              errors={errors.password}
              register={register}
              name="password"
              type="password"
              label="Mật khẩu"
              inputPassowrd
            />
            <LoadingButtonCommon
              loading={isSubmitting}
              fullWidth
              title="Đăng nhập"
              type="submit"
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
      </Card>
    </Container>
  );
}

export default Login;
