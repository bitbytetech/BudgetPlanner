import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup;
  notification = signal<string | null>(null);
  isSuccess = signal(false);
  isLoading = signal(false);
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['Ankit', [Validators.required]],
      lastName: ['Sahay', [Validators.required]],
      email : ['Ankit.sahay1@example.com', [Validators.required, Validators.email]],
      password: ['Ankit.sahay1@example.com',[Validators.required,Validators.minLength(6),]]
    });

     }
}
