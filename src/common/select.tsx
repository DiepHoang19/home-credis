import { useId } from "react";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

interface SelectOption {
  id: number;
  value: string | number;
  label: React.ReactNode;
}

interface SelectCommonProps {
  register: any;
  errors: any;
  optionSelect: SelectOption[];
  label: string;
  name: string;
  value?: string | number;
}

function SelectCommon({
  register,
  optionSelect,
  errors,
  name,
  label,
  value,
}: Readonly<SelectCommonProps>) {
  const id = useId();
  const hasError = !!errors;

  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel id={`select-label-${id}`}>{label}</InputLabel>
      <Select
        labelId={`select-label-${id}`}
        id={`select-${id}`}
        label={label}
        value={value}
        sx={{
          borderRadius: 1,
          color: "text.primary",
        }}
        {...register(name, {
          required: true,
        })}
      >
        {optionSelect.length > 0 ? (
          optionSelect.map((item) => (
            <MenuItem
              key={item.id}
              value={item.value}
              sx={{
                borderRadius: 1.5,
                minHeight: 36,
                px: 2,
                mb: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(145, 158, 171, 0.08)",
                },
              }}
            >
              {item.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled value="">
            Không có dữ liệu
          </MenuItem>
        )}
      </Select>
      <FormHelperText>{errors?.message}</FormHelperText>
    </FormControl>
  );
}

export default SelectCommon;
