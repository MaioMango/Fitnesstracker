import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { FoodInfoModalComponent } from './food-info-modal/food-info-modal.component';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { AuthService } from '../services/auth.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-barcodescanner',
  templateUrl: './barcodescanner.component.html',
  styleUrl: './barcodescanner.component.scss'
})
export class BarcodescannerComponent implements OnInit {
  @ViewChild(FoodInfoModalComponent) foodInfoModal!: FoodInfoModalComponent;
  @ViewChild('scanner', { static: false }) scanner!: ZXingScannerComponent;
  @Input() manualBarcode: string | null = null;


  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];
  showScanner: boolean = true;
  isScanning: boolean = false;
  showFoodInfoModal: boolean = false;
  scannedData: string | null = null;
  showBarcodeInfoModal: boolean = false;
  showExistingFoodModal: boolean = false;
  showManualBarcodeModal: boolean = false;
  username!: string;
  isUpdating: boolean | null = null;
  saveSuccess: boolean = false;
  saveFail: boolean = false;

  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken()
  }

  isLoggedIn(): boolean {
    return !!this.username;
  }

  checkIfFoodExists(code: string) {
    this.dataService.getFoodData(code).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.showExistingFoodModal = true;
          this.showFoodInfoModal = false;
        } else {
          if (this.foodInfoModal) {
            this.foodInfoModal.code = code;
            this.foodInfoModal.isUpdating = false;

          }
          this.showFoodInfoModal = true;
        }
      },
      (error) => {
        console.error('Barcode scan error:', error);
        if (this.foodInfoModal) {
          this.foodInfoModal.code = code;
        }
        this.showFoodInfoModal = true;
      }
    );
  }

  onScanSuccess(event: any) {
    this.scannedData = event;
    if (this.scannedData) {
      this.checkIfFoodExists(this.scannedData);
    }
  }

  onScanError(error: any) {
    console.error('Barcode scan error:', error);
  }

  showFailMessage() {
    this.saveFail = true;
    setTimeout(() => {
      this.saveFail = false;
    }, 3000);
  }

  onFoodInfoSaved(state: boolean) {
    this.showFoodInfoModal = false;
    this.showExistingFoodModal = true;
  }

  onManualBarcodeSaved(barcode: string) {
    this.scannedData = barcode;
    this.checkIfFoodExists(this.scannedData)
  }


  openBarcodeInfoModal() {
    this.showBarcodeInfoModal = true;
  }

  openFoodInfoModalWithCode() {
    this.showFoodInfoModal = true;
    this.closeExistingFoodModal();
    this.isUpdating = true
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

  closeExistingFoodModalAfterSave() {
    this.showExistingFoodModal = false;
    this.saveSuccess = true;
    setTimeout(() => {
      this.saveSuccess = false;
    }, 3000); 
  }

  closeManualBarcodeInputModal() {
    this.showManualBarcodeModal = false;
  }

  openManualBarcodeInputModal() {
    this.showManualBarcodeModal = true
  }

}
