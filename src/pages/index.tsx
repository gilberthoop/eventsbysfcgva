import { useEffect } from "react";
import { Action } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState, fetchEvents } from "@/store";
import Event from "@/components/Event";
import { SFCEvent } from "@/types";

export default function Home() {
  const { data: events } = useSelector(
    (state: { events: { data: SFCEvent[] } }) => state.events
  );
  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <section className="p-6 sm:px-10 sm:py-10 md:px-16 lg:px-40 lg:py-12">
      <header className="text-center text-white text-2xl sm:text-4xl my-8">
        Upcoming Events
      </header>

      <section className="flex flex-col md:flex-row gap-y-2 md:gap-x-6 lg:gap-x-10">
        {events &&
          events.map((event, index) => <Event key={index} details={event} />)}
      </section>
    </section>
  );
}
