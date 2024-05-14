import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-existing-food-modal',
  templateUrl: './existing-food-modal.component.html',
  styleUrl: './existing-food-modal.component.scss'
})
export class ExistingFoodModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveFoodEvent = new EventEmitter<any>();

  foodNameFromDB: string = "";
  kcal: number = 0;
  carbs: number = 0;
  protein: number = 0;
  fat: number = 0;

  selectedMeal: number = 0;

  meals: { id: number, name: string }[] = [
    { id: 1, name: 'Frühstück' },
    { id: 2, name: 'Mittagessen' },
    { id: 3, name: 'Abendessen' },
  ];

  quantity: number = 100;

  constructor(private router: Router) {}


  closeModal() {
    this.router.navigate(['barcodescanner']);
  }

  save() {
    const selectedMealName = this.meals.find(meal => meal.id === this.selectedMeal)?.name;
    const foodData = {
      foodName: this.foodNameFromDB,
      kcal: this.kcal,
      carbs: this.carbs,
      protein: this.protein,
      fat: this.fat,
      meal: selectedMealName,
      quantity: this.quantity
    };
    this.saveFoodEvent.emit(foodData);
    this.closeModal();
  }
}
