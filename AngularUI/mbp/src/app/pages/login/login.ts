import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
 
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

  constructor(private fb: FormBuilder,   private router: Router) {
    this.loginForm = this.fb.group({
      loginName: ['', [Validators.required, Validators.email]],
      password: ['',
        [Validators.required,
        Validators.minLength(6),
        ]]
    });
  }

    onSubmit() {}
}
