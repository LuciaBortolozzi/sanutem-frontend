export interface CancelAppointmentRequestPayload {
  idAppointments: number;
  date: string;
  hour: string;
  freeAppointment: boolean;
  userNamePatient: string;
  userNameProfessional: string;
}
