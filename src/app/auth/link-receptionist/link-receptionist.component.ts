import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LinkReceptionistRequestPayload} from './link-receptionist-request-payload';

@Component({
  selector: 'app-link-receptionist',
  templateUrl: './link-receptionist.component.html',
  styleUrls: ['./link-receptionist.component.css']
})
export class LinkReceptionistComponent implements OnInit {

  linkReceptionistForm: FormGroup;
  nameUser: string;
  focus: boolean;
  linkReceptionistRequestPayload: LinkReceptionistRequestPayload;

  constructor(private authService: AuthService, private router: Router,
              private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.nameUser = this.activatedRoute.snapshot.params.name;
    this.linkReceptionistRequestPayload = {
      idReceptionist: '',
      nameProf: ''
    };
  }

  ngOnInit(): void {
    this.linkReceptionistForm = new FormGroup({
      idReceptionist: new FormControl('', Validators.required)
    });
  }

  linkReceptionist() {

    this.linkReceptionistRequestPayload.idReceptionist = this.linkReceptionistForm.get('idReceptionist').value;
    this.linkReceptionistRequestPayload.nameProf = this.nameUser;

    this.authService.linkReceptionist(this.linkReceptionistRequestPayload)
      .subscribe(data => {
        this.router.navigate(['/'],
          {queryParams: {registered: 'true'}});
        this.toastr.success('Link Successful');
      }, error => {
        console.log(error);
        this.toastr.error('Link Failed! Please try again');
      });
  }

}
