import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserRegistrationModel, RegistrationResponseModel } from '../models/UserRegistrationModel';
import { ApiEndpoints } from '../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserAccoutService {

  constructor(private http: HttpClient) { }

 

  loginUser(credentials: { loginName: string; password: string }): Observable<any> {
    return this.http.post<any>(ApiEndpoints.userAccount.login, credentials).pipe(
      tap(response => {console.log('Login response:', response);
        // Store the authentication data in local storage if login is successful
        if (response && response.isLoginSuccess) {
          localStorage.setItem('userTokenData', JSON.stringify(response));
        }
      })
    );
  }
  
  registerUser(user: UserRegistrationModel): Observable<RegistrationResponseModel> {
    return this.http.post<RegistrationResponseModel>(ApiEndpoints.userAccount.UserRegistration, user);
  }


}

