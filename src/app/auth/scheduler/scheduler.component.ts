import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppointmentsDataService} from '../services/appointments-data.service';
import {ToastrService} from 'ngx-toastr';
import {SchedulerRequestPayload} from './scheduler-request.payload';
import {Appointments} from '../model/model';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  message: string;
  appointments: Appointments[];
  scheduleAppointment: SchedulerRequestPayload;
  nameUser: string;
  userNameProfessional: string;

  constructor(private appointmentsService: AppointmentsDataService, private router: Router,
              private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.nameUser = this.activatedRoute.snapshot.params.name;
    this.userNameProfessional = this.activatedRoute.snapshot.paramMap.get('professional');
    this.scheduleAppointment = {
      idAppointments: 0,
      date: '',
      hour: '',
      freeAppointment: false,
      userNamePatient: '',
      userNameProfessional: ''
    };
  }

  ngOnInit(): void {
    this.refreshAppointments();
  }

  refreshAppointments() {
    this.appointmentsService.retrieveAllAppointments(this.nameUser, this.userNameProfessional).subscribe(
      response => {
        this.appointments = response;
      }
    );
  }

  schedule(appointment: Appointments) {
    appointment.userNamePatient = this.nameUser;
    this.scheduleAppointment.idAppointments = appointment.idAppointments;
    this.scheduleAppointment.date = appointment.date;
    this.scheduleAppointment.hour = appointment.hour;
    this.scheduleAppointment.userNamePatient = appointment.userNamePatient;
    this.scheduleAppointment.userNameProfessional = appointment.userNameProfessional;
    this.scheduleAppointment.freeAppointment = appointment.freeAppointment;
    this.appointmentsService.scheduleAppointment(this.scheduleAppointment)
      .subscribe(data => {
        this.router.navigate(['/'],
          {queryParams: {registered: 'true'}});
        this.toastr.success('Schedule successful!');
      }, error => {
        console.log(error);
        this.toastr.error('Schedule Failed! Please try again');
      });
  }
}
