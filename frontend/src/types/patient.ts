export interface Patient {
  id: number;
  name: string;
  avatarUrl?: string;
  lastCall?: string;
  nextAppointment?: string;
  status: "active" | "inactive" | "calling";
  phoneNumber: string;
} 