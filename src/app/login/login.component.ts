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
  showToast = false;  // Neue Eigenschaft
  specificError = '';
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() { 
    this.showToast = false;  // Toast verstecken
    this.authService.login(this.login, this.password).subscribe(
      response => {
        console.log('Login erfolgreich:', response);

        this.router.navigate(['/']); 
      },
      error => {
        console.error('Login fehlgeschlagen:', error);
        
        this.specificError = error.error.message;  // Fehlermeldung speichern
        this.showToast = true;  // Toast anzeigen
      }
    );
  }

  onRegister() { 
    this.router.navigate(['/register']);
  }
}