import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BmiComponent } from './bmi.component';

fdescribe('BmiComponent', () => {
  let component: BmiComponent;
  let fixture: ComponentFixture<BmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmiComponent],
      imports: [ReactiveFormsModule] // Importiere ReactiveFormsModule für Formulare
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate BMI correctly', () => {
    component.bmiForm.patchValue({
      height: 170,
      weight: 70
    });
    
    component.calculateBMI();

    // Überprüfe, ob BMI korrekt berechnet wurde
    expect(component.bmi).toBe(24.22); // Expect BMI auf zwei Dezimalstellen genau
  });

  it('should add BMI with date when calculateBMI is called', () => {
    // Spioniere auf console.log
    spyOn(console, 'log');

    const bmi = 24.22;
    const date = new Date();

    component.bmiForm.patchValue({
      height: 170,
      weight: 70
    });

    component.calculateBMI();

    expect(console.log).toHaveBeenCalledWith('BMI added:', bmi, 'on date:', date);
  });
});
