import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignupRequestPayload } from './singup-request.payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  today: Date;

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
      birthday: this.today,
      sex: ''
    };
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
    });
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.firstName = this.signupForm.get('firstName').value;
    this.signupRequestPayload.lastName = this.signupForm.get('lastName').value;
    this.signupRequestPayload.dni = this.signupForm.get('dni').value;
    this.signupRequestPayload.address = this.signupForm.get('address').value;
    this.signupRequestPayload.birthday = this.signupForm.get('birthday').value;
    this.signupRequestPayload.sex = this.signupForm.get('sex').value;

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
}
