import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationModel, RegistrationResponseModel } from '../models/UserRegistrationModel';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationServiceTsService {
  private apiUrl = 'http://mbp.bitprosofttech.com/api/UserAccount/UserRegistration';
  constructor(private http: HttpClient) { }

  registerUser(user: UserRegistrationModel): Observable<RegistrationResponseModel> {
    return this.http.post<RegistrationResponseModel>(this.apiUrl, user);
  }


}
