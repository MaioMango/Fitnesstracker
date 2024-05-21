import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-barcode-info-modal',
  templateUrl: './barcode-info-modal.component.html',
  styleUrl: './barcode-info-modal.component.scss'
})
export class BarcodeInfoModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }
}
