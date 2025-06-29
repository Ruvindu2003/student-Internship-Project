import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-dashbord',
  imports: [CommonModule, FormsModule],
  templateUrl: './company-dashbord.component.html',
  styleUrl: './company-dashbord.component.css'
})
export class CompanyDashbordComponent implements OnInit {
  posts: any[] = [];
  currentUser: any = null;
  loading = false;
  error = '';
  success = '';
  
  // Form fields for creating new post
  showCreateForm = false;
  newPost = {
    title: '',
    description: '',
    location: '',
    duration: ''
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || !this.authService.isCompany()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.apiService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load posts';
        this.loading = false;
      }
    });
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newPost = {
      title: '',
      description: '',
      location: '',
      duration: ''
    };
    this.error = '';
    this.success = '';
  }

  createPost() {
    if (!this.newPost.title || !this.newPost.description || !this.newPost.location || !this.newPost.duration) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (!this.currentUser?.id) {
      this.error = 'User ID not found. Please log in again.';
      return;
    }

    this.loading = true;
    this.error = '';

    this.apiService.createPost(this.currentUser.id, this.newPost).subscribe({
      next: (post) => {
        this.posts.unshift(post); 
        this.success = 'Internship post created successfully!';
        this.loading = false;
        this.showCreateForm = false;
        this.resetForm();
        
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      error: (error) => {
        this.error = 'Failed to create post. Please try again.';
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}