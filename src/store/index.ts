import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { fetchEvents } from "./thunks";
import { eventsReducer } from "./slices/eventsSlice";

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export { fetchEvents };
