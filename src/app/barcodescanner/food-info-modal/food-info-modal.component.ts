import { Component, EventEmitter, Output, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-food-info-modal',
  templateUrl: './food-info-modal.component.html',
  styleUrl: './food-info-modal.component.scss'
})
export class FoodInfoModalComponent {
  @Output() foodInfoSaved = new EventEmitter<any>();
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() code: string | null = null;
  @Input() isUpdating: boolean | null = null;

  foodInfoForm: FormGroup = new FormGroup({});

  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.foodInfoForm = this.formBuilder.group({
      foodName: '',
      kcal: 0,
      carbs: 0,
      protein: 0,
      fat: 0
    });

    if (this.code) {
      this.loadData();
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }

  loadData() {
    const code = this.code;
    if (code) {
      this.dataService.getFoodData(code).subscribe(
        (response) => {
          this.foodInfoForm.setValue({
            foodName: response[0].fodName,
            kcal: response[0].fodKcal,
            carbs: response[0].fodCarbs,
            protein: response[0].fodProtein,
            fat: response[0].fodFat,
          });
        },
        (error) => {
          console.error('Fehler beim Laden der Lebensmittelinformationen:', error);
        }
      );
    }
  }

  save() {
    const foodData = {
      foodName: this.foodInfoForm.value.foodName,
      code: this.code,
      kcal: this.foodInfoForm.value.kcal,
      carbs: this.foodInfoForm.value.carbs,
      protein: this.foodInfoForm.value.protein,
      fat: this.foodInfoForm.value.fat,
    };

    this.dataService.saveFoodData(foodData).subscribe(
      () => {
        this.closeModal();
      },
      (error) => {
        console.error('Fehler beim Speichern der Daten:', error);
      }
    );
    this.foodInfoSaved.emit();
  }


  update() {
    const foodData = {
      foodName: this.foodInfoForm.value.foodName,
      code: this.code,
      kcal: this.foodInfoForm.value.kcal,
      carbs: this.foodInfoForm.value.carbs,
      protein: this.foodInfoForm.value.protein,
      fat: this.foodInfoForm.value.fat,
    };

    this.dataService.updateFoodData(foodData).subscribe(
      () => {
        this.closeModal();
      },
      (error) => {
        console.error('Fehler beim Aktualisieren der Daten:', error);
      }
    );
    this.foodInfoSaved.emit();
  }
}
