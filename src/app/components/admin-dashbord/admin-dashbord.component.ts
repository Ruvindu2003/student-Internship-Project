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
  this.apiService.DeleteUser(userId).subscribe({
    next: () => {
      this.getAllUser();
    },
    error: (error) => {
      console.error('Error deleting user:', error);
    }
  });

  console.log('Deleting user with ID:', userId);
  // Example: this.userService.deleteUser(userId).subscribe(...);
}

deletePost(postId: number) {
  this.apiService.DeletePost(postId).subscribe({
    next: () => {
      this.getAllPosts();
    },
    error: (error) => {
      console.error('Error deleting post:', error);
    }
  });

  
  console.log('Deleting post with ID:', postId);

}
activeTab: string = 'users'; 

setActiveTab(tab: string) {
  this.activeTab = tab;
}
}