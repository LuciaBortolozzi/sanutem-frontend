import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pets, Users} from '../model/model';
import {UpdatePetRequestPayload} from './modify-pet-request.payload';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {PetsDataService} from '../services/pets-data.service';

@Component({
  selector: 'app-modify-pet',
  templateUrl: './modify-pet.component.html',
  styleUrls: ['./modify-pet.component.css']
})
export class ModifyPetComponent implements OnInit {
  updatePet: UpdatePetRequestPayload;
  updateForm: FormGroup;
  focus: boolean;
  focus1: boolean;
  name: string;
  idPet: string;
  user: Users;
  pets: Pets;
  public namePet: string;
  public speciesPet: string;
  public breedPet: string;
  public sexPet: string;
  public medicalHistoryPet: string;
  public surgeriesPet: string;
  public medicinesPet: string;

  constructor(private activatedRoute: ActivatedRoute,
              private petsService: PetsDataService,
              private router: Router,
              private toastr: ToastrService) {
    this.name = this.activatedRoute.snapshot.params.name;
    this.idPet = this.activatedRoute.snapshot.params.id;
    this.updatePet = {
      nameUser: '',
      idPet: '',
      pet: '',
      species: '',
      breed: '',
      sex: '',
      medicalHistory: '',
      surgeries: '',
      medicines: ''
    }
  }

  ngOnInit(): void {
    this.getPet();
    this.updateForm = new FormGroup({
      pet: new FormControl('', Validators.required),
      species: new FormControl('', Validators.required),
      breed: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      medicalHistory: new FormControl('', Validators.required),
      surgeries: new FormControl('', Validators.required),
      medicines: new FormControl('', Validators.required),
    });
  }

  update() {

    if (this.updateForm.get('pet').value === '') {
      this.updatePet.pet = this.namePet;
    } else {
      this.updatePet.pet = this.updateForm.get('pet').value;
    }
    this.updatePet.nameUser = this.name;
    this.updatePet.idPet = this.idPet;
    if (this.updateForm.get('species').value === '') {
      this.updatePet.species = this.speciesPet;
    } else {
      this.updatePet.species = this.updateForm.get('species').value;
    }

    if (this.updateForm.get('breed').value === '') {
      this.updatePet.breed = this.breedPet;
    } else {
      this.updatePet.breed = this.updateForm.get('breed').value;
    }

    if (this.updateForm.get('sex').value === '') {
      this.updatePet.sex = this.sexPet;
    } else {
      this.updatePet.sex = this.updateForm.get('sex').value;
    }

    if (this.updateForm.get('medicalHistory').value === '') {
      this.updatePet.medicalHistory = this.medicalHistoryPet;
    } else {
      this.updatePet.medicalHistory = this.updateForm.get('medicalHistory').value;
    }

    if (this.updateForm.get('surgeries').value === '') {
      this.updatePet.surgeries = this.surgeriesPet;
    } else {
      this.updatePet.surgeries = this.updateForm.get('surgeries').value;
    }

    if (this.updateForm.get('medicines').value === '') {
      this.updatePet.medicines = this.medicinesPet;
    } else {
      this.updatePet.medicines = this.updateForm.get('medicines').value;
    }

    this.petsService.updatePet(this.updatePet)
      .subscribe(data => {
        this.router.navigate(['/'],
          {queryParams: {registered: 'true'}});
        this.toastr.success('Update successful!');
      }, error => {
        console.log(error);
        this.toastr.error('Update Failed! Please try again');
      });

  }

  onDateSelection($event: Event) {
  }

  getPet() {
    this.petsService.retrievePet(this.name, this.idPet).subscribe(
      response => {
        this.pets = response;
        console.log(this.pets.name);
        this.namePet = this.pets.name;
        this.speciesPet = this.pets.species;
        this.breedPet = this.pets.breed;
        this.sexPet = this.pets.sex;
        this.medicalHistoryPet = this.pets.medicalHistory;
        this.surgeriesPet = this.pets.surgeries;
        this.medicinesPet = this.pets.medicines;
      }
    );
  }
}
