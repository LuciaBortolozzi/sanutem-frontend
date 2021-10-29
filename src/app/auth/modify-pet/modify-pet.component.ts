import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-modify-pet',
  templateUrl: './modify-pet.component.html',
  styleUrls: ['./modify-pet.component.css']
})
export class ModifyPetComponent implements OnInit {
  updateForm: any;
  focus: boolean;
  focus1: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  update() {

  }

  onDateSelection($event: Event) {

  }
}
