import { Component } from '@angular/core';

// Schnittstelle definieren
interface ICalorieCalculator {
    calculateCalories(age: number, gender: string, weight: number, height: number, activity: number): number;
  }
  
  // Mock-Klasse 1
  export class MockCalorieCalculator1 implements ICalorieCalculator {
    calculateCalories(age: number, gender: string, weight: number, height: number, activity: number): number {
      // Logik des ursprünglichen CalorieCalculator
      let bmr;
      if (gender === 'male') {
        bmr = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
      } else {
        bmr = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
      }
      return bmr * activity;
    }
  }

