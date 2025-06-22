import { useId } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  SelectProps,
} from "@mui/material";
import { Controller, Control, FieldError } from "react-hook-form";

interface SelectOption {
  id: number;
  value: string | number;
  label: React.ReactNode;
}
interface SelectCommonProps
  extends Omit<
    SelectProps<any>,
    "name" | "value" | "onChange" | "defaultValue"
  > {
  control: Control<any>;
  errors?: FieldError | undefined;
  optionSelect: SelectOption[];
  name: string;
  label: string;
}

function SelectCommon({
  control,
  optionSelect,
  errors,
  name,
  label,
  sx,
  ...rest
}: Readonly<SelectCommonProps>) {
  const id = useId();
  const hasError = !!errors;

  return (
    <FormControl fullWidth error={hasError}>
      <InputLabel id={`select-label-${id}`}>{label}</InputLabel>

      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} là bắt buộc` }}
        render={({ field }) => (
          <Select
            {...(field as any)}
            {...rest}
            labelId={`select-label-${id}`}
            id={`select-${id}`}
            label={label}
            value={field.value ?? ""}
            sx={{
              borderRadius: 2,
              color: "text.primary",
              ...sx,
            }}
          >
            {optionSelect.length > 0 ? (
              optionSelect.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.label}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled value="">
                Không có dữ liệu
              </MenuItem>
            )}
          </Select>
        )}
      />

      <FormHelperText>{errors?.message}</FormHelperText>
    </FormControl>
  );
}

export default SelectCommon;
