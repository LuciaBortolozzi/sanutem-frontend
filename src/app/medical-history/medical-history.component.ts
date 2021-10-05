import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

export class MedicalHistory {
  constructor(
    public idMedicalHistory: string,
    public idPatient: string,
    public date: string,
    public details: string) {
  }
}

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  searchForm: FormGroup;
  patients: string[];
  medicalHistory: MedicalHistory[];
  selectPatient: FormGroup;
  searchPatient: any;
  searchedFlag: boolean;
  addFlag: boolean;
  medHistory: MedicalHistory;

  constructor() {
  }

  ngOnInit(): void {
    this.addFlag = false;
    this.searchedFlag = false;
  }

  search() {
    this.searchedFlag = true;
    this.addFlag = false;
  }

  searched() {
    this.addFlag = false;
    this.searchedFlag = true;
  }

  add() {
    this.addFlag = true;
    this.searchedFlag = false;
  }

  saveMedHistory() {
    return false;
  }
}
