import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'mbp';

  userTokenData = signal<any | null>(null);
  isLoggedIn = computed(() => !!this.userTokenData()?.isLoginSuccess);
  userName = computed(() => {
    const data = this.userTokenData();
    if (data && data.user) {
      return data.user.firstName || data.user.email || 'User';
    }
    return '';
  });

  constructor() {
    this.loadUser();
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
}
