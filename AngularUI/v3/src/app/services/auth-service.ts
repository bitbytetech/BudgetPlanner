import { Injectable, signal, computed, inject } from '@angular/core';
import { LoginResponseModel } from '../models/LoginResponseModel';
import { ApiEndpoints } from '../core/constants/api-endpoints';
import { Observable, tap } from 'rxjs';
import { RegistrationResponseModel, UserRegistrationModel } from '../models/UserRegistrationModel';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser: boolean;

  userTokenData = signal<LoginResponseModel | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadUser();
  }

  isLoggedIn = computed(() => !!this.userTokenData()?.isLoginSuccess);
 
  setUser(user: LoginResponseModel | null) {
    this.userTokenData.set(user);
    if (this.isBrowser) {
      if (user) {
        localStorage.setItem('userTokenData', JSON.stringify(user));
      } else {
        localStorage.removeItem('userTokenData');
      }
    }
  }

  loadUser() {
    if (this.isBrowser) {
      const data = localStorage.getItem('userTokenData');
      if (data) {
        try {
          this.userTokenData.set(JSON.parse(data));
        } catch {
          this.userTokenData.set(null);
        }
      } else {
        this.userTokenData.set(null);
      }
    }
  }

  logout() {
    this.setUser(null);
  }

  loginUser(credentials: { loginName: string; password: string }): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(ApiEndpoints.userAccount.login, credentials).pipe(
      tap(response => {
        if (response?.isLoginSuccess) {
          this.setUser(response);
        }
      })
    );
  }

  registerUser(user: UserRegistrationModel): Observable<RegistrationResponseModel> {
    return this.http.post<RegistrationResponseModel>(ApiEndpoints.userAccount.UserRegistration, user).pipe(
      tap(response => {
        if (response && response.isCreated) {
          this.loginUser({ loginName: user.email, password: user.password });
        }
      })
    );
  }

  
}
