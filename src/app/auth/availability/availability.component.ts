import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AvailabilityRequestPayload} from './availability-request-payload';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  availabilityRequestPayload: AvailabilityRequestPayload;
  availabilityForm: FormGroup;
  focus: boolean;
  months: string[];

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.availabilityRequestPayload = {
      month: '',
      days: [],
      hours: []
    };
  }

  ngOnInit(): void {
    this.getMonths();
    /*this.availabilityForm = this.fb.group({
      selectMonths:[null]
    });*/
    this.availabilityForm = new FormGroup({
      selectMonths: new FormControl('', Validators.required),
      days: new FormControl('', Validators.required),
      hours: new FormControl('', Validators.required),
    });
  }

  availability() {
    this.availabilityRequestPayload.month = this.availabilityForm.get('month').value;
    this.availabilityRequestPayload.days = this.availabilityForm.get('days').value;
    this.availabilityRequestPayload.hours = this.availabilityForm.get('hours').value;

    this.authService.availability(this.availabilityRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/'],
          {queryParams: {registered: 'true'}});
        this.toastr.success('Added Successfully');
      }, error => {
        console.log(error);
        this.toastr.error('Failed. Please try again');
      });

  }

  getMonths() {
    this.authService.getMonths().subscribe(response => {
      this.months = response;
    });
  }
}
