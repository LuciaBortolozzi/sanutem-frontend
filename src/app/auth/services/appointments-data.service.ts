import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Appointments} from '../scheduler/scheduler.component';
import {SchedulerRequestPayload} from '../scheduler/scheduler-request.payload';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsDataService {

  constructor(private http: HttpClient) {
  }

  retrieveAllAppointments(username: string, professional: string) {
    return this.http.get<Appointments[]>(`http://localhost:8080/api/auth/user-profile/${username}/search/${professional}/schedule`);
  }

  deleteAppointment(username: string, professional: string, id: number) {
    return this.http.delete(`http://localhost:8080/api/auth/user-profile/${username}/search/${professional}/schedule/${id}`);
  }

  retrieveAppointment(username: string, professional: string, id: number) {
    return this.http.get<Appointments>(`http://localhost:8080/api/auth/user-profile/${username}/search/${professional}/schedule/${id}`);
  }

  scheduleAppointment(appointment: SchedulerRequestPayload) {
    return this.http.post(`http://localhost:8080/api/auth/user-profile/${appointment.userNamePatient}/search/${appointment.userNameProfessional}/schedule/${appointment.idAppointments}`, appointment, {responseType: 'text'});
  }
}
