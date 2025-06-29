// components/NumberInput.tsx
import { NumericFormat } from "react-number-format";
import { TextField, InputAdornment, Typography } from "@mui/material";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  helperText?: string;
  min?: number;
  max?: number;
}

export default function NumberInput({
  value,
  onChange,
  label,
  helperText,
  min,
  max,
}: NumberInputProps) {
  return (
    <NumericFormat
      value={value}
      customInput={TextField}
      fullWidth
      label={label}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              VND
            </Typography>
          </InputAdornment>
        ),
      }}
      onValueChange={(values) => {
        if (values.floatValue !== undefined) {
          // kiểm tra min max nếu cần
          if (min && values.floatValue < min) return;
          if (max && values.floatValue > max) return;
          onChange(values.floatValue * 1);
        } else {
          onChange(0); // fallback khi xóa input
        }
      }}
    />
  );
}
