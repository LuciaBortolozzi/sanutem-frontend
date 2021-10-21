import {Component, OnInit} from '@angular/core';
import {Appointments} from '../model/model';
import {AppointmentsDataService} from '../services/appointments-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DeleteAppointmentRequestPayload} from './delete-appointment-request.payload';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-modify-calendar',
  templateUrl: './modify-calendar.component.html',
  styleUrls: ['./modify-calendar.component.css']
})
export class ModifyCalendarComponent implements OnInit {
  message: string;
  appointments: Appointments[];
  userNameReceptionist: string;
  deleteAppointment: DeleteAppointmentRequestPayload;

  constructor(private appointmentsService: AppointmentsDataService, private router: Router,
              private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.userNameReceptionist = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void {
    this.refreshAppointments();
  }

  refreshAppointments() {
    this.appointmentsService.retrieveAllScheduledAppointmentsR(this.userNameReceptionist).subscribe(
      response => {
        this.appointments = response;
      }
    );
  }

  delete(appointment: Appointments) {
    this.deleteAppointment.idAppointments = appointment.idAppointments;
    this.deleteAppointment.date = appointment.date;
    this.deleteAppointment.hour = appointment.hour;
    this.deleteAppointment.userNamePatient = appointment.userNamePatient;
    this.deleteAppointment.userNameProfessional = appointment.userNameProfessional;
    this.deleteAppointment.freeAppointment = appointment.freeAppointment;
    this.appointmentsService.deleteAppointment(this.userNameReceptionist, this.deleteAppointment)
      .subscribe(response => {
        this.router.navigate(['/'],
          {queryParams: {registered: 'true'}});
        this.toastr.success('Schedule successful!');
      }, error => {
        console.log(error);
        this.toastr.error('Schedule Failed! Please try again');
      });
  }
}
