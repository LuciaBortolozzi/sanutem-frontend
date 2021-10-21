import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../shared/auth.service';
import {UpdateRequestPayload} from './modify-profile-request.payload';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Users} from '../model/model';

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
  user: Users;
  public emailUser: string;
  public passwordUser: string;
  public firstNameUser: string;
  public lastNameUser: string;
  public addressUser: string;
  public userNameUser: string;
  public dniUser: string;
  public sexUser: string;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
    this.name = this.activatedRoute.snapshot.params.name;
    this.updateProfile = {
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      // dni: '',
      homeAddress: '',
      // birthday: '',
      sex: '',
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
    if (this.updateForm.get('email').value === '') {
      this.updateProfile.email = this.emailUser;
    } else {
      this.updateProfile.email = this.updateForm.get('email').value;
    }
    // this.updateProfile.username = this.updateForm.get('username').value;
    this.updateProfile.username = this.name;
    this.updateProfile.password = this.updateForm.get('password').value;
    if (this.updateForm.get('firstName').value === '') {
      this.updateProfile.firstName = this.firstNameUser;
    } else {
      this.updateProfile.firstName = this.updateForm.get('firstName').value;
    }
    if (this.updateForm.get('lastName').value === '') {
      this.updateProfile.lastName = this.lastNameUser;
    } else {
      this.updateProfile.lastName = this.updateForm.get('lastName').value;
    }
    // this.updateProfile.dni = this.updateForm.get('dni').value;
    if (this.updateForm.get('address').value === '') {
      this.updateProfile.homeAddress = this.addressUser;
    } else {
      this.updateProfile.homeAddress = this.updateForm.get('address').value;
    }
    if (this.updateForm.get('sex').value === '') {
      this.updateProfile.sex = this.sexUser;
    } else {
      this.updateProfile.sex = this.updateForm.get('sex').value;
    }
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
        this.toastr.success('Update successful!');
      }, error => {
        console.log(error);
        this.toastr.error('Update Failed! Please try again');
      });
  }

  getUserProfileData() {
    this.authService.getUserProfileData(this.name).subscribe(response => {
      this.user = response;
      this.userNameUser = this.user.username;
      this.dniUser = this.user.dni;
      this.emailUser = this.user.email;
      this.passwordUser = this.user.password;
      this.firstNameUser = this.user.firstName;
      this.lastNameUser = this.user.lastName;
      this.addressUser = this.user.homeAddress;
      this.sexUser = this.user.sex;
      // this.router.navigateByUrl('/user-profile/' + this.username);
    });
  }
}
