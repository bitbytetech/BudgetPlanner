import { Component, computed, signal, OnInit, effect } from '@angular/core';
import { Router, RouterLink, RouterOutlet ,RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginResponseModel } from './models/LoginResponseModel';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected title = signal('mbp'); 
  userTokenData = signal<LoginResponseModel | null>(null);
   constructor(private router: Router) {
     effect(() => {
      const data = localStorage.getItem('userTokenData');
      this.userTokenData.set(data ? JSON.parse(data) : null);
    });
    }

  isLoggedIn = computed(() => {
    const user = this.userTokenData();
    return user ? user.isLoginSuccess : false;
  });
  ngOnInit(): void {
    this.loadUser();
    console.log('App isLoggedIn status ', this.isLoggedIn());
    const user = this.userTokenData();
  //    this.userName.set(user ? user.fullName : '');
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
    localStorage.removeItem('userTokenData');
    this.userTokenData.set(null);
    this.router.navigate(['/login']);
  }
}
