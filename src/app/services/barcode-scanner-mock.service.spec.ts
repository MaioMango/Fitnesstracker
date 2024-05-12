import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { BarcodeScannerMockService } from './barcode-scanner-mock.service';
import { FoodMockService } from './food-mock.service';

describe('UserService - Barcode Scenarios', () => {
  let userService: UserService;
  let barcodeScannerMock: BarcodeScannerMockService;
  let foodServiceMock: FoodMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: BarcodeScannerMockService, useClass: BarcodeScannerMockService },
        { provide: FoodMockService, useClass: FoodMockService },
      ],
    });

    userService = TestBed.inject(UserService);
    barcodeScannerMock = TestBed.inject(BarcodeScannerMockService);
    foodServiceMock = TestBed.inject(FoodMockService);
  });

  it('should add food based on a valid barcode', () => {
    // Sicherstellen, dass der Barcode ein bekanntes Lebensmittel zurückgibt
    barcodeScannerMock.setBarcode("1234567890"); // Apple
    const result = userService.addFood();
    expect(result).toBe("Added Apple with 95 calories to Janis Furters list");
  });

  it('should return "Unknown" for an unknown barcode', () => {
    // Barcode, der in FoodMockService.foodDatabase nicht existiert
    barcodeScannerMock.setBarcode("0000000000"); // Kein Eintrag
    const result = userService.addFood();
    expect(result).toBe("Added Unknown with 0 calories to Janis Furters list");
  });

  it('should add different food based on a changed barcode', () => {
    // Nach Änderung vom Barcode überprüfen, ob das korrekte Lebensmittel zurückgegeben wird
    barcodeScannerMock.setBarcode("0987654321"); // Banana
    const result = userService.addFood();
    expect(result).toBe("Added Banana with 105 calories to Janis Furters list");
  });

  it('should handle empty or invalid barcodes gracefully', () => {
    // Testen, ob der Barcode-Scanner korrekt auf leere oder ungültige Barcodes reagiert
    barcodeScannerMock.setBarcode(""); // Leerer Barcode
    const result = userService.addFood();
    expect(result).toBe("Added Unknown with 0 calories to Janis Furters list");
  });
});
