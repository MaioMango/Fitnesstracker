import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 
  email = '';  
  password = '';

  onLogin() {  
    console.log('E-Mail:', this.email, 'Passwort:', this.password);
  }

  onRegister() {  
    console.log('Weiterleitung zur Registrierung...');
  }
}
