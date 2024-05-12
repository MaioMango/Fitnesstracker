import { Injectable } from '@angular/core';
import { BarcodeScannerMockService } from './barcode-scanner-mock.service';
import { Food, FoodMockService } from './food-mock.service';

interface User {
  name: string;
  foods: Food[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User = {
    name: "Janis Furter",
    foods: [],
  };

  constructor(
    private barcodeScanner: BarcodeScannerMockService,
    private foodService: FoodMockService
  ) {}

  getUser(): User {
    return this.user;
  }

  
  addFood(): string {
    const barcode = this.barcodeScanner.scanBarcode();
    const food = this.foodService.getFoodByBarcode(barcode);
    this.user.foods.push(food);

    return `Added ${food.name} with ${food.calories} calories to ${this.user.name}'s list`;
  }
}
