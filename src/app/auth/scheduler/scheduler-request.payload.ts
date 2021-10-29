export interface SchedulerRequestPayload {
  idAppointments: number;
  date: string;
  hour: string;
  freeAppointment: boolean;
  userNamePatient: string;
  userNameProfessional: string;
}
