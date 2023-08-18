import { useEffect } from "react";
import { Action } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState, fetchEvents } from "@/store";
import EventCard from "@/components/events/EventCard";
import { SFCEvent } from "@/types";

const UpcomingEvents: React.FC = () => {
  const { data: events } = useSelector(
    (state: { events: { data: SFCEvent[] } }) => state.events
  );
  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <section className="event">
      <header className="event__header">Upcoming Events</header>

      <section className="event__body">
        {events &&
          events.map((event, index) => (
            <EventCard key={index} details={event} />
          ))}
      </section>
    </section>
  );
};

export default UpcomingEvents;
