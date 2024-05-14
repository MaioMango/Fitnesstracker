import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { login, password }).pipe(
      tap((response: any) => { // Specify the type of the response object
        console.log('Response:', response); // Fügen Sie diese Zeile hinzu
        localStorage.setItem('jwt', response.token);
      })
    );
  }

  register(login: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { login, password });
  }
  
  getUsernameFromToken() {
    let token = localStorage.getItem('jwt');
    if (token) {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      return decodedJWT.username
    }
  }
}