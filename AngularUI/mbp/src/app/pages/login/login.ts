import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserAccoutService } from '../../services/user-accout-service';
 
@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.html',
    styleUrl: './login.scss',
    standalone: true,
})
export class Login {
  loginForm: FormGroup;
  notification = signal<string | null>(null);
  isSuccess = signal(false);
  isLoading = signal(false);

  constructor(private fb: FormBuilder, private userService: UserAccoutService, private router: Router) {
    this.loginForm = this.fb.group({
      loginName: ['', [Validators.required, Validators.email]],
      password: ['',
        [Validators.required,
        Validators.minLength(6),
        ]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.notification.set(null);
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          if (response && response.isLoginSuccess) {
            this.notification.set('Login successful!');
            this.isSuccess.set(true);
            setTimeout(() => this.router.navigate(['/categories-crud']), 1000);
          } else {
            this.notification.set(response?.message || 'Login failed. Please check your credentials.');
            this.isSuccess.set(false);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          this.notification.set('Something went wrong. Please try again.');
          this.isSuccess.set(false);
        }
      });
    }
  }
}
