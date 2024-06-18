import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  login = '';  
  password = '';
  showToast = false;
  specificError = '';
  constructor(private authService: AuthService, private router: Router) {}

  onRegister() { 
    this.showToast = false; 
    this.authService.register(this.login, this.password).subscribe(
     () => {

        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registrierung fehlgeschlagen:', error);
        this.specificError = error.error.message || 'Unbekannter Fehler';
        this.showToast = true;
      }
    );
  }
}