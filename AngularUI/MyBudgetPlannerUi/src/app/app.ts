import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet ,RouterLinkActive} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth-service';
import { MenuComponent } from "./components/menu-component/menu-component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
 
export class App   {
   constructor( public auth: AuthService,   private router: Router) {}
 
  protected title = 'MyBudgetPlannerUi';

  get userTokenData() {
     return this.auth.userTokenData();
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
