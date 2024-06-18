import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://64.226.119.7:3000'; 

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { login, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('jwt', response.token);
      })
    );
  }
  
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('jwt'); 
      }),
      catchError((error) => {
        console.error('Fehler beim Logout:', error);
        return throwError(error);
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

  getIdFromToken() {
    let token = localStorage.getItem('jwt');
    if (token) {
      let decodedJWT = JSON.parse(window.atob(token.split('.')[1]));
      return decodedJWT.id
    }
  }
}