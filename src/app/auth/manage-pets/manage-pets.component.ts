import {Component, OnInit} from '@angular/core';
import {PetsDataService} from '../services/pets-data.service';
import {ActivatedRoute, Router} from '@angular/router';

export class Pets {
  constructor(
    public id: number,
    public name: string,
    public sex: string,
    public birthday: Date,
    public species: string,
    public breed: string,
    public medicalHistory: string,
    public surgeries: string,
    public medicines: string
  ) {
  }
}

@Component({
  selector: 'app-manage-pets',
  templateUrl: './manage-pets.component.html',
  styleUrls: ['./manage-pets.component.css']
})
export class ManagePetsComponent implements OnInit {
  message: string;
  pets: Pets[];
  nameUser: string;

  constructor(private petsService: PetsDataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.nameUser = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void {
    this.refreshPets();
  }

  refreshPets() {
    this.petsService.retrieveAllPets(this.nameUser).subscribe(
      response => {
        this.pets = response;
      }
    );
  }

  updatePet(id) {
    console.log(`update ${id}`)
    this.router.navigate(['pets', id])
  }

  deletePet(id) {
    console.log(`Delete ${id}`);
    this.petsService.deletePet(this.nameUser, id).subscribe(
      response => {
        console.log(response);
        this.message = 'Delete successful';
        this.refreshPets();
      }
    );
  }

  addPet() {
    this.router.navigate(['pets', -1])
  }
}
