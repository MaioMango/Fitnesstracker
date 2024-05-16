import { HttpClient } from '@angular/common/http';
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

  foodName: string = "";
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

  constructor(private router: Router, private http: HttpClient) {}

  loadFoodData() {
    const foodId = 1;

    this.http.get<any>(`http://localhost:3000/food/${foodId}`)
      .subscribe(
        (response) => {
          this.foodName = response.foodName;
          this.kcal = response.kcal;
          this.carbs = response.carbs;
          this.protein = response.protein;
          this.fat = response.fat;
        },
        (error) => {
          console.error('Fehler beim Laden der Lebensmittelinformationen:', error);
        }
      );
  }


  closeModal() {
    this.closeModalEvent.emit();
  }

  save() {
    const foodData = {
      foodName: this.foodName,
      kcal: this.kcal,
      carbs: this.carbs,
      protein: this.protein,
      fat: this.fat,
      meal: this.selectedMeal,
      quantity: this.quantity,
      userId: 1,
      date: new Date().toISOString().slice(0, 10)
    };

    this.http.post<any>('http://localhost:3000/food2user', foodData)
      .subscribe(
        (response) => {
          console.log('Daten erfolgreich gespeichert:', response);
          this.closeModal();
        },
        (error) => {
          console.error('Fehler beim Speichern der Daten:', error);
        }
      );
      this.closeModalEvent.emit();
  }
}
