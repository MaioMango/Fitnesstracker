import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrl: './weight.component.scss'
})
export class WeightComponent {
  weight: number = 0;
  weightForm: Date = new Date();
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {}


  save(): void {
    const userid = this.authService.getIdFromToken();
    const weight = this.weight;
    const date = this.weightForm;

    const weightData = { userid, weight, date };

    this.http.post<any>('http://localhost:3000/weight', weightData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Fehler beim Speichern des Gewicht:', error);
      },
    });
  }
}


