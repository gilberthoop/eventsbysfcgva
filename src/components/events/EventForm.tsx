import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { SFCEvent, DateTime, FormAction } from "@/types";
import { sanitizeInput } from "@/utils/input-validation";
import { HOSTS } from "@/utils/global-constants";
import AppDateTimePicker from "@/components/AppDateTimePicker";

interface EventFormProps {
  formTitle: string;
  formData?: SFCEvent;
  action: FormAction;
  loading: boolean;
  hasError: boolean;
  response: string;
  onNewEventSubmit?: (eventParams: SFCEvent) => void;
  onEditEventSubmit?: (eventParams: SFCEvent) => void;
}

const EventForm: React.FC<EventFormProps> = ({
  formTitle,
  formData,
  action,
  loading,
  hasError,
  response,
  onNewEventSubmit,
  onEditEventSubmit,
}) => {
  const initialFormState: SFCEvent = {
    host: "",
    name: "",
    description: "",
    venue: "",
    address: "",
    startDate: "",
    startTime: "",
    isoStartScheduleFormat: "",
    endDate: "",
    endTime: "",
    isoEndScheduleFormat: "",
  };

  const [formState, setFormState] = useState<SFCEvent>(initialFormState);
  const router = useRouter();

  /**
   * When editing, populate form state with the exisiting form data
   */
  useEffect(() => {
    if (action === FormAction.Edit && formData) {
      setFormState(formData);
    }
  }, [formData]);

  const submitNewEvent = () => {
    if (!onNewEventSubmit) return;
    onNewEventSubmit(formState);
    setFormState(initialFormState);
    router.push("/");
  };

  const submitEditEvent = () => {
    if (!onEditEventSubmit) return;
    onEditEventSubmit(formState);
    router.push("/");
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    switch (action) {
      case FormAction.Add:
        submitNewEvent();
        break;
      case FormAction.Edit:
        submitEditEvent();
      default:
        break;
    }
  }

  function handleInputChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        const isoDateTimeFormat = new Date(dateValue.toDate()).toISOString();
        const { date, time } = handleDateTimeParsing(dateValue.toDate());
        setFormState((prevState) => ({
          ...prevState,
          startDate: date,
          startTime: time,
          isoStartScheduleFormat: isoDateTimeFormat,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  function onEndDateChange(dateValue: any) {
    try {
      if (dateValue && dateValue.toDate()) {
        const isoDateTimeFormat = new Date(dateValue.toDate()).toISOString();
        const { date, time } = handleDateTimeParsing(dateValue.toDate());
        setFormState((prevState) => ({
          ...prevState,
          endDate: date,
          endTime: time,
          isoEndScheduleFormat: isoDateTimeFormat,
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main>
      <header className="pb-6 text-white text-center">
        <h1 className="text-3xl">{formTitle}</h1>
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
          <select
            name="host"
            value={formState.host}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            {HOSTS.map((host, index) => (
              <option key={index} value={host}>
                {host}
              </option>
            ))}
          </select>
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
          <AppDateTimePicker
            label="Select the event start date and time (PST)"
            scheduleISOformat={formState.isoStartScheduleFormat}
            onDateChange={onStartDateChange}
          />
        </div>

        <div className="form__group my-3">
          <AppDateTimePicker
            label="Select the event end date and time (PST)"
            scheduleISOformat={formState.isoEndScheduleFormat}
            onDateChange={onEndDateChange}
          />
        </div>

        <div className="flex justify-between my-4">
          <button
            className="form__button form__button--cancel"
            onClick={() => router.push("/")}
          >
            {loading ? <CircularProgress size={24} /> : "Cancel"}
          </button>

          <button type="submit" className="form__button" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Submit"}
          </button>
        </div>
      </form>
    </main>
  );
};

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

export default EventForm;
