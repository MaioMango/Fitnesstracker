import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

/**
 * Simuliert einen Barcode-Scanner.
 * Standardmässig wird "1234567890" zurückgegeben.
 * Der Barcode kann für Tests geändert werden.
 */

export class BarcodeScannerMockService {
  private _barcode: string = "1234567890"; // Default-Barcode

  setBarcode(barcode: string) {
    this._barcode = barcode; // Ändert den Barcode für Tests
  }

  scanBarcode(): string {
    return this._barcode;
  }
}
