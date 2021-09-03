import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {SignupRequestPayload} from './singup-request.payload';
import {AuthService} from '../shared/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {toJSDate} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

declare let $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;
  focus: boolean;
  focus1: boolean;
  model: any;

  /*  username: FormControl;
    email: FormControl;
    password: FormControl;
    firstName: FormControl;
    lastName: FormControl;
    dni: FormControl;
    address: FormControl;
    birthday: FormControl;
    sex: FormControl;*/

  constructor(private authService: AuthService, private router: Router,
              private toastr: ToastrService) {
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dni: '',
      address: '',
      birthday: '',
      sex: '',
      role: '',
      blood_type: '',
      medical_history: '',
      surgeries: '',
      medicines: '',
      license_number: '',
      specialization: ''
    };
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(5)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(5)
      ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });

    /*$(() => {
      $('#birthday').birthday({
        changeMonth: true,
        changeYear: true,
        yearRange: '1920:2021',
        onSelect: (dateText) => {
          this.birthday.setValue(dateText);
        }
      });
    });*/
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.firstName = this.signupForm.get('firstName').value;
    this.signupRequestPayload.lastName = this.signupForm.get('lastName').value;
    this.signupRequestPayload.dni = this.signupForm.get('dni').value;
    this.signupRequestPayload.address = this.signupForm.get('address').value;
    // this.signupRequestPayload.birthday = this.signupForm.get('birthday').value;
    this.signupRequestPayload.sex = this.signupForm.get('sex').value;
    this.signupRequestPayload.role = this.signupForm.get('role').value;
    this.signupRequestPayload.blood_type = this.signupForm.get('blood_type').value;
    this.signupRequestPayload.medical_history = this.signupForm.get('medical_history').value;
    this.signupRequestPayload.surgeries = this.signupForm.get('surgeries').value;
    this.signupRequestPayload.medicines = this.signupForm.get('medicines').value;
    this.signupRequestPayload.license_number = this.signupForm.get('license_number').value;
    this.signupRequestPayload.specialization = this.signupForm.get('specialization').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/login'],
          {queryParams: {registered: 'true'}});
      }, error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
  }

  onDateSelection($event: Event) {
  }

  /*get birthday() {
    return this.signupForm.get('birthday');
  }*/
}
