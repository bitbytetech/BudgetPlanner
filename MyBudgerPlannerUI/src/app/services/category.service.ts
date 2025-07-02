import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationModel, RegistrationResponseModel } from '../models/UserRegistrationModel';

@Injectable({ providedIn: 'root' })

export class CategoryService {
   constructor(private http: HttpClient) { }
  private _urls = {
    loginUrl: 'http://mbp.bitprosofttech.com/api/UserAccount/Login',
    registerUrl: 'http://mbp.bitprosofttech.com/api/UserAccount/UserRegistration',
    categoriesUrl: 'http://mbp.bitprosofttech.com/api/Categories',

  };
  
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    var loginRequest = this.http.get<any>(this._urls.categoriesUrl);
    console.log('Login request:', loginRequest);
    return loginRequest;
  }
}
 