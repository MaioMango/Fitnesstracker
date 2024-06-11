import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../services/auth.service';

interface Meal {
  mealName: string;
  fodName: string;
  ftuQuantity: number;
  fodKcal: number;
  fodCarbs: number;
  fodProtein: number;
  fodFat: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @Input() isUpdating: boolean | null = null;
  @Input() foodCode: boolean | null = null;

  username: string = '';
  userId!: number;
  selectedDate: string = '';
  confirmPassword: string = '';
  currentBMI!: number;
  noBmiData: boolean = false;
  currentCategory!: string;
  currentWeight!: number;
  noWeightData: boolean = false;
  recommendedCalories!: number;
  noCalorieData: boolean = false;
  foodName!: string;
  meals: any[] = [];
  showExistingFoodModal: boolean = false;
  showFoodInfoModal: boolean = false;
  showConfirmDeleteModal: boolean = false;
  deleteSuccess: boolean = false;
  deleteFail: boolean = false;
  editSuccess: boolean = false;
  editFail: boolean = false;
  ftuKey: number | null = null;
  ftuQuantity: number | null = null;
  meal: string | null = null;
  ftuDate: string | null = null;
  codeToUpdate: string | null = null;


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
      if (bmiData.length === 0) {
        this.noBmiData = true;
        return;
      }
      this.currentBMI = bmiData[0].bmi;
    });

    this.dataService.getBmiData(this.userId).subscribe((CategoryData) => {
      this.currentCategory = CategoryData[0].category;
    });

    this.dataService.getWeightData(this.userId).subscribe((weightData) => {
      if (weightData.length === 0) {
        this.noWeightData = true;
        return;
      }
      this.currentWeight = weightData[0].weight;
    });

    this.dataService.getCalorieData(this.userId).subscribe((calorieData) => {
      if (calorieData.length === 0) {
        this.noCalorieData = true;
        return;
      }
      this.recommendedCalories = calorieData[0].calories;
    });
  }

  calculateNutrientValue(value: number, quantity: number): number {
    return Math.round((value * quantity / 100) * 10) / 10;
  }

  groupByMealName(meals: Meal[]): { mealName: string, meals: Meal[] }[] {
    const mealOrder = ['Frühstück', 'Mittagessen', 'Abendessen', 'Snack'];
  
    const groupedMeals = meals.reduce((acc: { mealName: string, meals: Meal[] }[], meal: Meal) => {
      const mealGroup = acc.find((group) => group.mealName === meal.mealName);
      if (mealGroup) {
        mealGroup.meals.push(meal);
      } else {
        acc.push({ mealName: meal.mealName, meals: [meal] });
      }
      return acc;
    }, []);
  
    return groupedMeals.sort((a, b) => {
      return mealOrder.indexOf(a.mealName) - mealOrder.indexOf(b.mealName);
    });
  }
  
  getTotalConsumedCalories(meals: Meal[]): number {
    return meals.reduce((total, meal) => total + meal.fodKcal, 0);
  } 
  
  getRemainingCalories(recommendedCalories: number, consumedCalories: number): number {
    if (isNaN(consumedCalories) || isNaN(recommendedCalories)) {
      return 0;
    }
    return recommendedCalories - consumedCalories;
  }  

  getRemainingCaloriesColor(remainingCalories: number): string {
    return remainingCalories >= 0 ? 'text-success' : 'text-danger';
  }
    
  handleCodeToUpdate(code: string | null): void {
    this.codeToUpdate = code
  }

  editMeal(mealData: any, mealOptions: any) {
    this.ftuKey = mealData.ftuKey;
    this.ftuDate = mealData.ftuDate;
    this.ftuQuantity = mealData.ftuQuantity;
    this.meal = mealOptions[0].mealName;
    this.showExistingFoodModal = true;
  }

  deleteMeal(meal: any) {
    this.ftuKey = meal.ftuKey;
    this.foodName = meal.fodName;
    this.showConfirmDeleteModal = true;
  }

  confirmDelete() {
    if (this.ftuKey) {
      this.showConfirmDeleteModal = false;
      this.dataService.deleteFood2UserData(this.ftuKey).subscribe(() => {
        this.loadData();
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteSuccess = false;
        }, 3000);
      }, (error) => {
        this.deleteFail = true;
        setTimeout(() => {
          this.deleteSuccess = false;
        }, 3000);
        console.error('Fehler beim Löschen des Eintrags:', error);
      });
    } else {
      console.error('Fehler: ftuKey ist null oder undefined');
    }
  }

  cancelDelete() {
    this.showConfirmDeleteModal = false;
  }

showFailMessage() {
  this.editFail = true;
  setTimeout(() => {
    this.editFail = false;
  }, 3000);    this.loadData();
}

  closeExistingFoodModalAfterUpdate() {
    this.showExistingFoodModal = false;
    this.editSuccess = true;
    setTimeout(() => {
      this.editSuccess = false;
    }, 3000);    this.loadData();
  }


  closeExistingFoodModal() {
    this.showExistingFoodModal = false;
    this.loadData();
  }

  onFoodInfoSaved() {
    this.showFoodInfoModal = false;
    this.showExistingFoodModal = true;
  }

  openFoodInfoModalWithCode() {
    this.showFoodInfoModal = true;
    this.closeExistingFoodModal();
    this.isUpdating = true
  }

  closeFoodInfoModal() {
    this.showFoodInfoModal = false;
  }
}