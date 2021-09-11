import {Injectable, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequestPayload} from '../signup/signup-request.payload';
import {Observable, throwError} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {LoginRequestPayload} from '../login/login-request.payload';
import {LoginResponse} from '../login/login-response.payload';
import {map, tap} from 'rxjs/operators';
import {Users} from '../user-profile/user-profile.component';
import {RegisterRequestPayload} from '../register-pet/register-pet-request.payload';
import {UpdateRequestPayload} from '../modify-profile/modify-profile-request.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, {responseType: 'text'});
  }

  update(updateRequestPayload: UpdateRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/update/',
      updateRequestPayload, {responseType: 'text'});
  }

  registerPet(registerRequestPayload: RegisterRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/registerPet', registerRequestPayload, {responseType: 'text'});
  }

  deleteUser(nameUser: any) {
    return this.httpClient.delete(`http://localhost:8080/api/auth/settings/${nameUser}/`);
  }


  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

      this.loggedIn.emit(true);
      this.username.emit(data.username);
      return true;
    }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {
    this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
      {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  goToUserProfile(username: any) {
    return this.httpClient.get<Users>(`http://localhost:8080/api/auth/user-profile/${username}/`);
  }

  goToSettings(username: any) {
    return this.httpClient.get<Users>(`http://localhost:8080/api/auth/settings/${username}/`);
  }

  getUserProfileData(username: any) {
    return this.httpClient.get<Users>(`http://localhost:8080/api/auth/user-data/${username}/`);
  }
}
