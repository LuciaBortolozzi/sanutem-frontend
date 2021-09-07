import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../shared/auth.service';

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
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private name: string;
  user: Users;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.name = this.activatedRoute.snapshot.params.name;
  }

  ngOnInit(): void {
    this.goToSettings();
  }

  goToSettings() {
    this.authService.goToSettings(this.name).subscribe(response => {
      this.user = response;
    });
  }
}
