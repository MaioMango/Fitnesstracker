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
  @Input() ftuKey: number | null = null;
  @Input() ftuQuantity: number | null = null;
  @Input() meal: string | null = null;
  @Input() ftuDate: string | null = null;
  @ViewChild(FoodInfoModalComponent) foodInfoModal!: FoodInfoModalComponent;

  existingFoodForm: FormGroup = new FormGroup({});
  foodName: string = "";
  meals: any[] = [];
  originalFoodData: any = {};

  selectedMeal: number = 0;
  showMessage: boolean = false;
  userId!: number;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private dataService: DataService) {

  }

  ngOnInit(): void {
    if (this.ftuDate) {
      const date = new Date(this.ftuDate);
      this.ftuDate = date.toISOString().split('T')[0];
    }
    this.existingFoodForm = this.formBuilder.group({
      kcal: [{ value: 0, disabled: true }],
      carbs: [{ value: 0, disabled: true }],
      protein: [{ value: 0, disabled: true }],
      fat: [{ value: 0, disabled: true }],
      date: this.ftuDate ? this.ftuDate : new Date().toISOString().split('T')[0],
      meal: [this.selectedMeal, Validators.required],
      quantity: [0, Validators.required]
    });
    this.existingFoodForm.get('quantity')?.valueChanges.subscribe((quantity) => {
      this.calculateNutrientValues(quantity);
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
    } else if (this.ftuKey && this.ftuQuantity) {
      this.setFood2UserMeal();
      this.loadFood2UserData(this.ftuKey, this.ftuQuantity, this.selectedMeal);
    }
  }

  loadFoodData(foodCode: string) {
    this.dataService.getFoodData(foodCode).subscribe(
      (response) => {
        this.foodName = response[0].fodName;
        this.originalFoodData = {
          kcal: response[0].fodKcal,
          carbs: response[0].fodCarbs,
          protein: response[0].fodProtein,
          fat: response[0].fodFat
        };

        this.existingFoodForm.patchValue({
          kcal: this.roundToOneDecimal(this.originalFoodData.kcal),
          carbs: this.roundToOneDecimal(this.originalFoodData.carbs),
          protein: this.roundToOneDecimal(this.originalFoodData.protein),
          fat: this.roundToOneDecimal(this.originalFoodData.fat),
          date: this.ftuDate ? this.ftuDate : new Date().toISOString().split('T')[0],
          meal: this.selectedMeal,
          quantity: 0
        });
      },
      (error) => {
        console.error('Fehler beim Laden der Lebensmittelinformationen:', error);
      }
    );
  }


  loadFood2UserData(ftuKey: number, quantity: number, meal: number) {
    this.dataService.getFoodForProfileUpdate(ftuKey).subscribe(
      (response) => {
        this.foodName = response[0].fodName;
        this.originalFoodData = {
          kcal: response[0].fodKcal,
          carbs: response[0].fodCarbs,
          protein: response[0].fodProtein,
          fat: response[0].fodFat
        };
        
        this.existingFoodForm.patchValue({
          kcal: this.roundToOneDecimal(this.originalFoodData.kcal),
          carbs: this.roundToOneDecimal(this.originalFoodData.carbs),
          protein: this.roundToOneDecimal(this.originalFoodData.protein),
          fat: this.roundToOneDecimal(this.originalFoodData.fat),
          date: this.ftuDate ? this.ftuDate : new Date().toISOString().split('T')[0],
          meal: meal ? meal : this.selectedMeal,
          quantity: quantity ? quantity : 0
        });
      },
      (error) => {
        console.error('Fehler beim Laden der Lebensmittelinformationen:', error);
      }
    );
  }


  calculateNutrientValues(quantity: number) {
    if (quantity > 0) {
      const factor = quantity / 100;
      this.existingFoodForm.patchValue({
        kcal: this.roundToOneDecimal(this.originalFoodData.kcal * factor),
        carbs: this.roundToOneDecimal(this.originalFoodData.carbs * factor),
        protein: this.roundToOneDecimal(this.originalFoodData.protein * factor),
        fat: this.roundToOneDecimal(this.originalFoodData.fat * factor)
      });
    } else {
      this.existingFoodForm.patchValue({
        kcal: 0,
        carbs: 0,
        protein: 0,
        fat: 0
      });
    }
  }

  roundToOneDecimal(value: number): number {
    return Math.round(value * 10) / 10;
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

  setFood2UserMeal() {
    if (this.meal === 'Frühstück') {
      this.selectedMeal = 1;
    } else if (this.meal === 'Mittagessen') {
      this.selectedMeal = 2;
    } else if (this.meal === 'Abendessen') {
      this.selectedMeal = 3;
    } else if (this.meal === 'Snack') {
      this.selectedMeal = 4;
    }   
    this.existingFoodForm.get('meal')?.setValue(this.selectedMeal);
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  save() {
    const selectedDate = this.existingFoodForm.value.date;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${selectedDate}T${hours}:${minutes}:${seconds}`;

    const foodData = {
      code: this.code,
      meal: this.existingFoodForm.value.meal,
      quantity: this.existingFoodForm.value.quantity,
      userId: this.authService.getIdFromToken(),
      date: formattedDate
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

  update() {
    const selectedDate = this.existingFoodForm.value.date;

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${selectedDate}T${hours}:${minutes}:${seconds}`;

    const foodData = {
      ftuKey: this.ftuKey,
      meal: this.existingFoodForm.value.meal,
      quantity: this.existingFoodForm.value.quantity,
      date: formattedDate
    };
  
    console.log(foodData);
  
    if (foodData.quantity > 0) {
      this.dataService.updateFood2UserData(foodData).subscribe(
        () => {
          this.closeModal();
        },
        (error) => {
          console.error('Fehler beim Aktualisieren der Daten:', error);
        }
      );
    } else {
      this.showMessage = true;
    }
  }
  
}