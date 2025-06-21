import type { Theme } from "@mui/material/styles";

import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import EyeClose from "./icon-svg/eye-close";
import EyeOpen from "./icon-svg/eye-open";

interface InputCommonProps {
  errors: any;
  label?: string;
  name: string;
  register: any;
  startIcon?: any;
  endIcon?: any;
  placeholder?: string;
  type?: "text" | "password" | "number" | "date";
  defaultValue?: any;
  multiline?: boolean;
  rows?: number;
  clickStartIcon?: any;
  clickEndIcon?: any;
  inputPassowrd?: boolean;
  value?: any;
}

export default function InputCommon(props: Readonly<InputCommonProps>) {
  const {
    label,
    name,
    errors,
    register,
    startIcon,
    endIcon,
    inputPassowrd,
    placeholder,
    type = "text",
    defaultValue,
    multiline,
    rows,
    clickEndIcon,
    clickStartIcon,
    value,
    ...rest
  } = props;

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

  const inputTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(inputTheme)}>
      <TextField
        multiline={multiline}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        type={type}
        InputProps={{
          startAdornment: clickStartIcon && (
            <IconButton onClick={clickStartIcon}>{startIcon}</IconButton>
          ),
          endAdornment: (clickEndIcon || inputPassowrd) && (
            <IconButton onClick={clickEndIcon}>
              {type === "password" && inputPassowrd ? (
                <EyeClose />
              ) : inputPassowrd ? (
                <EyeOpen />
              ) : (
                endIcon
              )}
            </IconButton>
          ),
        }}
        helperText={errors?.message}
        error={errors}
        {...register(name, {
          required: true,
        })}
        placeholder={placeholder}
        name={name}
        fullWidth
        label={label}
        {...rest}
      />
    </ThemeProvider>
  );
}
