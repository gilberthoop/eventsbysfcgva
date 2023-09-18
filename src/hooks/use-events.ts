import { useSelector } from "react-redux";
import { RootState } from "@/store";

const useEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.events);

  return { events, isLoading, error };
};

export default useEvents;
