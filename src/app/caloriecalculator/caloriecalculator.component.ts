import { Component } from '@angular/core';

@Component({
  selector: 'app-caloriecalculator',
  templateUrl: './caloriecalculator.component.html',
  styleUrls: ['./caloriecalculator.component.scss']
})
export class CaloriecalculatorComponent {

  calculateCalories(): void {
    const form = document.getElementById('calorieForm') as HTMLFormElement;
    const formData = {
      age: parseInt((form.elements.namedItem('age') as HTMLInputElement).value),
      gender: (form.elements.namedItem('Gender') as HTMLInputElement).value,
      weight: parseFloat((form.elements.namedItem('weight') as HTMLInputElement).value),
      height: parseFloat((form.elements.namedItem('height') as HTMLInputElement).value),
      activity: parseFloat((form.elements.namedItem('activity') as HTMLSelectElement).value)
    };

    let bmr: number;
    if (formData.gender === 'Male') {
      bmr = 88.362 + (13.397 * formData.weight) + (4.799 * formData.height) - (5.677 * formData.age);
    } else {
      bmr = 447.593 + (9.247 * formData.weight) + (3.098 * formData.height) - (4.330 * formData.age);
    }

    const calories = Math.round(bmr * formData.activity);

    const resultElement = document.getElementById('result') as HTMLElement;
    resultElement.textContent = `Benötigte Kalorien pro Tag: ${calories}`;
  }

}
