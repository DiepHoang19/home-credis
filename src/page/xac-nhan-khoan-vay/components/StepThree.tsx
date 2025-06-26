import { formatNumber, safeParseJSON } from "@/helpers";
import { Loan } from "@/services/model/loans";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { UPDATE_USER } from "@/services/graphql/user-gql";
import { UPDATE_LOANS } from "@/services/graphql/loans-gql";
import { useMutation } from "@apollo/client";
import { User } from "@/services/model/user";
import Cookies from "js-cookie";
import ButtonCommon from "@/common/button-common";
import FormProvider from "@/common/form-provider";
import InputCommon from "@/common/input-common";
import DatePickerCommon from "@/common/date-picker";
import SelectCommon from "@/common/select-common";

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
  console.log("currentLoan?.user?.gender", currentLoan?.user);
  const defaultValues = {
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
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

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

  const optionGender = [
    {
      id: 1,
      label: "Nam",
      value: 0,
    },
    {
      id: 2,
      label: "Nữ",
      value: 1,
    },
  ];

  return (
    <Container maxWidth="md">
      <Paper
        elevation={2}
        sx={{ p: 2, mb: 3, borderLeft: "4px solid #0066b3", borderRadius: 2 }}
      >
        <Typography fontWeight="bold" mb={1} color="#0066b3">
          Thông tin khoản vay đã chọn
        </Typography>
        <div className="flex justify-between">
          <div className="w-[250px]">
            <Typography variant="body2" className="flex justify-between">
              Sản phẩm: <strong>Tiền mặt</strong>
            </Typography>
            <Typography variant="body2" className="flex justify-between">
              Số tiền vay:
              <strong>{formatNumber(currentLoan?.price || 0)} VND</strong>
            </Typography>
          </div>
          <div className="w-[250px]">
            <Typography variant="body2" className="flex justify-between">
              Thời hạn vay:
              <strong>{currentLoan?.num_months || 0} tháng</strong>
            </Typography>
            <Typography variant="body2" className="flex justify-between">
              Mã khoản vay: <strong>{currentLoan?.loan_code || ""}</strong>
            </Typography>
          </div>
        </div>
      </Paper>

      <FormProvider methods={methods} onSubmitForm={handleSubmit(onSubmit)}>
        {/* Thông tin cơ bản */}
        <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Typography
            fontWeight="bold"
            mb={3}
            color="#0066b3"
            borderBottom="1px solid #DEE2E6"
            pb={2}
          >
            Thông tin cơ bản
          </Typography>
          <Grid container size={12} spacing={3} mb={4}>
            <Grid size={{ md: 6, xs: 12 }}>
              <InputCommon
                control={control}
                name="full_name"
                label="Họ và tên*"
                errors={errors.fullname}
              />
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <InputCommon
                control={control}
                name="cccd"
                label="Số CMND / CCCD*"
                errors={errors.cccd}
                type="number"
              />
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <InputCommon
                control={control}
                name="phone"
                label="Điện thoại di động*"
                errors={errors.phone}
                type="number"
              />
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <DatePickerCommon
                name="dob"
                errors={errors.dob}
                control={control}
              />
            </Grid>
            <Grid size={12}>
              <SelectCommon
                errors={errors.gender}
                name="gender"
                label="Giới tính"
                control={control}
                optionSelect={optionGender}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Thông tin nghề nghiệp */}
        <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Typography
            fontWeight="bold"
            mb={3}
            color="#0066b3"
            borderBottom="1px solid #DEE2E6"
            pb={2}
          >
            Thông tin nghề nghiệp
          </Typography>
          <Grid container size={12} spacing={3} mb={4}>
            <Grid size={{ md: 6, xs: 12 }}>
              <InputCommon
                name="job"
                errors={errors.job}
                label="Nghề nghiệp"
                control={control}
              />
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <InputCommon
                name="income"
                errors={errors.income}
                label="Khoản thu nhập*"
                control={control}
                type="number"
              />
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <InputCommon
                multiline
                rows={5}
                name="purpose"
                errors={errors.purpose}
                label="Mục đích vay*"
                control={control}
              />
            </Grid>
            <Grid size={{ md: 6, xs: 12 }}>
              <InputCommon
                multiline
                rows={5}
                name="address"
                label="Địa chỉ*"
                errors={errors.purpose}
                control={control}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Thông tin người thân */}
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Typography
            fontWeight="bold"
            mb={3}
            color="#0066b3"
            borderBottom="1px solid #DEE2E6"
            pb={2}
          >
            Thông tin người thân
          </Typography>
          <Grid container size={12}>
            <Grid container size={12} spacing={3} mb={4}>
              <Grid size={{ md: 6, xs: 12 }}>
                <InputCommon
                  name="relativePhone1"
                  errors={errors.relativePhone1}
                  label="SDT người thân 1*"
                  control={control}
                />
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <InputCommon
                  name="relativeRelation1"
                  errors={errors.relativeRelation1}
                  label="Mối quan hệ người thân 1*"
                  control={control}
                  type="number"
                />
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <InputCommon
                  name="relativePhone2"
                  errors={errors.relativeRelation1}
                  label="SDT người thân 2"
                  control={control}
                  type="number"
                />
              </Grid>
              <Grid size={{ md: 6, xs: 12 }}>
                <InputCommon
                  name="relativeRelation2"
                  errors={errors.relativeRelation1}
                  label="Mối quan hệ người thân 2"
                  control={control}
                  type="number"
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Box textAlign="center" mt={4}>
          <ButtonCommon type="submit" title="HOÀN TẤT ĐĂNG KÝ VAY" />
        </Box>
      </FormProvider>
    </Container>
  );
}
