import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SchedulerRequestPayload} from '../scheduler/scheduler-request.payload';
import {Appointments} from '../model/model';
import {CancelAppointmentRequestPayload} from '../modify-calendar/cancel-appointment-request.payload';

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

  cancelAppointment(appointment: CancelAppointmentRequestPayload) {
    return this.http.post('http://localhost:8080/api/auth/user-profile/modify-calendar/cancel-appointment/',
      appointment, {responseType: 'text'});
  }

  scheduleAppointment(appointment: SchedulerRequestPayload) {
    return this.http.post(`http://localhost:8080/api/auth/user-profile/${appointment.userNamePatient}/search/${appointment.userNameProfessional}/schedule/${appointment.idAppointments}`, appointment, {responseType: 'text'});
  }
}
