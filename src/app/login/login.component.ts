import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username=''
  password=''
  loading=false
  error='';

  constructor(private apiservice:ApiService,private authservice:AuthService,private router:Router){
  }
     onLogin() {
    if (!this.username || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';

    this.apiservice.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {

          const user = {
            username: this.username,
            role: this.getRoleFromUsername(this.username),
            id: response.id || this.getUserIdFromUsername(this.username),
            token: response.token
          };
          console.log('Login successful:', user);
          
          
          this.authservice.setCurrentUser(user);
          
          const role = user.role;
          if (role === 'STUDENT') {
            this.router.navigate(['/student-dashboard']);
          } else if (role === 'COMPANY') {
            this.router.navigate(['/company-dashboard']);
          } else if (role === 'ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/dashboard']);
          }
          
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Invalid username or password';
          this.loading = false;
        }
      });
  }

  private getRoleFromUsername(username: string): 'STUDENT' | 'COMPANY' | 'ADMIN' {
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
