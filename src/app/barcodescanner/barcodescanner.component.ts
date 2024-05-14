import { Component } from '@angular/core';

@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrl: './barcodescanner.component.scss'
})
export class BarcodescannerComponent {
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