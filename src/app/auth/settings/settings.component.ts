import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Users} from '../model/model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  nameUser: string;
  user: Users;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService,
              private router: Router, private toastr: ToastrService) {
    this.nameUser = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void {
    this.goToSettings();
  }

  goToSettings() {
    this.authService.goToSettings(this.nameUser).subscribe(response => {
      this.user = response;
    });
  }

  deleteUser(){
    this.authService.deleteUser(this.nameUser).subscribe(
      response=>{
        this.router.navigate(['/'],
          {queryParams: {registered: 'true'}});
        this.toastr.success('Delete Successful');
      }, error => {
        console.log(error);
        this.toastr.error('Delete Failed! Please try again');
      });
  }
}
