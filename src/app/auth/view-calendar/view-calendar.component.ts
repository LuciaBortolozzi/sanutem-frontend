import {Component, OnInit} from '@angular/core';
import {AppointmentsDataService} from '../services/appointments-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Appointments} from '../model/model';

@Component({
  selector: 'app-view-calendar',
  templateUrl: './view-calendar.component.html',
  styleUrls: ['./view-calendar.component.css']
})
export class ViewCalendarComponent implements OnInit {
  message: string;
  appointments: Appointments[];
  userNameProfessional: string;

  constructor(private appointmentsService: AppointmentsDataService, private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.userNameProfessional = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void {
    this.refreshAppointments();
  }

  refreshAppointments() {
    this.appointmentsService.retrieveAllScheduledAppointments(this.userNameProfessional).subscribe(
      response => {
        this.appointments = response;
      }
    );
  }
}
