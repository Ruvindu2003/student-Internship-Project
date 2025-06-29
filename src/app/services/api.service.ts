import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../model/user.model';
import { Observable } from 'rxjs';
import { CreatePostRequest, InternshipPost } from '../model/internship.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) { }

  login(request:LoginRequest):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, request);

  }
  register(request:RegisterRequest):Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, request);
  }

  //Admin Apis
  getAllUsers(): Observable<any>{
return this.http.get(`${this.baseUrl}/admin/users`);
  }

  getAallPostes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/posts`);
  } 

  DeleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/user/${userId}`);
  }

  DeletePost(postId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/post/${postId}`);
  }

  //company Apis
  createPost(userId: number, request: CreatePostRequest): Observable<InternshipPost> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.post<InternshipPost>(`${this.baseUrl}/company/posts`, request, { params });
  }

  getAllPost(userId: number):Observable<any> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get(`${this.baseUrl}/company/posts`, { params });
  }

  searchPosts(keyword: string): Observable<InternshipPost[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<InternshipPost[]>(`${this.baseUrl}/company/posts/search`, { params });
  }

    filterPosts(location?: string, duration?: string): Observable<InternshipPost[]> {
    let params = new HttpParams();
    if (location) params = params.set('location', location);
    if (duration) params = params.set('duration', duration);
    return this.http.get<InternshipPost[]>(`${this.baseUrl}/company/posts/filter`, { params });
  }

  

   


}
