import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  username: string = '';
  userId: number = 0;
  selectedDate: string = '';
  confirmPassword: string = '';
  currentBMI!: number;
  currentCategory!: string;
  currentWeight!: number;
  recommendedCalories!: number;
  meals: any[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.username = this.authService.getUsernameFromToken();
    this.userId = this.authService.getIdFromToken();
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.loadData();
  }

  loadData() {
    this.dataService.getFood2User(this.userId, this.selectedDate).subscribe((data) => {
      this.meals = data;
    });

    this.dataService.getBmiData(this.userId).subscribe((bmiData) => {
      this.currentBMI = bmiData[0].bmi;
    });

    this.dataService.getBmiData(this.userId).subscribe((CategoryData) => {
      this.currentCategory = CategoryData[0].category;
    });

    this.dataService.getWeightData(this.userId).subscribe((weightData) => {
      this.currentWeight = weightData[0].weight;
    });

    this.dataService.getCalorieData(this.userId).subscribe((calorieData) => {
      this.recommendedCalories = calorieData[0].calories;
    });
  }

}
