import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchEvents } from "../thunks";
import { SFCEventState } from "@/types";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    data: [],
    isLoading: true,
    error: null,
  } as SFCEventState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchEvents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchEvents.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );
    builder.addCase(
      fetchEvents.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export const eventsReducer = eventsSlice.reducer;
