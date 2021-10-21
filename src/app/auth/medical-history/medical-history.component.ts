import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SearchPatientRequestPayload} from './search-patient-request.payload';
import {AddPatientInfoRequestPayload} from './add-patient-info-request.payload';

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
  medHistoryForm: FormGroup;
  searchPatient: SearchPatientRequestPayload;
  addPatientInfoRequestPayload: AddPatientInfoRequestPayload;
  searchedFlag: boolean;
  addFlag: boolean;
  medHistory: MedicalHistory;
  private name: string;
  focus: boolean;
  year: string;
  month: string;
  day: string;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService,
              private router: Router, private toastr: ToastrService, private fb: FormBuilder, private fb2: FormBuilder) {
    this.name = this.activatedRoute.snapshot.params.name;
    this.searchPatient = {
      patientsName: ''
    }
    this.addPatientInfoRequestPayload = {
      date: '',
      details: '',
      patientName: ''
    }
  }

  ngOnInit(): void {
    this.addFlag = false;
    this.searchedFlag = false;
    this.getPatients();

    this.searchForm = this.fb.group({
      selectPatient:[null]
    });

    this.medHistoryForm = this.fb2.group({
      date: new FormControl('', Validators.required),
      details: new FormControl('', Validators.required),
    });
  }

  search() {
    this.searchedFlag = true;
    this.addFlag = false;
    this.searchPatient.patientsName = this.searchForm.get('selectPatient').value;

    this.authService.searchPatient(this.searchPatient.patientsName)
      .subscribe(response => {
        this.medicalHistory = response;
      });
    this.searchedFlag = true;
  }
  add(){
    this.addFlag = true;
    this.searchedFlag = false;
  }

  saveMedHistory() {
    console.log('in saveMedHistory');
    this.year = this.medHistoryForm.get('date').value.year;
    if (Number(this.medHistoryForm.get('date').value.month) < 10) {
      this.month = '0' + this.medHistoryForm.get('date').value.month;
    } else {
      this.month = this.medHistoryForm.get('date').value.month;
    }
    if (Number(this.medHistoryForm.get('date').value.day) < 10) {
      this.day = '0' + this.medHistoryForm.get('date').value.day;
    } else {
      this.day = this.medHistoryForm.get('date').value.day;
    }
    this.addPatientInfoRequestPayload.date =
      this.year + '-' +
      this.month + '-' +
      this.day;

    this.addPatientInfoRequestPayload.details = this.medHistoryForm.get('details').value;
    console.log(this.addPatientInfoRequestPayload.details);
    this.addPatientInfoRequestPayload.patientName = this.searchForm.get('selectPatient').value;

    this.authService.saveMedHistory(this.addPatientInfoRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/'],
          {queryParams: {registered: 'true'}});
        this.toastr.success('Added Successfully');
      }, error => {
        console.log(error);
        this.toastr.error('Failed. Please try again');
      });

  }

  getPatients() {
    this.authService.getPatients(this.name).subscribe(response => {
      this.patients = response;
    });
  }

  onDateSelection($event: Event) {
    console.log('selected');
  }
}
