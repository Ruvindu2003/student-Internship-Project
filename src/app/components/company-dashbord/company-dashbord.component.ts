import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CreatePostRequest, InternshipPost } from '../../model/internship.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-dashbord',
  imports: [CommonModule ,FormsModule],
  templateUrl: './company-dashbord.component.html',
  styleUrl: './company-dashbord.component.css'
})
export class CompanyDashbordComponent {

  posts: InternshipPost[] = [];
  currentUser: any;
  loading = false;
  error = '';
  success = '';
  
  // Form fields for creating new post
  showCreateForm = false;
  newPost: CreatePostRequest = {
    title: '',
    description: '',
    location: '',
    duration: ''
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.error = 'User not found. Please log in again.';
      this.router.navigate(['/login']);
      return;
    }
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.apiService.getAllPost(this.currentUser.id).subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
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

    this.loading = true;
    this.error = '';

    if (!this.currentUser || !this.currentUser.id) {
      this.error = 'User ID not found. Please log in again.';
      this.loading = false;
      return;
    }

    const params = new HttpParams().set('userId', this.currentUser.id.toString());

    this.apiService.createPost(this.currentUser.id, this.newPost).subscribe({
      next: (post) => {
        this.posts.unshift(post); 
        this.success = 'Internship post created successfully!';
        this.loading = false;
        this.showCreateForm = false;
        this.resetForm();
        
        const user = {
          id: this.currentUser.id,
          // ... other properties ...
        };
        this.authService.setCurrentUser(user);

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

  someMethod() {
    if (!this.currentUser || !this.currentUser.id) {
      this.error = 'User not found. Please log in again.';
      this.router.navigate(['/login']);
      return;
    }
    // Safe to use this.currentUser.id
  }

  applyForInternship(postId: number) {
    if (!this.currentUser || !this.currentUser.id) {
      this.error = 'User not found. Please log in again.';
      this.router.navigate(['/login']);
      return;
    }
    // Now it's safe to use this.currentUser.id
    // ...rest of your code...
  }
}