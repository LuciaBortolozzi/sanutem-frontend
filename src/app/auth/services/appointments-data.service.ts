import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SchedulerRequestPayload} from '../scheduler/scheduler-request.payload';
import {Appointments} from '../model/model';
import {DeleteAppointmentRequestPayload} from '../modify-calendar/delete-appointment-request.payload';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsDataService {

  constructor(private http: HttpClient) {
  }

  retrieveAllAppointments(username: string, professional: string) {
    return this.http.get<Appointments[]>(`http://localhost:8080/api/auth/user-profile/${username}/search/${professional}/schedule`);
  }

  retrieveAllScheduledAppointments(professional: string) {
    return this.http.get<Appointments[]>(`http://localhost:8080/api/auth/user-profile/${professional}/view-calendar`);
  }

  retrieveAllScheduledAppointmentsR(receptionist: string) {
    return this.http.get<Appointments[]>(`http://localhost:8080/api/auth/user-profile/${receptionist}/modify-calendar`);
  }

  deleteAppointment(receptionist: string, appointment: DeleteAppointmentRequestPayload) {
    return this.http.delete(`http://localhost:8080/api/auth/user-profile/${receptionist}/modify-calendar/${appointment.idAppointments}`);
  }

  scheduleAppointment(appointment: SchedulerRequestPayload) {
    return this.http.post(`http://localhost:8080/api/auth/user-profile/${appointment.userNamePatient}/search/${appointment.userNameProfessional}/schedule/${appointment.idAppointments}`, appointment, {responseType: 'text'});
  }
}
