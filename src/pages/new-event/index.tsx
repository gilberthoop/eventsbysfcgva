import useEventRequestHandler from "@/hooks/use-event-request-handler";
import Eventform from "@/components/events/EventForm";
import { FormAction } from "@/types";

function NewEventPage() {
  const { handleNewEventSubmit, loading, response, hasError } =
    useEventRequestHandler();

  return (
    <div className="p-6 sm:py-16 sm:px-20">
      <Eventform
        formTitle="Add a new event"
        action={FormAction.Add}
        loading={loading}
        hasError={hasError}
        response={response}
        onNewEventSubmit={handleNewEventSubmit}
      />
    </div>
  );
}

export default NewEventPage;
