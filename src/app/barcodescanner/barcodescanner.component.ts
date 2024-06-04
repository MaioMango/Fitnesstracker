import { Component, OnInit, ViewChild } from '@angular/core';
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

  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX];
  showScanner: boolean = false;
  showFoodInfoModal: boolean = false;
  scannedData: string | null = null;
  showBarcodeInfoModal: boolean = false;
  showExistingFoodModal: boolean = false;
  username!: string;
  isUpdating: boolean | null = null;

  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken();
    this.requestCameraPermission();
  }

  requestCameraPermission(): void {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'camera' as PermissionName }).then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
          this.showScanner = true;
        }
      });
    }
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

  onFoodInfoSaved() {
    this.showFoodInfoModal = false;
    this.showExistingFoodModal = true;
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
}
