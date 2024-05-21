import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CaloriecalculatorComponent } from './caloriecalculator.component';

describe('CaloriecalculatorComponent', () => {
  let component: CaloriecalculatorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaloriecalculatorComponent],
      imports: [FormsModule] // Import FormsModule for ngModel
    });
    
    // Erstellen Sie eine Instanz des Komponenten
    const fixture = TestBed.createComponent(CaloriecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate calories correctly for Male', () => {
    // Arrange
    const formValues = {
      age: '30',
      gender: 'Male', // Setzen Sie das Geschlecht auf "Male"
      weight: '70',
      height: '170',
      activity: '1.55'
    };

    // Act
    fillFormValues(formValues);
    component.calculateCalories();

    // Assert
    const resultElement = document.getElementById('result');
    expect(resultElement?.textContent).toContain('Benötigte Kalorien pro Tag:');
  });

  it('should calculate calories correctly for Female', () => {
    // Arrange
    const formValues = {
      age: '25',
      gender: 'Female',
      weight: '60',
      height: '160',
      activity: '1.725'
    };

    // Act
    fillFormValues(formValues);
    component.calculateCalories();

    // Assert
    const resultElement = document.getElementById('result');
    expect(resultElement?.textContent).toContain('Benötigte Kalorien pro Tag:');
  });

  function fillFormValues(values: { [key: string]: string }): void {
    const form = document.getElementById('calorieForm');
    if (form) {
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          const input = form.querySelector(`[name=${key}]`) as HTMLInputElement;
          if (input) {
            input.value = values[key];
            input.dispatchEvent(new Event('input'));
          }
        }
      }
    }
  }
});