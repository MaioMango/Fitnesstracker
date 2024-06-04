import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss'],
})
export class BmiComponent implements OnInit {
  bmiForm: FormGroup = new FormGroup({});
  bmi: number = 0;
  bmiCategory: string = '';
  showBmiInfoModal: boolean = false;
  username!: string;
  SaveSuccess: boolean = false;
  SaveFail: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.bmiForm = this.formBuilder.group({
      height: '',
      weight: '',
      date: new Date().toISOString().split('T')[0],
    });
    this.username = this.authService.getUsernameFromToken();
  }

  isLoggedIn(): boolean {
    return !!this.username;
  }

  calculateBMI(): void {
    if (!this.bmiForm.valid) {
      return;
    }
    const height = this.bmiForm.value.height / 100; // convert height from cm to m
    const weight = this.bmiForm.value.weight;
    this.bmi = parseFloat((weight / (height * height)).toFixed(2));
    this.bmiCategory = this.getBmiCategory(this.bmi);
  }

  getBmiCategory(bmi: number): string {
    if (bmi < 18.5) {
      return 'Untergewicht';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'Normalgewicht';
    } else if (bmi >= 25 && bmi <= 29.9) {
      return 'Übergewicht -> Präadipositas';
    } else {
      return 'Übergewicht -> Adipositas';
    }
  }

  save(): void {
    if (!this.bmiForm.valid) {
      return;
    }
    this.calculateBMI();

    const userId = this.authService.getIdFromToken();
    const bmi = this.bmi;
    const category = this.bmiCategory;
    const selectedDate = this.bmiForm.value.date;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${selectedDate}T${hours}:${minutes}:${seconds}`;
    const bmiData = { userId, bmi, category, date: formattedDate };

    this.http.post<any>('http://localhost:3000/bmi', bmiData).subscribe({
      next: (response) => {
        console.log(response);
        this.SaveSuccess = true;
        setTimeout(() => {
          this.SaveSuccess = false;
        }, 3000);
      },
      error: (error) => {
        console.error('Fehler beim Speichern des BMI:', error);
        this.SaveFail = true;
        setTimeout(() => {
          this.SaveFail = false;
        }, 3000);
      },
    });
  }

  openBmiInfoModal() {
    this.showBmiInfoModal = true;
  }

  closeBmiInfoModal() {
    this.showBmiInfoModal = false;
  }
}
