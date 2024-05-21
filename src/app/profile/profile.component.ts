import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  username: string = '';
  userId: number = 0;
  selectedDate: string = '';
  confirmPassword: string = '';
  currentBMI!: number;
  currentWeight: number = 70;
  recommendedCalories: number = 2000;
  meals: any[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsernameFromToken();
    this.userId = this.authService.getIdFromToken();
    this.selectedDate = new Date().toISOString().split('T')[0];
    this.loadData();
  }

  loadData() {
    this.dataService.getFood2User(this.userId, this.selectedDate).subscribe((data) => {
      this.meals = data;
    });

    this.dataService.getBmiData(this.userId).subscribe((bmiData) => {
      this.currentBMI = bmiData[0].bmi;
    });
  }

}
