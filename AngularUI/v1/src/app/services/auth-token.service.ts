import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  getAuthData(): any {
    const authData = localStorage.getItem('userTokenData');
    return authData ? JSON.parse(authData) : null;
  }

  getToken(): string | null {
    const authData = this.getAuthData();
    return authData?.token || null; // ✅ Extract token when needed
  }

  clearAuthData() {
    localStorage.removeItem('authData');
  }
}

