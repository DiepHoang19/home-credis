import Check from "@mui/icons-material/Check";
import { Box } from "@mui/material";
import { StepIconProps } from "@mui/material/StepIcon";

export const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, icon } = props;

  return (
    <Box
      sx={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        backgroundColor: completed
          ? "#4caf50" // xanh lá
          : active
          ? "#1976d2" // xanh dương đậm
          : "#e0e0e0", // xám
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      {completed ? <Check fontSize="small" /> : icon}
    </Box>
  );
};
