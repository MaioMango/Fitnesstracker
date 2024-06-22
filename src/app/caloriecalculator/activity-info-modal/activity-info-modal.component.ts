import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-activity-info-modal',
  templateUrl: './activity-info-modal.component.html',
  styleUrls: ['./activity-info-modal.component.scss']
})
export class ActivityInfoModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal() {
    this.closeModalEvent.emit();
  }
}
