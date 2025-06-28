import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashbord',
  imports: [CommonModule],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent {
  ngOnInit() {
    this.getAllUser();
    this.getAllPosts();}


  constructor(private apiService:ApiService){

  }

  public user :any=[];

    getAllUser(){
      this.apiService.getAllUsers().subscribe({
        next: (response) => {
          this.user = response;
          console.log(this.user);
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
    }

    public posts:any=[];

    getAllPosts(){
      this.apiService.getAallPostes().subscribe({
        next: (response) => {
          this.posts = response;
          console.log(this.posts);
        },
        error: (error) => {
          console.error('Error fetching posts:', error);
        }
      });
    }

    deleteUser(userId: number) {
  // Implement your user deletion logic here
  console.log('Deleting user with ID:', userId);
  // Example: this.userService.deleteUser(userId).subscribe(...);
}

deletePost(postId: number) {
  // Implement your post deletion logic here
  console.log('Deleting post with ID:', postId);
  // Example: this.postService.deletePost(postId).subscribe(...);
}
activeTab: string = 'users'; // Default active tab

setActiveTab(tab: string) {
  this.activeTab = tab;
}
}