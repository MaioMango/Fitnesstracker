import { Injectable } from '@angular/core';

export interface Food {
  name: string;
  calories: number;
}

@Injectable({
  providedIn: 'root',
})
export class FoodMockService {
  
  /**
   * Ein Objekt, das die Datenbank simuliert.
   * So können Lebensmittel anhand seines Barcodes gefunden werden.
   */
  private foodDatabase: { [barcode: string]: Food } = {
    '1234567890': { name: 'Apple', calories: 95 },
    '0987654321': { name: 'Banana', calories: 105 },
  };

  /**
   * Gibt das entsprechende Lebensmittel für einen Barcode zurück.
   * Gibt "Unknown" zurück, wenn der Barcode nicht in der Datenbank gefunden wird.
   */
  getFoodByBarcode(barcode: string): Food {
    return this.foodDatabase[barcode] || { name: 'Unknown', calories: 0 };
  }
}
