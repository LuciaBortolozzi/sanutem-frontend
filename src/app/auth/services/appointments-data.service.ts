import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Appointments} from '../scheduler/scheduler.component';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsDataService {

  constructor(private http: HttpClient) {
  }

  retrieveAllAppointments(username: string, professional: string) {
    return this.http.get<Appointments[]>(`http://localhost:8080/api/auth/user-profile/${username}/search/${professional}/schedule/appointments`);
  }

  deleteAppointment(username: string, professional: string, id: number) {
    return this.http.delete(`http://localhost:8080/api/auth/user-profile/${username}/search/${professional}/schedule/appointments/${id}`);
  }

  retrieveAppointment(username: string, professional: string, id: number) {
    return this.http.get<Appointments>(`http://localhost:8080/api/auth/user-profile/${username}/search/${professional}/schedule/appointments/${id}`);
  }

  updateAppointment(username: string, professional: string, id: number, appointment: Appointments) {
    return this.http.put(
      `http://localhost:8080/api/auth/user-profile/${username}/search/${professional}/schedule/appointments/${id}`, appointment);
  }
}
