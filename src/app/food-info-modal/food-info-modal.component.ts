import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router, private http: HttpClient) {}


  closeModal() {
    this.foodName = '';
    this.kcal = 0;
    this.carbs = 0;
    this.protein = 0;
    this.fat = 0;

    this.router.navigate(['barcodescanner']);
  }
  save() {
    const foodData = {
      foodName: this.foodName,
      kcal: this.kcal,
      carbs: this.carbs,
      protein: this.protein,
      fat: this.fat
    };

    this.http.post<any>('http://localhost:3000/food', foodData)
      .subscribe(
        (response) => {
          console.log('Daten erfolgreich gespeichert:', response);
          this.closeModal();
        },
        (error) => {
          console.error('Fehler beim Speichern der Daten:', error);
        }
      );
      this.router.navigate(['barcodescanner/addmeal']);
  }
}
