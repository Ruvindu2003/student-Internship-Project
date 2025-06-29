import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  role: string = 'STUDENT';
  loading = false;
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService
  ) {}

  onRegister() {
    if (!this.username || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    const registerRequest = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    this.apiService.register(registerRequest).subscribe({
      next: () => {
        this.success = 'Account created successfully! Please login.';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.error = 'Failed to create account. Please try again.';
        this.loading = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
