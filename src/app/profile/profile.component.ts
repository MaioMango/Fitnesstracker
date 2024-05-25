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
  userId!: number;
  selectedDate: string = '';
  confirmPassword: string = '';
  currentBMI!: number;
  currentCategory!: string;
  currentWeight!: number;
  recommendedCalories!: number;
  meals: any[] = [];
  showExistingFoodModal: boolean = false;
  ftuKey: number | null = null;
  ftuQuantity: number | null = null;
  meal: string | null = null;
  ftuDate: string | null = null;


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

  isLoggedIn(): boolean {
    return !!this.username;
  }

  loadData() {
    this.dataService.getFood2User(this.userId, this.selectedDate).subscribe((data) => {
      this.meals = data.map((meal: any) => ({
        ...meal,
        fodKcal: this.calculateNutrientValue(meal.fodKcal, meal.ftuQuantity),
        fodCarbs: this.calculateNutrientValue(meal.fodCarbs, meal.ftuQuantity),
        fodProtein: this.calculateNutrientValue(meal.fodProtein, meal.ftuQuantity),
        fodFat: this.calculateNutrientValue(meal.fodFat, meal.ftuQuantity)
      }));
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

  calculateNutrientValue(value: number, quantity: number): number {
    return Math.round((value * quantity / 100) * 10) / 10;
  }

  groupByMealName(meals: any[]): any[] {
    const groupedMeals = meals.reduce((acc, meal) => {
      const mealGroup = acc.find((group: any) => group.mealName === meal.mealName);
      if (mealGroup) {
        mealGroup.meals.push(meal);
      } else {
        acc.push({ mealName: meal.mealName, meals: [meal] });
      }
      return acc;
    }, []);
    return groupedMeals;
  }

  editMeal(mealData: any, mealOptions: any) {
    this.ftuKey = mealData.ftuKey;
    this.ftuDate = mealData.ftuDate;
    this.ftuQuantity = mealData.ftuQuantity;
    this.meal = mealOptions[0].mealName;
    this.showExistingFoodModal = true;
  }

  deleteMeal(ftuKey: number) {
    this.dataService.deleteFood2UserData(ftuKey).subscribe(() => {
      this.loadData();
    }, (error) => {
      console.error('Fehler beim Löschen des Eintrags:', error);
    });
  }

  closeExistingFoodModal() {
    this.showExistingFoodModal = false;
    this.loadData();
  }
}