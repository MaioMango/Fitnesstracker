import { Component, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodInfoModalComponent } from '../food-info-modal/food-info-modal.component';

@Component({
  selector: 'app-existing-food-modal',
  templateUrl: './existing-food-modal.component.html',
  styleUrl: './existing-food-modal.component.scss'
})
export class ExistingFoodModalComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveFoodEvent = new EventEmitter<any>();
  @Output() editFoodEvent = new EventEmitter<any>();
  @Input() code: string | null = null;
  @ViewChild(FoodInfoModalComponent) foodInfoModal!: FoodInfoModalComponent;

  existingFoodForm: FormGroup = new FormGroup({});
  foodName: string = "";
  meals: any[] = [];

  selectedMeal: number = 0;
  showMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.existingFoodForm = this.formBuilder.group({
      kcal: [{ value: 0, disabled: true }],
      carbs: [{ value: 0, disabled: true }],
      protein: [{ value: 0, disabled: true }],
      fat: [{ value: 0, disabled: true }],
      meal: [this.selectedMeal, Validators.required],
      quantity: [0, Validators.required]
    });
    this.loadAllData();
  }

  loadAllData() {
    this.dataService.getMealData().subscribe((data) => {
      this.meals = data;
      this.setDefaultMeal();
    });

    if (this.code) {
      this.loadFoodData(this.code);
    }
  }

  loadFoodData(foodCode: string) {
    this.dataService.getFoodData(foodCode).subscribe(
      (response) => {
        this.foodName = response[0].fodName;
        this.existingFoodForm.setValue({
          kcal: response[0].fodKcal,
          carbs: response[0].fodCarbs,
          protein: response[0].fodProtein,
          fat: response[0].fodFat,
          meal: this.selectedMeal,
          quantity: 0
        });
      },
      (error) => {
        console.error('Fehler beim Laden der Lebensmittelinformationen:', error);
      }
    );
  }


  setDefaultMeal() {
    const currentHour = new Date().getHours();
    if (currentHour > 4 && currentHour < 10) {
      this.selectedMeal = this.meals[0]?.mealKey; // Breakfast
    } else if (currentHour >= 10 && currentHour < 12) {
      this.selectedMeal = this.meals[3]?.mealKey; // Snack
    } else if (currentHour >= 12 && currentHour < 14) {
      this.selectedMeal = this.meals[1]?.mealKey; // Lunch
    } else if (currentHour >= 14 && currentHour < 18) {
      this.selectedMeal = this.meals[3]?.mealKey; // Snack
    } else if (currentHour >= 18 && currentHour < 21) {
      this.selectedMeal = this.meals[2]?.mealKey; // Dinner
    } else {
      this.selectedMeal = this.meals[3]?.mealKey; // Snack
    }

    this.existingFoodForm.get('meal')?.setValue(this.selectedMeal);
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  save() {
    const foodData = {
      code: this.code,
      meal: this.existingFoodForm.value.meal,
      quantity: this.existingFoodForm.value.quantity,
      userId: this.authService.getIdFromToken(),
      date: new Date(new Date().getTime() + (2 * 60 * 60 * 1000)).toISOString()
    };
    if (foodData.quantity > 0) {
      this.dataService.saveFood2UserData(foodData).subscribe(
        () => {
          this.closeModal();
        },
        (error) => {
          console.error('Fehler beim Speichern der Daten:', error);
        }
      );
    } else {
      this.showMessage = true;
    }
  }

  editFood() {
      this.editFoodEvent.emit();
      this.foodInfoModal?.loadData();

  }
}