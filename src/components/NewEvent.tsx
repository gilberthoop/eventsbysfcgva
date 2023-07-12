import axios from "axios";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { SFCEvent, DateTime } from "@/types";
import { sanitizeInput } from "@/utils/input-validation";

function handleDateTimeParsing(dateTime: Date): DateTime {
  const date = dateTime.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = dateTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return { date, time };
}

const NewEvent: React.FC = () => {
  const initialFormState: SFCEvent = {
    host: "",
    name: "",
    description: "",
    venue: "",
    address: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  };

  const [formState, setFormState] = useState<SFCEvent>(initialFormState);
  const [response, setResponse] = useState("");
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await axios.post("/api/events", formState);
      setFormState(initialFormState);
      setResponse(response.data?.message);
      setHasError(false);
    } catch (e) {
      console.error(e);
      setResponse("Unable to add new event.");
      setHasError(true);
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    const sanitizedInput = sanitizeInput(value, name);

    setFormState((prevState) => ({
      ...prevState,
      [name]: sanitizedInput,
    }));
  }

  function onStartDateChange(dateValue: any) {
    try {
      if (dateValue && dateValue.toDate()) {
        const { date, time } = handleDateTimeParsing(dateValue.toDate());
        setFormState((prevState) => ({
          ...prevState,
          startDate: date,
          startTime: time,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  function onEndDateChange(dateValue: any) {
    try {
      if (dateValue && dateValue.toDate()) {
        const { date, time } = handleDateTimeParsing(dateValue.toDate());
        setFormState((prevState) => ({
          ...prevState,
          endDate: date,
          endTime: time,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <header className="pb-6 text-white text-center">
        <h1 className="text-3xl">Add a new event</h1>
      </header>

      <form onSubmit={handleSubmit} className="form">
        {response && (
          <h2
            className={`text-center text-lg ${
              hasError ? "text-red-500" : "text-blue-500"
            }`}
          >
            {response}
          </h2>
        )}
        <div className="form__group">
          <label htmlFor="host">Host:</label>
          <input
            type="text"
            name="host"
            value={formState.host}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            rows={4}
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="venue">Venue:</label>
          <input
            type="text"
            name="venue"
            value={formState.venue}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={formState.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form__group mt-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select the event start date and time (PST)"
              onChange={onStartDateChange}
            />
          </LocalizationProvider>
        </div>

        <div className="form__group my-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select the event end date and time (PST)"
              onChange={onEndDateChange}
            />
          </LocalizationProvider>
        </div>

        <button type="submit" className="form__button">
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewEvent;
