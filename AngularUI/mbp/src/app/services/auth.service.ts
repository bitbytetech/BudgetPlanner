import { Injectable, signal, computed } from '@angular/core';
import { LoginResponseModel } from '../models/LoginResponseModel';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userTokenData = signal<LoginResponseModel | null>(null);

  constructor() {
    this.loadUser();
  }

  isLoggedIn = computed(() => {
    const user = this.userTokenData();
    return user ? user.isLoginSuccess : false;
  });

  setUser(user: LoginResponseModel | null) {
    this.userTokenData.set(user);
    if (user) {
      localStorage.setItem('userTokenData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userTokenData');
    }
  }

  loadUser() {
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

  logout() {
    this.setUser(null);
  }
}
