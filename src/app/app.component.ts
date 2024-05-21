import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from './services/auth.service'; // Import the AuthService class

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Fitnesstracker';
  isCollapsed = true;

  data: any;
  username: string = ''; // Declare the username property
  
  constructor(private dataService: DataService, private authService: AuthService) {} // Declare the authService property in the constructor

  ngOnInit() {
    this.dataService.getData().subscribe((response) => {
      this.data = response;
    });

    this.username = this.authService.getUsernameFromToken();
    console.log('Username:', this.username);
    console.log('ID:', this.authService.getIdFromToken());
    this.adjustBodyPadding();

  }

  adjustBodyPadding() {
    const navbar = document.querySelector('.fixed-top') as HTMLElement;
    const footer = document.querySelector('.fixed-bottom') as HTMLElement;

    if (navbar && footer) {
      const navbarHeight = navbar.offsetHeight;
      const footerHeight = footer.offsetHeight;
      const body = document.querySelector('body');
      if (body) {
        body.setAttribute('style', `padding-top: ${navbarHeight}px; padding-bottom: ${footerHeight}px`);
      }
    }
  }

  
  isLoggedIn(): boolean {
    return !!this.username;
  }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }
}
