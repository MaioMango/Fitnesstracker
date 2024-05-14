import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrl: './barcodescanner.component.scss'
})
export class BarcodescannerComponent {
  allowedFormats = [ BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];
  showScanner: boolean = true;
  scannedData: string | null = null;

  onScanSuccess(event: any) {
    this.scannedData = event;
    this.showScanner = false; 
  }

  onScanError(error: any) {
    console.error('Barcode scan error:', error);
  }
}