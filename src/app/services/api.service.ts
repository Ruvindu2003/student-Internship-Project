import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) { }

  // Auth APIs
  login(loginRequest: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, loginRequest);
  }

  register(registerRequest: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, registerRequest);
  }

  // Admin APIs
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/users`);
  }

  getAllAdminPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/posts`);
  } 

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/user/${userId}`);
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/post/${postId}`);
  }

  // Company APIs
  createPost(userId: number, post: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/company/posts?userId=${userId}`, post);
  }

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/company/posts`);
  }

  searchPosts(keyword: string): Observable<any[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<any[]>(`${this.baseUrl}/company/posts/search`, { params });
  }

  filterPosts(location?: string, duration?: string): Observable<any[]> {
    let params = new HttpParams();
    if (location) params = params.set('location', location);
    if (duration) params = params.set('duration', duration);
    return this.http.get<any[]>(`${this.baseUrl}/company/posts/filter`, { params });
  }

  // Student APIs
  applyForInternship(application: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/student/applications/apply`, application);
  }

  getStudentApplications(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/student/applications?studentId=${studentId}`);
  }
}
