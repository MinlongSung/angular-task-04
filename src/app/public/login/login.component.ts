import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  loginForm!: FormGroup;
  userNameControl!: FormControl;
  passwordControl!: FormControl;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['master@lemoncode.net', [Validators.required]],
      password: ['12345678', [Validators.required]],
      // username: ['', [Validators.required]],
      // password: ['', [Validators.required]],
    });
    this.userNameControl = this.loginForm.get('username') as FormControl;
    this.passwordControl = this.loginForm.get('password') as FormControl;
  }

  requesting: boolean = false;

  login(): void {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.userNameControl.value,
        password: this.passwordControl.value,
      };

      this.requesting = true;
      this.authService.login(credentials).subscribe({
        next: (authenticatied) => {
          if (authenticatied) {
            this.router.navigate(['/dashboard']);
          } else {
            this.snackBar.open('Invalid credentials', 'Close', {
              duration: environment.snackbar_duration
            });
          }
        },
        error: (e) => console.error(e),
        complete: () => {
          this.requesting = false;
        },
      });
    }
  }
}
