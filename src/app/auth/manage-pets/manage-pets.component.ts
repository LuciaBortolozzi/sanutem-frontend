import {Component, OnInit} from '@angular/core';
import {PetsDataService} from '../services/pets-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Pets} from '../model/model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-manage-pets',
  templateUrl: './manage-pets.component.html',
  styleUrls: ['./manage-pets.component.css']
})
export class ManagePetsComponent implements OnInit {
  message: string;
  pets: Pets[];
  nameUser: string;

  constructor(private petsService: PetsDataService, private router: Router,
              private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
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
    this.router.navigate(['pets', id])
  }

  deletePet(id) {
    this.petsService.deletePet(this.nameUser, id).subscribe(
      response => {
        this.message = `Delete of Pet ${id} Successful!`;
        this.refreshPets();}
    );
  }

  addPet() {
    this.router.navigate(['pets', -1])
  }
}
