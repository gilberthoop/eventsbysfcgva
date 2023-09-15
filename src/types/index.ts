export interface SFCEvent {
  host: string;
  name: string;
  description: string;
  venue: string;
  address: string;
  startDate: string;
  startTime: string;
  isoStartScheduleFormat: string;
  endDate: string;
  endTime: string;
  isoEndScheduleFormat: string;
}

export interface SFCEventData extends SFCEvent {
  _id: string;
}

export interface SFCEventState {
  data: SFCEventData[];
  isLoading: boolean;
  error: string | null;
}

export interface DateTime {
  date: string;
  time: string;
}

export enum FormAction {
  Add = "add",
  Edit = "edit",
}

export interface LoginParams {
  username: string;
  password: string;
}
