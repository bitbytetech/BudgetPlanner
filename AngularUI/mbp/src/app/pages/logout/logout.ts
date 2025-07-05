import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '',
  standalone: true
})
export class Logout {
  constructor(private router: Router) {
    localStorage.removeItem('userTokenData');
    this.router.navigate(['/login']);
  }
}
