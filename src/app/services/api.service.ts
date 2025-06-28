import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../model/user.model';
import { Observable } from 'rxjs';

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
  getAllUsers(): Observable<any>{
return this.http.get(`${this.baseUrl}/admin/users`);
  }

  getAallPostes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/posts`);
  } 

   


}
