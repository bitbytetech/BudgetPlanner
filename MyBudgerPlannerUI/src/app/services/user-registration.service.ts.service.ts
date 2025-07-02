import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationModel, RegistrationResponseModel } from '../models/UserRegistrationModel';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationServiceTsService {


  private loginUrl = 'http://mbp.bitprosofttech.com/api/UserAccount/Login'; 
  private apiUrl = 'http://mbp.bitprosofttech.com/api/UserAccount/UserRegistration';

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    var loginRequest = this.http.post<any>(this.loginUrl, credentials);
    console.log('Login request:', loginRequest);
    return loginRequest;
  }
  constructor(private http: HttpClient) { }

  registerUser(user: UserRegistrationModel): Observable<RegistrationResponseModel> {
    return this.http.post<RegistrationResponseModel>(this.apiUrl, user);
  }


}
