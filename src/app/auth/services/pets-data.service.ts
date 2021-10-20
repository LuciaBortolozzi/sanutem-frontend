import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pets} from '../manage-pets/manage-pets.component';
import {Users} from '../user-profile/user-profile.component';

@Injectable({
  providedIn: 'root'
})
export class PetsDataService {

  constructor(private http: HttpClient) {
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
