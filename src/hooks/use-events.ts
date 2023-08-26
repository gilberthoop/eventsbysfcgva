import { useEffect } from "react";
import { Action } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState, fetchEvents } from "@/store";

const useEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.events);

  const dispatch: ThunkDispatch<RootState, unknown, Action> = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return { events, isLoading, error };
};

export default useEvents;
