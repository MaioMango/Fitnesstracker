import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  SaveSuccess: boolean = false;
  SaveFail: boolean = false;
  weightForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {}

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

    this.http.post<any>('http://64.226.119.7:3000/weight', weightData).subscribe({
      next: (response) => {
        this.SaveSuccess = true;
        this.weightForm = this.formBuilder.group({
          weight: '',
          date: new Date().toISOString().split('T')[0]
        });
        setTimeout(() => {
          this.SaveSuccess = false;
        }, 3000);
      },
      error: (error) => {
        console.error('Fehler beim Speichern des Gewichts:', error);
        this.SaveFail = true;
        setTimeout(() => {
          this.SaveFail = false;
        }, 3000);
      },
    });
  }
}
