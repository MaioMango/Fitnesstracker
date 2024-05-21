import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import e from 'cors';

@Component({
  selector: 'app-existing-food-modal',
  templateUrl: './existing-food-modal.component.html',
  styleUrl: './existing-food-modal.component.scss'
})
export class ExistingFoodModalComponent implements OnInit{
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveFoodEvent = new EventEmitter<any>();
  @Input() code: string | null = null;
  
  foodName: string = "";
  kcal: number = 0;
  carbs: number = 0;
  protein: number = 0;
  fat: number = 0;
  quantity: number = 0;

  selectedMeal: number = 0;

  meals: { id: number, name: string }[] = [
    { id: 1, name: 'Frühstück' },
    { id: 2, name: 'Mittagessen' },
    { id: 3, name: 'Abendessen' },
    { id: 4, name: 'Snack' },
  ];


  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.setDefaultMeal();
  }

  setDefaultMeal() {
    const currentHour = new Date().getHours();
    console.log('currentHour:', currentHour);
    if (currentHour < 10) {
      this.selectedMeal = 1; //Breakfast
    } else if (currentHour < 12) {
      this.selectedMeal = 4; //Snack
    } else if (currentHour < 14) {
      this.selectedMeal = 2; //Lunch
    } else if (currentHour < 18){
      this.selectedMeal = 4; //Snack
    } else if (currentHour < 21) {
      this.selectedMeal = 3; //Dinner
    } else {
      this.selectedMeal = 4; //Snack
    }
  }

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
      code: this.code,
      meal: this.selectedMeal,
      quantity: this.quantity,
      userId: 1,
      date: new Date(new Date().getTime() + (2 * 60 * 60 * 1000)).toISOString()
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
