import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getFood2User(userId: number, date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/food2user/${userId}/${date}`);
  }

  getMealData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/meal`);
  }

  getBmiData(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bmi/${userId}`);
  }

  getWeightData(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/weight/${userId}`);
  }

  getCalorieData(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/calories/${userId}`);
  }

  getFoodData(foodCode: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/food/${foodCode}`);
  }

  getFoodForProfileUpdate(ftuKey: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/food2user/${ftuKey}`);
  }

  saveFoodData(foodData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/food`, foodData);
  }

  updateFoodData(foodData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/food/${foodData.code}`, foodData);
  }

  saveFood2UserData(foodData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/food2user`, foodData);
  }

  updateFood2UserData(foodData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/food2user/${foodData.ftuKey}`, foodData);
  }

  deleteFood2UserData(ftuKey: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/food2user/${ftuKey}`);
  }
}
