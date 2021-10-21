import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {RegisterPetRequestPayload} from './register-pet-request.payload';
import {PetsDataService} from '../services/pets-data.service';

@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.component.html',
  styleUrls: ['./register-pet.component.css']
})
export class RegisterPetComponent implements OnInit {
  nameUser: string;
  petForm: FormGroup;
  focus: boolean;
  focus1: boolean;
  registerPetRequestPayload: RegisterPetRequestPayload;
  year: string;
  month: string;
  day: string;

  constructor(private petsService: PetsDataService, private router: Router,
              private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.nameUser = this.activatedRoute.snapshot.params.name;
    this.registerPetRequestPayload = {
      name: '',
      species: '',
      breed: '',
      birthday: '',
      sex: '',
      medical_history: '',
      surgeries: '',
      medicines: '',
      nameUser: ''
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
      birthday: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      medical_history: new FormControl('', Validators.required),
      surgeries: new FormControl('', Validators.required),
      medicines: new FormControl('', Validators.required),
    });
  }

  registerPet() {

    this.registerPetRequestPayload.name = this.petForm.get('name').value;
    this.registerPetRequestPayload.species = this.petForm.get('species').value;
    this.registerPetRequestPayload.breed = this.petForm.get('breed').value;

    this.year = this.petForm.get('birthday').value.year;
    if (Number(this.petForm.get('birthday').value.month) < 10) {
      this.month = '0' + this.petForm.get('birthday').value.month;
    } else {
      this.month = this.petForm.get('birthday').value.month;
    }
    if (Number(this.petForm.get('birthday').value.day) < 10) {
      this.day = '0' + this.petForm.get('birthday').value.day;
    } else {
      this.day = this.petForm.get('birthday').value.day;
    }
    this.registerPetRequestPayload.birthday =
      this.year + '-' +
      this.month + '-' +
      this.day;

    this.registerPetRequestPayload.sex = this.petForm.get('sex').value;
    this.registerPetRequestPayload.medical_history = this.petForm.get('medical_history').value;
    this.registerPetRequestPayload.surgeries = this.petForm.get('surgeries').value;
    this.registerPetRequestPayload.medicines = this.petForm.get('medicines').value;
    this.registerPetRequestPayload.nameUser = this.nameUser;

    this.petsService.registerPet(this.registerPetRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/'],
          {queryParams: {registered: 'true'}});
        this.toastr.success('Registration Successful');
      }, error => {
        console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
  }

  onDateSelection($event: Event) {
    console.log('selected');
  }
}
