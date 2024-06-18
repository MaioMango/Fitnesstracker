import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Fitnesstracker';
  isCollapsed = true;

  data: any;
  username: string = '';
  cookieBannerVisible = true;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {
    const cookiesState = localStorage.getItem('cookiesAccepted');
    if (cookiesState === 'true') {
     this.cookieBannerVisible = false;
   }
    this.username = this.authService.getUsernameFromToken();
    this.adjustBodyPadding();
  }

  onCookiesAccepted(event: boolean) {
    this.cookieBannerVisible = !event;
  }

  adjustBodyPadding() {
    const navbar = document.querySelector('.fixed-top') as HTMLElement;
    const footer = document.querySelector('.fixed-bottom') as HTMLElement;

    if (navbar && footer) {
      const navbarHeight = navbar.offsetHeight;
      const footerHeight = footer.offsetHeight;
      const body = document.querySelector('body');
      if (body) {
        body.setAttribute(
          'style',
          `padding-top: ${navbarHeight}px; padding-bottom: ${footerHeight}px`
        );
      }
    }
  }

  logout() {
    this.authService.logout().subscribe(
      (response) => {
        this.username = '';
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Fehler beim Logout:', error);
      }
    );
  }

  isLoggedIn(): boolean {
    return !!this.username;
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
