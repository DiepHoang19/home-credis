import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Alert,
} from "@mui/material";
import dayjs from "dayjs";
import { LOANS_STEPS } from "@/constants";
import { LoansStepper } from "./components/LoansSteps";
import { formatNumber, parseFormattedNumber, safeParseJSON } from "@/helpers";
import DialogCommon from "@/common/dialog-common";
import { StepOne } from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import { CCCDStepper } from "./components/CCCDSteps";
import StepThree from "./components/StepThree";
import { GET_LOAN_USER } from "@/services/graphql/loans-gql";
import { ENUM_STEP_LOAN, Loan } from "@/services/model/loans";
import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import { User } from "@/services/model/user";
import Cookies from "js-cookie";

const LoanCalculator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [cccdStep, setCccdStep] = useState(0);
    const userInfo = safeParseJSON(
        (Cookies.get("user_info") || "") as string
      ) as User;
  const {
    data: dataLoanUser,
    refetch: refetchCurrentLoan,
  }: {
    data: { loans: Loan[] };
    refetch: (
      variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
  } = useQuery(GET_LOAN_USER,{
    variables:{
      user_id: userInfo.id
    },

  });

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepOne
            setActiveStep={setActiveStep}
            refetchCurrentLoan={refetchCurrentLoan}
          />
        );

      case 1:
        return (
          <StepTwo
            setActiveStep={setActiveStep}
            cccdStep={cccdStep}
            setCccdStep={setCccdStep}
            currentLoan={dataLoanUser?.loans?.[0]}
            refetchCurrentLoan={refetchCurrentLoan}
          />
        );

      case 2:
        return <StepThree />;
      default:
        return "";
    }
  };

  useEffect(() => {
    if (
      dataLoanUser?.loans &&
      dataLoanUser?.loans?.length > 0 &&
      dataLoanUser?.loans[0].step !== ENUM_STEP_LOAN.DONE
    ) {
      setActiveStep((dataLoanUser?.loans[0].step || 0) + 1);
    }
  }, [dataLoanUser?.loans]);

  return (
    <Box
      p={4}
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <div className="w-full bg-[#e9f2f9] text-center py-10">
        <Typography variant="h4">
          {LOANS_STEPS[activeStep].label.toUpperCase()}
        </Typography>
      </div>

      <div className="w-[80%]">
        <LoansStepper activeStep={activeStep} />
      </div>

      {activeStep === 1 && (
        <div className="w-[60%]">
          <CCCDStepper activeStep={cccdStep} />
        </div>
      )}

      {renderStep()}
      {/* 
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Chi tiết thanh toán</DialogTitle>
        <DialogContent sx={{ px: { xs: 1, sm: 3 } }}>
          <Box textAlign="right" mt={2}>
            <Button
              onClick={() => setOpen(false)}
              variant="outlined"
              size="small"
            >
              Đóng
            </Button>
          </Box>
        </DialogContent>
      </Dialog> */}
    </Box>
  );
};

export default LoanCalculator;
