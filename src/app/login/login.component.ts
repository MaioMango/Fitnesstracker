import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  login = '';  
  password = '';
  showToast = false;
  specificError = '';
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/profile']);
    }
  }

  onLogin() {
    this.showToast = false; 
    this.authService.login(this.login, this.password).subscribe(
      (response) => {
        console.log('Login erfolgreich:', response);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        this.router.navigate(['/profile'])
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