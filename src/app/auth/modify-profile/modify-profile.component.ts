import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../shared/auth.service';
import {UpdateRequestPayload} from './modify-profile-request.payload';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

export class Users{
  constructor(

    public id:string,
    public dni:string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public sex: string,
    public birthday: string,
    public password: string,
    public created: string,
    public enabled: string,
    public role: string = null,
    public address: string) {
  }
}

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent implements OnInit {
  updateProfile: UpdateRequestPayload;
  updateForm: FormGroup;
  focus: boolean;
  focus1: boolean;
  name: string;

  user : Users;
  emailUser:string;
  passwordUser:string;
  firstNameUser:string;
  lastNameUser:string;
  addressUser:string;
  userNameUser:string;
  dniUser:string;
  // birthdayUser:string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    this.name = this.activatedRoute.snapshot.params.name;
    this.updateProfile = {
      // username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      // dni: '',
      address: '',
      birthday: '',
      // sex: '',
      // role: '',
      blood_type: '',
      medical_history: '',
      surgeries: '',
      medicines: '',
      license_number: '',
      specialization: ''
    }
  }

  ngOnInit() {
    this.getUserProfileData();
    this.updateForm = new FormGroup({
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
      blood_type: new FormControl('', Validators.required),
      medical_history: new FormControl('', Validators.required),
      surgeries: new FormControl('', Validators.required),
      medicines: new FormControl('', Validators.required),
      license_number: new FormControl('', Validators.required),
      specialization: new FormControl('', Validators.required),
    });
  }

  update() {
    this.updateProfile.email = this.updateForm.get('email').value;
    // this.updateProfile.username = this.updateForm.get('username').value;
    this.updateProfile.password = this.updateForm.get('password').value;
    this.updateProfile.firstName = this.updateForm.get('firstName').value;
    this.updateProfile.lastName = this.updateForm.get('lastName').value;
    // this.updateProfile.dni = this.updateForm.get('dni').value;
    this.updateProfile.address = this.updateForm.get('address').value;
    // this.updateProfile.birthday = this.updateForm.get('birthday').value;
    // this.updateProfile.sex = this.updateForm.get('sex').value;
    // this.updateProfile.role = this.updateForm.get('role').value;
    this.updateProfile.blood_type = this.updateForm.get('blood_type').value;
    this.updateProfile.medical_history = this.updateForm.get('medical_history').value;
    this.updateProfile.surgeries = this.updateForm.get('surgeries').value;
    this.updateProfile.medicines = this.updateForm.get('medicines').value;
    this.updateProfile.license_number = this.updateForm.get('license_number').value;
    this.updateProfile.specialization = this.updateForm.get('specialization').value;

    this.authService.update(this.updateProfile)
      .subscribe(data => {
        this.router.navigate(['/'],
          {queryParams: {registered: 'true'}});
      }, error => {
        console.log(error);
        this.toastr.error('Update Failed! Please try again');
      });
  }

  onDateSelection($event: Event) {

  }

    getUserProfileData() {
      this.authService.getUserProfileData(this.name).subscribe(response => {
        this.user = response;
        console.log('email' + this.user.email);
        this.userNameUser = this.user.username;
        this.dniUser = this.user.dni;
        this.emailUser = this.user.email;
        this.passwordUser = this.user.password;
        this.firstNameUser = this.user.firstName;
        this.lastNameUser = this.user.lastName;
        console.log('direccion' + this.user.address);
        this.addressUser = this.user.address;
        // roleUser -> way to avoid some errors in the web console
        // this.roleUser = this.user.role;
        // this.router.navigateByUrl('/user-profile/' + this.username);
      });
    }
}
