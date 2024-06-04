import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-manual-barcodescanner-modal',
  templateUrl: './manual-barcodescanner-modal.component.html',
  styleUrl: './manual-barcodescanner-modal.component.scss'
})
export class ManualBarcodescannerModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  // @Output() saveManualBarcodeEvent = new EventEmitter<void>();
  @Output() saveManualBarcodeEvent = new EventEmitter<string>();

  manualBarcodeInput!: string;

  closeModal() {
    this.closeModalEvent.emit();
  }

  save() {
    this.saveManualBarcodeEvent.emit(this.manualBarcodeInput);
    this.closeModal();
  }
}
