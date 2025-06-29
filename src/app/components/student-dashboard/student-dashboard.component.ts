import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Application, InternshipPost } from '../../model/internship.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  internships: InternshipPost[] = [];
  applications: Application[] = [];
  searchKeyword = '';
  selectedLocation = '';
  selectedDuration = '';
  loading = false;
  error = '';
  currentUser: any;



  constructor(private apiservice:ApiService, private authService: AuthService, private route:Router){}






  ngOnInit() {
    this.loadInternships();
    this.loadApplications();
  }

  loadInternships() {
    this.loading = true;
    this.apiservice.getAallPostes().subscribe({
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
      this.apiservice.getStudentApplications(this.currentUser.id).subscribe({
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
      this.apiservice.searchPosts(this.searchKeyword).subscribe({
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
    this.apiservice.filterPosts(this.selectedLocation, this.selectedDuration).subscribe({
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
    const resumeLink = prompt('Please enter your resume link:');
    if (!resumeLink) return;

    const request = {
      studentId: this.currentUser.id,
      postId: postId,
      resumeLink: resumeLink
    };

    this.apiservice.applyForInternship(request).subscribe({
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
    this.route.navigate(['/login']);
  }
}
