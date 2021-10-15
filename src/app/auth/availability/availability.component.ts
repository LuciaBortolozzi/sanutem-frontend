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
  selectMonths: FormGroup;
  nameReceptionist: string;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.nameReceptionist = this.activatedRoute.snapshot.params.name;
    this.availabilityRequestPayload = {
      month: '',
      days: [],
      hours: [],
      nameReceptionist:''
    };
  }

  ngOnInit(): void {
    this.getMonths();
    /*this.availabilityForm = this.fb.group({
      selectMonths:[null]
    });*/
    this.availabilityForm = this.fb.group({
      selectMonths:[null],
      dayMonday: new FormControl('', Validators.required),
      dayTuesday: new FormControl('', Validators.required),
      dayWednesday: new FormControl('', Validators.required),
      dayThursday: new FormControl('', Validators.required),
      dayFriday: new FormControl('', Validators.required),
      daySaturday: new FormControl('', Validators.required),
      hours_range_1: new FormControl('', Validators.required),
      hours_range_2: new FormControl('', Validators.required),
      hours_range_3: new FormControl('', Validators.required),
      hours_range_4: new FormControl('', Validators.required),
      hours_range_5: new FormControl('', Validators.required),
      hours_range_6: new FormControl('', Validators.required),
      hours_range_7: new FormControl('', Validators.required),
      hours_range_8: new FormControl('', Validators.required),
      hours_range_9: new FormControl('', Validators.required),
      hours_range_10: new FormControl('', Validators.required),
      hours_range_11: new FormControl('', Validators.required),
      hours_range_12: new FormControl('', Validators.required),
      hours_range_13: new FormControl('', Validators.required)
    });
  }

  availability() {
    this.availabilityRequestPayload.month = this.availabilityForm.get('selectMonths').value;
    this.availabilityRequestPayload.days[0] = this.availabilityForm.get('dayMonday').value;
    this.availabilityRequestPayload.days[1] = this.availabilityForm.get('dayTuesday').value;
    this.availabilityRequestPayload.days[2] = this.availabilityForm.get('dayWednesday').value;
    this.availabilityRequestPayload.days[3] = this.availabilityForm.get('dayThursday').value;
    this.availabilityRequestPayload.days[4] = this.availabilityForm.get('dayFriday').value;
    this.availabilityRequestPayload.days[5] = this.availabilityForm.get('daySaturday').value;
    this.availabilityRequestPayload.hours[0] = this.availabilityForm.get('hours_range_1').value;
    this.availabilityRequestPayload.hours[1] = this.availabilityForm.get('hours_range_2').value;
    this.availabilityRequestPayload.hours[2] = this.availabilityForm.get('hours_range_3').value;
    this.availabilityRequestPayload.hours[3] = this.availabilityForm.get('hours_range_4').value;
    this.availabilityRequestPayload.hours[4] = this.availabilityForm.get('hours_range_5').value;
    this.availabilityRequestPayload.hours[5] = this.availabilityForm.get('hours_range_6').value;
    this.availabilityRequestPayload.hours[6] = this.availabilityForm.get('hours_range_7').value;
    this.availabilityRequestPayload.hours[7] = this.availabilityForm.get('hours_range_8').value;
    this.availabilityRequestPayload.hours[8] = this.availabilityForm.get('hours_range_9').value;
    this.availabilityRequestPayload.hours[9] = this.availabilityForm.get('hours_range_10').value;
    this.availabilityRequestPayload.hours[10] = this.availabilityForm.get('hours_range_11').value;
    this.availabilityRequestPayload.hours[11] = this.availabilityForm.get('hours_range_12').value;
    this.availabilityRequestPayload.hours[12] = this.availabilityForm.get('hours_range_13').value;
    this.availabilityRequestPayload.nameReceptionist = this.nameReceptionist;

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
