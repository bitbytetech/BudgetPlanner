import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-component',
  imports: [ CommonModule, RouterLink, RouterLinkActive ],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.scss',
})
export class MenuComponent {
   constructor( public auth: AuthService, private router: Router) {}
}



