import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-caloriecalculator',
  templateUrl: './caloriecalculator.component.html',
  styleUrl: './caloriecalculator.component.scss'
})
export class CaloriecalculatorComponent implements OnInit{
  calorieForm: FormGroup = new FormGroup({});
  calories: number = 0;
  showCalorieInfoModal: boolean = false;
  showActivityInfoModal: boolean = false;
  username: string = '';
  SaveSuccess: boolean = false;
  SaveFail: boolean = false;
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private authService: AuthService) {}

  ngOnInit(): void {
    this.calorieForm = this.formBuilder.group({
      age: ['', Validators.required],
      gender: ['Male', Validators.required],
      weight: ['', [Validators.required, Validators.min(4)]],
      height: ['', [Validators.required, Validators.min(70)]],
      activity: ['1.2', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required]
    });
    this.username = this.authService.getUsernameFromToken();
  }

  isLoggedIn(): boolean {
    return !!this.username;
  }


  checkNegativeValue(fieldName: string) {
    const field = this.calorieForm.get(fieldName);
    if (field && field.value < 0) {
      field.setValue(1);
    }
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

   this.dataService.saveCalorieData(calorieData).subscribe({
      next: () => {
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

    openActivityInfoModal() {
      this.showActivityInfoModal = true;
    }
  
    closeActivityInfoModal() {
      this.showActivityInfoModal = false;
    }
    
}
