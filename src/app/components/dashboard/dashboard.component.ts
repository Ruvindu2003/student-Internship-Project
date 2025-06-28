import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';
import { StudentDashboardComponent } from '../student-dashboard/student-dashboard.component';
import { AdminDashbordComponent } from '../admin-dashbord/admin-dashbord.component';
import { CompanyDashbordComponent } from '../company-dashbord/company-dashbord.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, StudentDashboardComponent, AdminDashbordComponent, CompanyDashbordComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 currentUser: any = null;
  constructor(private authservice:AuthService,private route:Router){

    

  }
  ngOnInit() {
    this.authservice.currentUser$.subscribe(user => {
      this.currentUser = user;

      if (!user) {
        this.route.navigate(['/login']);
        return;
      }
      console.log('Current user:', this.currentUser);
    });
   
  }

  logout() {
    this.authservice.logout();
    this.route.navigate(['/login']);
  }

}
