import { useState } from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import {
  TextField,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

import EyeClose from "./icon-svg/eye-close";
import EyeOpen from "./icon-svg/eye-open";

import { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

type InputCommonProps = MuiTextFieldProps & {
  name: string;
  control: Control<any>;
  errors?: FieldError | undefined;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  clickStartIcon?: () => void;
  clickEndIcon?: () => void;
  inputPassword?: boolean;
};

export default function InputCommon(props: Readonly<InputCommonProps>) {
  const {
    name,
    control,
    errors,
    label,
    inputPassword,
    startIcon,
    endIcon,
    clickStartIcon,
    clickEndIcon,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType =
    inputPassword && (props.type === "password" || props.type === "text");

  const inputTheme = useTheme();
  const customTheme = (inputTheme: Theme) =>
    createTheme({
      palette: {
        mode: inputTheme.palette.mode,
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              "--TextField-brandBorderFocusedColor": "#6F7E8C",
              "& label.Mui-focused": {
                color: errors ? "" : "var(--TextField-brandBorderFocusedColor)",
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: "#E0E3E7",
              borderRadius: "8px",
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: errors ? "" : "#B2BAC2",
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: errors ? "" : "#6F7E8C",
              },
              [`& label.Mui-focused`]: {
                color: errors ? "" : "#6F7E8C",
              },
            },
          },
        },
      },
    });

  return (
    <ThemeProvider theme={customTheme(inputTheme)}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            {...rest}
            type={
              isPasswordType
                ? showPassword
                  ? "text"
                  : "password"
                : props.type || "text"
            }
            label={label}
            error={!!errors}
            helperText={errors?.message}
            fullWidth
            InputProps={{
              startAdornment:
                startIcon &&
                (clickStartIcon ? (
                  <InputAdornment position="start">
                    <IconButton onClick={clickStartIcon}>
                      {startIcon}
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <InputAdornment position="start">{startIcon}</InputAdornment>
                )),
              endAdornment: (
                <InputAdornment position="end">
                  {inputPassword ? (
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOpen /> : <EyeClose />}
                    </IconButton>
                  ) : endIcon ? (
                    clickEndIcon ? (
                      <IconButton onClick={clickEndIcon}>{endIcon}</IconButton>
                    ) : (
                      endIcon
                    )
                  ) : null}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </ThemeProvider>
  );
}
