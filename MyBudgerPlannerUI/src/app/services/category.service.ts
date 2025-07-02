import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationModel, RegistrationResponseModel } from '../models/UserRegistrationModel';

@Injectable({ providedIn: 'root' })

export class CategoryService {
   constructor(private http: HttpClient) { }
  private _urls = {
    categoriesUrl: 'http://mbp.bitprosofttech.com/api/Categories',

  };
  
  loginUser(credentials: { email: string; password: string }): Observable<any> {
     return this.http.get<any>(this._urls.categoriesUrl);
   }
}
 