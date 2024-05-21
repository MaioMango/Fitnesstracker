import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


  getFood2User(userId: number, date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/food2user/${userId}/${date}`);
  }
  

  getBmiData(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bmi/${userId}`);
  }
  
}