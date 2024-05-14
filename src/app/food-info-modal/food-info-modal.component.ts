import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-food-info-modal',
  templateUrl: './food-info-modal.component.html',
  styleUrl: './food-info-modal.component.scss'
})
export class FoodInfoModalComponent {
  @Output() foodInfoSaved = new EventEmitter<any>();
  foodName: string = '';
  kcal: number = 0;
  carbs: number = 0;
  protein: number = 0;
  fat: number = 0;

  save() {
    const foodInfo = {
      name: this.foodName,
      kcal: this.kcal,
      carbs: this.carbs,
      protein: this.protein,
      fat: this.fat
    };
    this.foodInfoSaved.emit(foodInfo);
  }
}
