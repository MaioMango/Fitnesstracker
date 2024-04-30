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
  showToast = false;  // Neue Eigenschaft
  specificError = '';
  constructor(private authService: AuthService, private router: Router) {}

  onRegister() { 
    this.authService.register(this.login, this.password).subscribe(
      response => {
        console.log('Registrierung erfolgreich:', response);

        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registrierung fehlgeschlagen:', error);

        this.specificError = error.error.message;  // Fehlermeldung speichern
        this.showToast = true;  // Toast anzeigen
      }
    );
  }
}