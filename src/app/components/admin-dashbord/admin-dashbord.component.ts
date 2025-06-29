import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashbord',
  imports: [CommonModule],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  loading = false;
  error = '';
  activeTab: string = 'users';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.getAllUsers();
    this.getAllPosts();
  }

  getAllUsers() {
    this.loading = true;
    this.apiService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.loading = false;
        console.log('Users loaded:', this.users);
      },
      error: (error) => {
        this.error = 'Error fetching users';
        this.loading = false;
        console.error('Error fetching users:', error);
      }
    });
  }

  getAllPosts() {
    this.loading = true;
    this.apiService.getAllAdminPosts().subscribe({
      next: (response) => {
        this.posts = response;
        this.loading = false;
        console.log('Posts loaded:', this.posts);
      },
      error: (error) => {
        this.error = 'Error fetching posts';
        this.loading = false;
        console.error('Error fetching posts:', error);
      }
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(userId).subscribe({
        next: () => {
          this.getAllUsers();
          console.log('User deleted successfully');
        },
        error: (error) => {
          this.error = 'Error deleting user';
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  deletePost(postId: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.apiService.deletePost(postId).subscribe({
        next: () => {
          this.getAllPosts();
          console.log('Post deleted successfully');
        },
        error: (error) => {
          this.error = 'Error deleting post';
          console.error('Error deleting post:', error);
        }
      });
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}