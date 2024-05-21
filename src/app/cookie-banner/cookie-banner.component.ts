import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
})
export class CookieBannerComponent implements OnInit {
  @Output() cookiesAccepted = new EventEmitter<boolean>();
  isBannerVisible = true;

  constructor() { }

  ngOnInit(): void {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      this.isBannerVisible = false;
    }
  }

  acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    this.isBannerVisible = false;
    this.cookiesAccepted.emit(true);
  }
}