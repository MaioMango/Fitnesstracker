import { Component, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { FoodInfoModalComponent } from '../food-info-modal/food-info-modal.component';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Router } from '@angular/router';
import { scan } from 'rxjs';


@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrl: './barcodescanner.component.scss'
})
export class BarcodescannerComponent {
  @ViewChild(FoodInfoModalComponent, { static: false }) foodInfoModal!: FoodInfoModalComponent;
  @ViewChild('scanner', { static: false }) scanner!: ZXingScannerComponent;

  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];
  showScanner: boolean = true;
  showFoodInfoModal: boolean = false;
  scannedData: string | null = null;
  showBarcodeInfoModal: boolean = false;
  showExistingFoodModal: boolean = false;

  constructor(private router: Router) {}

  onScanSuccess(event: any) {
    this.scannedData = event;
    if (this.foodInfoModal) {
      this.foodInfoModal.code = this.scannedData;
    }
    this.showFoodInfoModal = true;
  }

  onScanError(error: any) {
    console.error('Barcode scan error:', error);
  }

  onFoodInfoSaved(foodInfo: any) {
    console.log(this.scannedData);
    console.log('Lebensmittelinformationen gespeichert:', foodInfo);
    this.showFoodInfoModal = false;
    this.showExistingFoodModal = true;
  }


  openBarcodeInfoModal() {
    this.showBarcodeInfoModal = true;
  }

  closeBarcodeInfoModal() {
    this.showBarcodeInfoModal = false;
  }

  closeFoodInfoModal() {
    this.showFoodInfoModal = false;
  }

  closeExistingFoodModal() {
    this.showExistingFoodModal = false;
  }
}
