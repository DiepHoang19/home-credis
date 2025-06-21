import type { Theme, SxProps } from "@mui/material";
import type { ReactNode, ComponentProps } from "react";

import { memo } from "react";

import { Button } from "@mui/material";

import {
  BUTTON_COLOR,
  BUTTON_TEXT_COLOR,
  BUTTON_HOVER_COLOR,
  BUTTON_BORDER_COLOR,
  BUTTON_HOVER_COLOR_OUTLINED,
  BUTTON_HOVER_BOX_SHADOW_COLOR,
} from "../contants/contants";

type MUIButtonProps = ComponentProps<typeof Button>;

interface ButtonCommonProps extends MUIButtonProps {
  title?: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
  icon?: ReactNode;
}

const getStyleByColor = (
  colorKey: string,
  styleObject: Record<string, string>
) => styleObject[colorKey.toUpperCase()] || styleObject.DEFAULT;

const getStyles = (variant: string, color: string): SxProps<Theme> => {
  const isOutlined = variant === "outlined";

  return {
    borderRadius: "8px",
    border: isOutlined ? getStyleByColor(color, BUTTON_BORDER_COLOR) : "none",
    fontWeight: 700,
    color: isOutlined ? getStyleByColor(color, BUTTON_TEXT_COLOR) : "#fff",
    textTransform: "capitalize",
    lineHeight: "1.71429",
    backgroundColor: isOutlined
      ? "transparent"
      : getStyleByColor(color, BUTTON_COLOR),
    "&:hover": {
      border: isOutlined ? getStyleByColor(color, BUTTON_BORDER_COLOR) : "none",
      backgroundColor: isOutlined
        ? getStyleByColor(color, BUTTON_HOVER_COLOR_OUTLINED)
        : getStyleByColor(color, BUTTON_HOVER_COLOR),
      boxShadow: isOutlined
        ? "none"
        : getStyleByColor(color, BUTTON_HOVER_BOX_SHADOW_COLOR),
    },
  };
};

const ButtonCommon: React.FC<ButtonCommonProps> = ({
  title = "Button",
  leftIcon,
  rightIcon,
  icon,
  variant = "contained",
  color = "default",
  children,
  sx,
  ...rest
}) => (
  <Button
    variant={variant}
    color={color as any}
    startIcon={leftIcon && icon}
    endIcon={rightIcon && icon}
    sx={
      {
        ...(getStyles(variant, color) as SxProps<Theme>),
        ...(sx as SxProps<Theme>),
      } as SxProps<Theme>
    }
    {...rest}
  >
    {children ?? title}
  </Button>
);

export default memo(ButtonCommon);
