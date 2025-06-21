import type { Theme, SxProps } from "@mui/material/styles";

import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  BUTTON_COLOR,
  BUTTON_HOVER_COLOR,
  BUTTON_BORDER_COLOR,
  BUTTON_HOVER_BOX_SHADOW_COLOR,
} from "../contants/contants";

interface LoadingButtonCommonProps {
  color?: keyof typeof BUTTON_COLOR;
  title?: string;
  size?: "small" | "medium" | "large";
  loadingPosition?: "start" | "center" | "end";
  loading?: boolean;
  onClick?: () => void;
  type?: "submit" | "button";
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
}

function LoadingButtonCommon(props: Readonly<LoadingButtonCommonProps>) {
  const {
    color = "DEFAULT",
    title = "Button",
    size = "medium",
    loadingPosition = "end",
    loading = false,
    onClick,
    type = "submit",
    fullWidth = false,
    sx,
  } = props;

  const upperColor = color.toUpperCase() as keyof typeof BUTTON_COLOR;

  const styles: SxProps<Theme> = {
    color: "#fff",
    textTransform: "capitalize",
    lineHeight: "1.71429",
    fontWeight: 700,
    border: BUTTON_BORDER_COLOR[upperColor],
    backgroundColor: BUTTON_COLOR[upperColor],
    boxShadow: BUTTON_HOVER_BOX_SHADOW_COLOR[upperColor],
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: BUTTON_HOVER_COLOR[upperColor],
      boxShadow: BUTTON_HOVER_BOX_SHADOW_COLOR[upperColor],
    },
    ...sx,
  };

  return (
    <LoadingButton
      sx={styles}
      size={size}
      loading={loading}
      loadingPosition={loadingPosition}
      variant="contained"
      type={type}
      onClick={onClick}
      fullWidth={fullWidth}
    >
      <Typography color="white">{title}</Typography>
    </LoadingButton>
  );
}

export default LoadingButtonCommon;
