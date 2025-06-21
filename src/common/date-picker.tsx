import { useForm, Controller } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface DatePickerCommonProps {
  errors: any;
  register: any;
  name: string;
  label?: string;
}

function DatePickerCommon(props: Readonly<DatePickerCommonProps>) {
  const { errors, name, label } = props;
  const { control } = useForm();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={value}
            onChange={onChange}
            onError={errors}
            label={label}
            slotProps={{
              textField: {
                error: !!errors,
                fullWidth: true,
                helperText: errors?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
}

export default DatePickerCommon;
