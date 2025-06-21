import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Card, Container, Typography, Box } from "@mui/material";
import FormProvider from "@/common/form-provider";
import InputCommon from "@/common/input-common";
import LoadingButtonCommon from "@/common/loading-button";
import { useRouter } from "@/hook";
import { PUBLIC_ROUTER } from "@/router/section";
import { useMutation } from "@apollo/client";
import { mutationRegister } from "@/graphql/mutation";

interface PayloadRegister {
  phone_number: string;
  password: string;
}

function Register() {
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
    register,
  } = methods;

  const [registertMutation] = useMutation(mutationRegister);

  const onSubmitForm = async (values: PayloadRegister) => {
    const { phone_number, password } = values;
    try {
      const data = await registertMutation({
        variables: {
          object: { phone_number, password },
        },
      });
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

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
              inputPassowrd
              errors={errors.password}
              register={register}
              name="password"
              type="password"
              label="Mật khẩu"
            />
            <InputCommon
              inputPassowrd
              errors={errors.confirm_password}
              register={register}
              name="confirm_password"
              type="password"
              label="Xác nhận mật khẩu"
            />
            <LoadingButtonCommon
              loading={isSubmitting}
              fullWidth
              title="Đăng ký"
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
      </Card>
    </Container>
  );
}

export default Register;
