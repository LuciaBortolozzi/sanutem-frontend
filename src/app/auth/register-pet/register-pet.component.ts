import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.component.html',
  styleUrls: ['./register-pet.component.css']
})
export class RegisterPetComponent implements OnInit {
  petForm: any;
  focus: boolean;
  focus1: boolean;

  constructor(private activatedRoute: ActivatedRoute) {
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

  }

  onDateSelection($event: Event) {

  }
}
