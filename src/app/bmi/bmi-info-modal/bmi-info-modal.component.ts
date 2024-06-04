import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bmi-info-modal',
  templateUrl: './bmi-info-modal.component.html',
  styleUrl: './bmi-info-modal.component.scss'
})
export class BmiInfoModalComponent implements OnInit{
  @Output() closeModalEvent = new EventEmitter<void>();

  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken();
  }

  isLoggedIn(): boolean {
    return !!this.username;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}