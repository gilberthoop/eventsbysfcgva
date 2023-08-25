import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { SFCEvent } from "@/types";

const useEventRequestHandler = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [hasError, setHasError] = useState(false);
  const router = useRouter();

  const fetchEvent = async (eventId: string | string[]) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/events?id=${eventId}`);
      setHasError(false);
      setLoading(false);
      return response.data;
    } catch (e) {
      console.error(e);
      setResponse("Unable to fetch event");
      setHasError(true);
    }
  };

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

  const handleEditEventSubmit = async (eventParams: SFCEvent) => {
    try {
      setLoading(true);
      const { eventId } = router.query;
      const response = await axios.put(
        `/api/events?id=${eventId}`,
        eventParams
      );
      setResponse(response.data?.message);
      setHasError(false);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setResponse("Unable to edit event");
      setHasError(true);
    }
  };

  return {
    fetchEvent,
    handleNewEventSubmit,
    handleEditEventSubmit,
    loading,
    response,
    hasError,
  };
};

export default useEventRequestHandler;
