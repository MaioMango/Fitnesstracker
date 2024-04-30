import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';  
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() { 
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login erfolgreich:', response);

        this.router.navigate(['/']); 
      },
      error => {
        console.error('Login fehlgeschlagen:', error);
      }
    );
  }

  onRegister() { 
    this.router.navigate(['/register']);
  }
}