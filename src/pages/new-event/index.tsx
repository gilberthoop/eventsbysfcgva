import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/use-auth";
import Eventform from "@/components/events/EventForm";
import { SFCEvent } from "@/types";

function NewEventPage() {
  const { jwtToken } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleNewEventSubmit = async (eventParams: SFCEvent) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/events", eventParams);
      setResponse(response.data?.message);
      setHasError(false);
      setLoading(false);
      router.push("/");
    } catch (e) {
      console.error(e);
      setResponse("Unable to add new event.");
      setHasError(true);
    }
  };

  return (
    <div className="p-6 sm:py-16 sm:px-20">
      <Eventform
        formTitle="Add a new event"
        action="add"
        loading={loading}
        hasError={hasError}
        response={response}
        onNewEventSubmit={handleNewEventSubmit}
      />
    </div>
  );
}

export default NewEventPage;
