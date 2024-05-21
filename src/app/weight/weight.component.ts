import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrl: './weight.component.scss'
})
export class WeightComponent {
  weightForm: FormGroup = new FormGroup({});
  
  weight: number = 0;
  date: Date = new Date();
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.weightForm = this.formBuilder.group({
      weight: '',
      date: new Date().toISOString().split('T')[0]
    });
  }

  save(): void {
    if (!this.weightForm.valid) {
      return;
    }
    const userid = this.authService.getIdFromToken();
    const weight = this.weightForm.value.weight;
    const selectedDate = this.weightForm.value.date;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    const formattedDate = `${selectedDate}T${hours}:${minutes}:${seconds}`;
    const weightData = { userid, weight, date: formattedDate };

    this.http.post<any>('http://localhost:3000/weight', weightData).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Fehler beim Speichern des Gewichts:', error);
      },
    });
  }
}


