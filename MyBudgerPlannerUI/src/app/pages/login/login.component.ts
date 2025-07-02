
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRegistrationServiceTsService } from '../../services/user-registration.service.ts.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  
})
export class LoginComponent {
  loginForm: FormGroup;
  notification = signal<string | null>(null);
  isSuccess = signal(false);
  isLoading = signal(false);

  constructor(private fb: FormBuilder, private userService: UserRegistrationServiceTsService, private router: Router) {
    this.loginForm = this.fb.group({
      loginName: ['', [Validators.required, Validators.email]],
      password: ['',  
        [Validators.required ,
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
          console.log('Login response:', response);
          this.isLoading.set(false);
          if (response && response.success) {
            this.notification.set('Login successful!');
            this.isSuccess.set(true);
            setTimeout(() => this.router.navigate(['/']), 1000);
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
