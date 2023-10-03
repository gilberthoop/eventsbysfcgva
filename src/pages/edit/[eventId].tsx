import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useEventRequestHandler from "@/hooks/use-event-request-handler";
import useAuthorization from "@/hooks/use-authorization";
import EventForm from "@/components/events/EventForm";
import { SFCEvent, FormAction } from "@/types";

const EditEventPage: React.FC = () => {
  const { fetchEvent, handleEditEventSubmit, loading, response, hasError } =
    useEventRequestHandler();

  useAuthorization();

  const [formData, setformData] = useState<SFCEvent>();

  const router = useRouter();
  const { eventId } = router.query;

  /**
   * Fetch event details and assign as form data
   */
  useEffect(() => {
    if (eventId) {
      fetchEvent(eventId).then((eventData) => {
        setformData(eventData);
      });
    }
  }, [eventId]);

  return (
    <div className="p-6 sm:py-16 sm:px-20">
      <EventForm
        formTitle="Edit event"
        formData={formData}
        action={FormAction.Edit}
        loading={loading}
        hasError={hasError}
        response={response}
        onEditEventSubmit={handleEditEventSubmit}
      />
    </div>
  );
};

export default EditEventPage;
