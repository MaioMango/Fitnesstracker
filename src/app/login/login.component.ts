import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login = '';  
  password = '';
  showToast = false;
  specificError = '';
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.showToast = false; 
    this.authService.login(this.login, this.password).subscribe(
      (response) => {
        console.log('Login erfolgreich:', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login fehlgeschlagen:', error);
        this.specificError = error.error.message || 'Unbekannter Fehler';
        this.showToast = true; 
      }
    );
  }

  onToastClosed() {
    this.showToast = false;
  }
}