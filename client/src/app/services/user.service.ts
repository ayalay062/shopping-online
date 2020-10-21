import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/models/user.model';

const USER_API_URL = 'http://localhost:4000/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  login(email: string, password: string): Observable<{ user: IUser, token: string }> {
    return this.http.post<{ user: IUser, token: string }>(`${USER_API_URL}/login`, {
      email, password
    });
  }

  register(firstName: string, lastName: string, email: string, password: string, city: string, street: string): Observable<{ token: string, user: IUser }> {
    return this.http.post<{ token: string, user: IUser }>(`${USER_API_URL}/register`, {
      firstName, lastName, email, password, city, street
    });
  }
  ping(): Observable<{firstName: string}> {
  return this.http.get<{firstName: string}>(`${USER_API_URL}/ping`, {
    headers: this.getHeaders(),
  });
}
}
