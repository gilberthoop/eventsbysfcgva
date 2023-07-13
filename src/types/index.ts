export interface SFCEvent {
  host: string;
  name: string;
  description: string;
  venue: string;
  address: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export interface SFCEventState {
  data: SFCEvent[];
  isLoading: boolean;
  error: string | null;
}

export interface DateTime {
  date: string;
  time: string;
}
