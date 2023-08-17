import { useEffect } from "react";
import { Action } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState, fetchEvents } from "@/store";
import EventCardMini from "@/components/events/EventCardMini";
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
    <section className="main">
      <header className="main__header">Upcoming Events</header>

      <section className="main__body">
        {/* {events &&
          events.map((event, index) => (
            <EventCard key={index} details={event} />
          ))} */}

        {events &&
          events.map(({ coverPhoto, host, name }, index) => (
            <EventCardMini
              key={index}
              coverPhoto={coverPhoto}
              host={host}
              name={name}
            />
          ))}
      </section>
    </section>
  );
};

export default UpcomingEvents;
