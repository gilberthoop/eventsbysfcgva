import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT = "/api/events";

const fetchEvents = createAsyncThunk("events/fetch", async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data.events;
  } catch (err) {
    console.error(err);
  }
});

export { fetchEvents };
