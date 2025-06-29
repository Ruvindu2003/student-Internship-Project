import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {
  internships: any[] = [];
  applications: any[] = [];
  searchKeyword = '';
  selectedLocation = '';
  selectedDuration = '';
  loading = false;
  error = '';
  currentUser: any = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || !this.authService.isStudent()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.loadInternships();
    this.loadApplications();
  }

  loadInternships() {
    this.loading = true;
    this.apiService.getAllPosts().subscribe({
      next: (posts) => {
        this.internships = posts;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load internships';
        this.loading = false;
      }
    });
  }

  loadApplications() {
    if (this.currentUser?.id) {
      this.apiService.getStudentApplications(this.currentUser.id).subscribe({
        next: (applications) => {
          this.applications = applications;
        },
        error: (error) => {
          console.error('Failed to load applications:', error);
        }
      });
    }
  }

  searchInternships() {
    if (this.searchKeyword.trim()) {
      this.loading = true;
      this.apiService.searchPosts(this.searchKeyword).subscribe({
        next: (posts) => {
          this.internships = posts;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to search internships';
          this.loading = false;
        }
      });
    } else {
      this.loadInternships();
    }
  }

  filterInternships() {
    this.loading = true;
    this.apiService.filterPosts(this.selectedLocation, this.selectedDuration).subscribe({
      next: (posts) => {
        this.internships = posts;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to filter internships';
        this.loading = false;
      }
    });
  }

  applyForInternship(postId: number) {
    if (!this.currentUser) {
      alert('Please login to apply for internships');
      return;
    }

    const resumeLink = prompt('Please enter your resume link:');
    if (!resumeLink) return;

    const request = {
      studentId: this.currentUser.id,
      postId: postId,
      resumeLink: resumeLink
    };

    this.apiService.applyForInternship(request).subscribe({
      next: (application) => {
        alert('Application submitted successfully!');
        this.loadApplications();
      },
      error: (error) => {
        alert('Failed to submit application. Please try again.');
      }
    });
  }

  hasApplied(postId: number): boolean {
    return this.applications.some(app => app.postId === postId);
  }

  getApplicationStatus(postId: number): string {
    const application = this.applications.find(app => app.postId === postId);
    return application ? application.status : '';
  }

  getInternshipTitle(postId: number): string {
    const internship = this.internships.find(post => post.id === postId);
    return internship ? internship.title : 'Unknown Internship';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
