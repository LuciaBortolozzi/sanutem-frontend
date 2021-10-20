import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/shared/auth.service';
import {SearchRequestPayload} from './search-request.payload';
import {ToastrService} from 'ngx-toastr';

export class Users {
  constructor(
    public id: string,
    public dni: string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public sex: string,
    public birthday: string,
    public password: string,
    public created: string,
    public enabled: string,
    public role: string = null,
    public address: string) {
  }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private name: string;
  provinces: string[];
  specializations: string[];
  healthInsurances: string[];
  searchForm: FormGroup;
  selectSpecializations: FormGroup;
  selectProvinces: FormGroup;
  selectHealthInsurance: FormGroup;
  searchProfessional: SearchRequestPayload;
  users: Users[];
  private searchedFlag = false;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService,
              private router: Router, private toastr: ToastrService, private fb: FormBuilder) {
    this.name = this.activatedRoute.snapshot.params.name;
    console.log()
    this.searchProfessional = {
      specializationsName: '',
      provincesName: '',
      healthInsurancesName: ''
    }
  }

  ngOnInit(): void {
    this.getProvinces();
    this.getSpecializations();
    this.getHealthInsurances();

    this.searchForm = this.fb.group({

      selectSpecializations:[null],
      selectProvinces:[null],
      selectHealthInsurance:[null]
    });
  }

  search() {

      this.searchProfessional.specializationsName = this.searchForm.get('selectSpecializations').value;
      this.searchProfessional.provincesName = this.searchForm.get('selectProvinces').value;
      this.searchProfessional.healthInsurancesName = this.searchForm.get('selectHealthInsurance').value;

    this.authService.search(this.searchProfessional.specializationsName,
      this.searchProfessional.provincesName, this.searchProfessional.healthInsurancesName)
      .subscribe(response => {
        this.users = response;
        console.log(this.users);
      });
    this.searchedFlag = true;
  }

  getProvinces() {
    this.authService.getProvinces().subscribe(response => {
      this.provinces = response;
    });
  }

  getSpecializations() {
    this.authService.getSpecializations().subscribe(response => {
      this.specializations = response;
    });
  }

  getHealthInsurances() {
    this.authService.getHealthInsurances().subscribe(response => {
      this.healthInsurances = response;
    });
  }

  searched(): boolean {
    return this.searchedFlag;
  }

  schedule(usernameProf: string) {
    this.router.navigate([`/user-profile/${this.name}/search/${usernameProf}/schedule`]);
  }
}
