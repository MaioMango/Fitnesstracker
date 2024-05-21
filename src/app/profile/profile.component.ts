import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  meals: any[] = [
    { date: '2024-05-20', name: 'Frühstück', calories: 400, quantity: '2 Eier, Toast, 1 Glas Orangensaft' },
    { date: '2024-05-20', name: 'Mittagessen', calories: 600, quantity: 'Hähnchenbrust, Reis, Gemüse' },
    { date: '2024-05-21', name: 'Abendessen', calories: 500, quantity: 'Lachsfilet, Kartoffeln, Salat' }
  ];

  username: string = ''
  selectedDate: string = '';
  confirmPassword: string = '';
  currentBMI: number = 25.5; 
  currentWeight: number = 70;
  recommendedCalories: number = 2000; 

constructor(private dataService: DataService, private authService: AuthService){}

  ngOnInit() {
    this.username = this.authService.getUsernameFromToken();
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.loadData();
  }

  loadData() {
  this.getMealsForSelectedDate();
  }


  getMealsForSelectedDate() {
    return this.meals.filter(meal => meal.date === this.selectedDate);
  }

}