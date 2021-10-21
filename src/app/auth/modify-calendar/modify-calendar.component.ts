import {Component, OnInit} from '@angular/core';
import {Appointments} from '../model/model';
import {AppointmentsDataService} from '../services/appointments-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CancelAppointmentRequestPayload} from './cancel-appointment-request.payload';
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
  cancelAppointment: CancelAppointmentRequestPayload;

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

  cancel(appointment: Appointments) {
    this.cancelAppointment.idAppointments = appointment.idAppointments;
    this.cancelAppointment.date = appointment.date;
    this.cancelAppointment.hour = appointment.hour;
    this.cancelAppointment.userNamePatient = appointment.userNamePatient;
    this.cancelAppointment.userNameProfessional = appointment.userNameProfessional;
    this.cancelAppointment.freeAppointment = appointment.freeAppointment;
    this.appointmentsService.cancelAppointment(this.userNameReceptionist, this.cancelAppointment)
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
