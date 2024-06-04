import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  username!: string;


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.username = this.authService.getUsernameFromToken();
  }

  isLoggedIn(): boolean {
    return !!this.username;
  }
}
