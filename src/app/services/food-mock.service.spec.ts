import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { BarcodeScannerMockService } from './barcode-scanner-mock.service';
import { FoodMockService } from './food-mock.service';

describe('UserService with Mocks', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BarcodeScannerMockService, useClass: BarcodeScannerMockService },
        { provide: FoodMockService, useClass: FoodMockService },
      ],
    });

    userService = TestBed.inject(UserService);
  });

  it('should add food using BarcodeScannerMock and FoodServiceMock', () => {
    const result = userService.addFood();
    expect(result).toBe("Added Apple with 95 calories");
  });

  it('should return "Unknown" if the barcode does not exist in FoodServiceMock', () => {
    const barcode = "0000000000"; // Ein Barcode, der nicht in der Mock-Datenbank ist
    const food = TestBed.inject(FoodMockService).getFoodByBarcode(barcode);

    expect(food.name).toBe("Unknown");
    expect(food.calories).toBe(0);
  });
});
