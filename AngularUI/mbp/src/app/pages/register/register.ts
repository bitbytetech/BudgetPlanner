import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
// import { UserRegistrationServiceTsService } from '../../services/user-registration.service.ts.service';
// import { UserRegistrationModel } from '../../models/UserRegistrationModel'; // Import the UserRegistrationModel;
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

 
  registerForm: FormGroup;
  isSuccess = signal(false); // Using signal for isSuccess state
  notificationMessage = signal<string | null>(null); // For displaying notification messages


  // Define the form controls and their initial values

  constructor(private fb: FormBuilder,   private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['Ankit', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['Sahay', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phoneNumber: ['9999999999', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      email: ['Ankit.sahay1@example.com', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['Ankit.sahay1@example.com', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        this.createPasswordStrengthValidator()
      ]],
      confirmPassword: ['Ankit.sahay1@example.com', Validators.required],
      roles: ['2'] // Default role set to '1'
    }, { validators: this.passwordMatchValidator });
  }

  // Custom password strength validator
  private createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  // Custom validator to check if password and confirm password match
  private passwordMatchValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword
      ? { passwordMismatch: true }
      : null;
  };


  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
    }
  }
}
