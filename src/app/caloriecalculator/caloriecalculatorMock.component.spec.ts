import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MockCalorieCalculator1, MockCalorieCalculator2 } from './caloriecalculatorMock.component';

describe('MockCalorieCalculator1', () => {
  let calculator: MockCalorieCalculator1;

  beforeEach(() => {
    calculator = new MockCalorieCalculator1();
  });

  it('should calculate calories for male', () => {
    const calories = calculator.calculateCalories(30, 'male', 70, 170, 1.2);
    expect(calories).toBeCloseTo(2012.196);
  });

  it('should calculate calories for female', () => {
    const calories = calculator.calculateCalories(30, 'female', 60, 160, 1.2);
    expect(calories).toBeCloseTo(1661.52);
  });
});

describe('MockCalorieCalculator2', () => {
  let calculator: MockCalorieCalculator2;

  beforeEach(() => {
    calculator = new MockCalorieCalculator2();
  });

  it('should calculate calories for male', () => {
    const calories = calculator.calculateCalories(30, 'male', 70, 170, 1.2);
    expect(calories).toBeCloseTo(2213.415);
  });

  it('should calculate calories for female', () => {
    const calories = calculator.calculateCalories(30, 'female', 60, 160, 1.2);
    expect(calories).toBeCloseTo(1827.672);
  });
});