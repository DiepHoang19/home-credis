import { LOANS_STEPS } from "@/constants";
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
  return (
    <div className="px-100">
        <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={<CustomConnector />}
      sx={{ mt: 2, mb: 4 }}
      
    >
      {LOANS_STEPS.map((step, index) => (
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
