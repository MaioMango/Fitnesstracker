import { Component, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { FoodInfoModalComponent } from '../food-info-modal/food-info-modal.component';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrl: './barcodescanner.component.scss'
})
export class BarcodescannerComponent {
  @ViewChild('scanner') scanner!: ZXingScannerComponent;

  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];
  showScanner: boolean = true;
  showFoodInfoModal: boolean = false;
  scannedData: string | null = null;

  constructor(private router: Router) {}

  onScanSuccess(event: any) {
    this.scannedData = event;
    this.showFoodInfoModal = true;
    this.router.navigate(['barcodescanner/add']);
  }

  onScanError(error: any) {
    console.error('Barcode scan error:', error);
  }

  onFoodInfoSaved(foodInfo: any) {
    console.log('Lebensmittelinformationen gespeichert:', foodInfo);
    this.showFoodInfoModal = false;
  }
}