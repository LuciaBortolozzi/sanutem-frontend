import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pets} from '../model/model';
import {RegisterPetRequestPayload} from '../register-pet/register-pet-request.payload';
import {Observable} from 'rxjs';

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

    deletePet(username: string, id: number) {
        return this.http.delete(`http://localhost:8080/api/auth/user-profile/${username}/pets/${id}`);
    }

    retrievePet(username: string, id: number) {
    return this.http.get<Pets>(`http://localhost:8080/api/auth/user-profile/${username}/pets/${id}`);
  }

  updatePet(username: string, id: number, pet: Pets) {
    return this.http.put(
      `http://localhost:8080/api/auth/user-profile/${username}/pets/${id}`, pet);
  }

}
