import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {ToastrService} from 'ngx-toastr';
import {RegisterRequestPayload} from './register-pet-request.payload';

@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.component.html',
  styleUrls: ['./register-pet.component.css']
})
export class RegisterPetComponent implements OnInit {
  petForm: any;
  focus: boolean;
  focus1: boolean;
  registerRequestPayload: RegisterRequestPayload;

  constructor(private authService: AuthService, private router: Router,
              private toastr: ToastrService) {
    this.registerRequestPayload = {
      name: '',
      species: '',
      breed: '',
      // birthday: '',
      sex: ''
    };
  }

  ngOnInit(): void {
    this.petForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(3)
      ]),
      species: new FormControl('', Validators.required),
      breed: new FormControl('', Validators.required),
      date_of_birth: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
    });
  }

  registerPet() {

    this.registerRequestPayload.name = this.petForm.get('name').value;
    this.registerRequestPayload.species = this.petForm.get('species').value;
    this.registerRequestPayload.breed = this.petForm.get('breed').value;
    // this.registerRequestPayload.birthday = this.petForm.get('birthday').value;
    this.registerRequestPayload.sex = this.petForm.get('sex').value;

    this.authService.registerPet(this.registerRequestPayload)
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
