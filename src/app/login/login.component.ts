import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    const loginRequest = {
      username: this.username,
      password: this.password
    };

    this.apiService.login(loginRequest)
      .subscribe({
        next: (response) => {
          const user = {
            id: response.id || this.getUserIdFromUsername(this.username),
            username: this.username,
            role: this.getRoleFromUsername(this.username)
          };
          
          console.log('Login successful:', user);
          this.authService.setCurrentUser(user);
          
          this.navigateByRole(user.role);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Invalid username or password';
          this.loading = false;
        }
      });
  }

  private navigateByRole(role: string) {
    switch (role) {
      case 'STUDENT':
        this.router.navigate(['/student-dashboard']);
        break;
      case 'COMPANY':
        this.router.navigate(['/company-dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin-dashboard']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }

  private getRoleFromUsername(username: string): string {
    if (username.includes('admin')) return 'ADMIN';
    if (username.includes('company')) return 'COMPANY';
    return 'STUDENT';
  }

  private getUserIdFromUsername(username: string): number {
    if (username.includes('student')) return 1;
    if (username.includes('company')) return 2;
    if (username.includes('admin')) return 3;
    return 1;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}