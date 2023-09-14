import { CircularProgress } from "@mui/material";
import EventCard from "@/components/events/EventCard";
import { useEffect } from "react";
import useEventRequestHandler from "@/hooks/use-event-request-handler";
import useEvents from "@/hooks/use-events";

const UpcomingEvents: React.FC = () => {
  const { fetchAllEvents } = useEventRequestHandler();
  const { events, isLoading } = useEvents();

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchEventsResult = isLoading ? (
    <CircularProgress size={64} className="text-white" />
  ) : (
    events &&
    events.map((event, index) => <EventCard key={index} details={event} />)
  );

  const noUpcomingEvents = (
    <div className="text-2xl text-center text-white">
      There are currently no upcoming events. Stay tuned!
    </div>
  );

  return (
    <section className="event">
      <header className="event__header">Upcoming Events</header>

      <section className="event__body">
        {events ? fetchEventsResult : noUpcomingEvents}
      </section>
    </section>
  );
};

export default UpcomingEvents;
