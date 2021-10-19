import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppointmentsDataService} from '../services/appointments-data.service';

export class Appointments {
  constructor(
    public idAppointments: number,
    public date: string,
    public hour: string,
    public freeAppointment: boolean,
    public userNamePatient: string,
    public userNameProfessional: string
  ) {
  }
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  message: string;
  appointments: Appointments[];
  appointmentSelected: Appointments;
  nameUser: string;
  userNameProfessional: string;

  constructor(private appointmentsService: AppointmentsDataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.nameUser = this.activatedRoute.snapshot.params.name;
    // this.userNameProfessional =
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

  schedule(userNameProfessional: string, idAppointments: number) {
    this.appointmentSelected.freeAppointment = false;
    this.appointmentSelected.userNamePatient = this.nameUser;
    // updateAppointment(userNameProfessional, idAppointments);
  }
}
