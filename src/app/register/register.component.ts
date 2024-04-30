import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';  
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() { 
    this.authService.register(this.email, this.password).subscribe(
      response => {
        console.log('Registrierung erfolgreich:', response);

        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registrierung fehlgeschlagen:', error);

        alert('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
      }
    );
  }
}