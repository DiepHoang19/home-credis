import dayjs from "dayjs";
import { Controller } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface DatePickerCommonProps {
  control: any;
  errors: any;
  name: string;
  label?: string;
}
function DatePickerCommon(props: Readonly<DatePickerCommonProps>) {
  const { errors, name, label, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={value ? dayjs(value) : null}
            onChange={onChange}
            onError={errors}
            label={label}
            sx={{
              borderRadius: 4,
            }}
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
