import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pets} from '../model/model';
import {RegisterPetRequestPayload} from '../register-pet/register-pet-request.payload';
import {Observable} from 'rxjs';
import {UpdatePetRequestPayload} from '../modify-pet/modify-pet-request.payload';

@Injectable({
  providedIn: 'root'
})
export class PetsDataService {

  constructor(private http: HttpClient) {
  }

  registerPet(registerPetRequestPayload: RegisterPetRequestPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/registerPet', registerPetRequestPayload, {responseType: 'text'});
  }

  retrieveAllPets(username: string) {
    return this.http.get<Pets[]>(`http://localhost:8080/api/auth/user-profile/${username}/pets`);
  }

  retrievePet(username: string, id: string) {
    return this.http.get<Pets>(`http://localhost:8080/api/auth/user-profile/${username}/pets/${id}`);
  }

  deletePet(username: string, id: number) {
    return this.http.delete(`http://localhost:8080/api/auth/user-profile/${username}/pets/${id}/`, {responseType: 'text'});
  }

  updatePet(updatePetRequestPayload: UpdatePetRequestPayload): Observable<any> {
    return this.http.post(
      `http://localhost:8080/api/auth/user-profile/pets/update`, updatePetRequestPayload, {responseType: 'text'});
  }
}
