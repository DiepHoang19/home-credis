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
import { INFO_BANK, LOANS_STEPS, SIGN_COMFIRM } from "@/constants";
import { LoansStepper } from "./components/LoansSteps";
import { formatNumber, parseFormattedNumber, safeParseJSON } from "@/helpers";
import DialogCommon from "@/common/dialog-common";
import { StepOne } from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import { CCCDStepper } from "./components/CCCDSteps";
import StepThree from "./components/StepThree";
import { GET_LOAN_USER } from "@/services/graphql/loans-gql";
import { ENUM_STATUS_LOAN, ENUM_STEP_LOAN, Loan } from "@/services/model/loans";
import {
  ApolloQueryResult,
  OperationVariables,
  useQuery,
} from "@apollo/client";
import { User } from "@/services/model/user";
import Cookies from "js-cookie";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";
import { useNavigate } from "react-router-dom";
import { FullScreenSpinner } from "@/components/loading/Loading";
import LoanAlertSection from "./components/Warning";

const LoanCalculator = () => {
  const router = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cccdStep, setCccdStep] = useState(0);
  const userInfo = safeParseJSON(
    (Cookies.get("user_info") || "") as string
  ) as User;

  const {
    data: dataLoanUser,
    refetch: refetchCurrentLoan,
    loading,
  }: {
    data: { loans: Loan[] };
    refetch: (
      variables?: Partial<OperationVariables>
    ) => Promise<ApolloQueryResult<any>>;
    loading: boolean;
  } = useQuery(GET_LOAN_USER, {
    variables: {
      user_id: userInfo?.id,
    },
    skip: !userInfo?.id,
  });

  useEffect(() => {
    if (!userInfo?.id) {
      router("/dang-nhap");
    }
  }, [userInfo?.id]);

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
        return (
          <StepThree
            currentLoan={dataLoanUser?.loans?.[0]}
            setActiveStep={setActiveStep}
          />
        );

      case 3:
        return (
          <StepFour
            currentLoan={dataLoanUser?.loans?.[0]}
            setActiveStep={setActiveStep}
          />
        );
      case 4:
        return <StepFive currentLoan={dataLoanUser?.loans?.[0]} />;
      default:
        return "";
    }
  };

  useEffect(() => {
    if (
      dataLoanUser?.loans &&
      dataLoanUser?.loans?.length > 0 &&
      dataLoanUser?.loans[0].step !== ENUM_STEP_LOAN.FIVE &&
      dataLoanUser?.loans[0].status !== ENUM_STATUS_LOAN.DONE
    ) {
      setActiveStep((dataLoanUser?.loans[0].step || 0) + 1);
    }
  }, [dataLoanUser?.loans]);

  const list = () => {
    if (activeStep < 2) {
      return LOANS_STEPS;
    }
    if (activeStep <= 3) {
      return [...LOANS_STEPS, INFO_BANK];
    }
    if (activeStep === 4) {
      return [...LOANS_STEPS, INFO_BANK, SIGN_COMFIRM];
    }
  };

  if (loading) {
    return <FullScreenSpinner />;
  }

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
          {list()?.[activeStep]?.label?.toUpperCase()}
        </Typography>
      </div>

      <div className="w-[80%]">
        <LoansStepper activeStep={activeStep} />
      </div>
      {[
        ENUM_STATUS_LOAN.IN_CONTACT,
        ENUM_STATUS_LOAN.REQUEST,
        ENUM_STATUS_LOAN.WAIT_COMFIRM_CONTACT,
      ].includes(dataLoanUser?.loans[0]?.status) &&
      dataLoanUser?.loans[0]?.step === ENUM_STEP_LOAN.DONE ? (
        <LoanAlertSection id={dataLoanUser?.loans[0]?.id} />
      ) : (
        <>
          {activeStep === 1 && (
            <div className="w-[60%]">
              <CCCDStepper activeStep={cccdStep} />
            </div>
          )}

          {renderStep()}
        </>
      )}
    </Box>
  );
};

export default LoanCalculator;
