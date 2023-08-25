import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface DateTimePickerProps {
  label: string;
  scheduleISOformat: string;
  onDateChange: (dateValue: any) => void;
}

const AppDateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  scheduleISOformat,
  onDateChange,
}) => {
  return (
    <section>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={label}
          value={dayjs(scheduleISOformat)}
          onChange={onDateChange}
        />
      </LocalizationProvider>
    </section>
  );
};

export default AppDateTimePicker;
