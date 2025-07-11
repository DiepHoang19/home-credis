import { INFO_BANK, LOANS_STEPS, SIGN_COMFIRM } from "@/constants";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  StepConnector,
  styled,
} from "@mui/material";
import { CustomStepIcon } from "./CustomStepIcon";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  "& .MuiStepConnector-line": {
    borderColor: "#1976d2",
    borderTopWidth: 4,
    borderRadius: 1,
  },
}));

export const LoansStepper = ({ activeStep }: { activeStep: number }) => {
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
  return (
    <div>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
        sx={{ mt: 2, mb: 4 }}
      >
        {list()?.map((step, index) => (
          <Step key={step.key}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  fontWeight: 600,
                  color:
                    activeStep === index
                      ? "#1976d2"
                      : activeStep > index
                      ? "#4caf50"
                      : "#888",
                }}
              >
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};
