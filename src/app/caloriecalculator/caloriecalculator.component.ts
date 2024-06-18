import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-caloriecalculator',
  templateUrl: './caloriecalculator.component.html',
  styleUrl: './caloriecalculator.component.scss'
})
export class CaloriecalculatorComponent implements OnInit{
  calorieForm: FormGroup = new FormGroup({});
  calories: number = 0;
  showCalorieInfoModal: boolean = false;
  username: string = '';
  SaveSuccess: boolean = false;
  SaveFail: boolean = false;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.calorieForm = this.formBuilder.group({
      age: '',
      gender: 'Male',
      weight: '',
      height: '',
      activity: '1.2',
      date: new Date().toISOString().split('T')[0]
    });
    this.username = this.authService.getUsernameFromToken();
  }

  isLoggedIn(): boolean {
    return !!this.username;
  }

  calculateCalories(): void {
    if (!this.calorieForm.valid) {
      return;
    }
    const formData = this.calorieForm.value;

    let bmr: number;
    if (formData.gender === 'Male') {
      bmr = 88.362 + (13.397 * formData.weight) + (4.799 * formData.height) - (5.677 * formData.age);
    } else {
      bmr = 447.593 + (9.247 * formData.weight) + (3.098 * formData.height) - (4.330 * formData.age);
    }

    this.calories = Math.round(bmr * formData.activity);
    this.calorieForm = this.formBuilder.group({
      age: '',
      gender: 'Male',
      weight: '',
      height: '',
      activity: '1.2',
      date: new Date().toISOString().split('T')[0]
    });
  }

  calculateCalorieswithoutClear(): void {
    if (!this.calorieForm.valid) {
      return;
    }
    const formData = this.calorieForm.value;

    let bmr: number;
    if (formData.gender === 'Male') {
      bmr = 88.362 + (13.397 * formData.weight) + (4.799 * formData.height) - (5.677 * formData.age);
    } else {
      bmr = 447.593 + (9.247 * formData.weight) + (3.098 * formData.height) - (4.330 * formData.age);
    }

    this.calories = Math.round(bmr * formData.activity);
    this.calorieForm = this.formBuilder.group({
      age: '',
      gender: 'Male',
      weight: '',
      height: '',
      activity: '1.2',
      date: new Date().toISOString().split('T')[0]
    });
  }

  save(): void {
    if (!this.calorieForm.valid) {
      return;
    }
    this.calculateCalorieswithoutClear();

    const userId = this.authService.getIdFromToken();
    const calories = this.calories;
    const selectedDate = this.calorieForm.value.date;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    const formattedDate = `${selectedDate}T${hours}:${minutes}:${seconds}`;
  
    const calorieData = { userId, calories, date: formattedDate };

    this.http.post<any>('https://64.226.119.7:3000/calories', calorieData).subscribe({
      next: (response) => {
        console.log(response);
        this.SaveSuccess = true;
        this.calorieForm = this.formBuilder.group({
          age: '',
          gender: 'Male',
          weight: '',
          height: '',
          activity: '1.2',
          date: new Date().toISOString().split('T')[0]
        });
        setTimeout(() => {
          this.SaveSuccess = false;
        }, 3000);
      },
      error: (error) => {
        console.error('Fehler beim Speichern der Kalorien:', error);
        this.SaveFail = true;
        setTimeout(() => {
          this.SaveFail = false;
        }, 3000);
      },
    });  }


    openCalorieInfoModal() {
      this.showCalorieInfoModal = true;
    }

    closeCalorieInfoModal() {
      this.showCalorieInfoModal = false;
    }
}
