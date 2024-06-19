import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { BmiComponent } from './bmi.component';
import { AuthService } from '../services/auth.service';
import { DataService } from '../../services/data.service';

describe('BmiComponent', () => {
  let component: BmiComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUsernameFromToken', 'getIdFromToken']);
    const dataSpy = jasmine.createSpyObj('DataService', ['saveBMIData']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        BmiComponent,
        FormBuilder,
        { provide: AuthService, useValue: authSpy },
        { provide: DataService, useValue: dataSpy },
      ],
    });

    component = TestBed.inject(BmiComponent);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    authServiceSpy.getUsernameFromToken.and.returnValue('testUser');
    authServiceSpy.getIdFromToken.and.returnValue('12345');
    component.ngOnInit();
  });

  // Tests für calculateBMI
  it('should calculate BMI and clear the form', () => {
    component.bmiForm.setValue({ height: 180, weight: 75, date: '2024-06-19' });
    component.calculateBMI();
    expect(component.bmi).toBeCloseTo(23.15, 2);
    expect(component.bmiCategory).toBe('Normalgewicht');
    expect(component.bmiForm.value.height).toBe('');
    expect(component.bmiForm.value.weight).toBe('');
  });

  it('should not calculate BMI if form is invalid', () => {
    component.bmiForm.setValue({ height: 0, weight: 0, date: '2024-06-19' });
    component.calculateBMI();
    expect(component.bmi).toBe(0);
    expect(component.bmiCategory).toBe('');
  });

  // Tests für calculateBMIwithoutClear
  it('should calculate BMI without clearing the form', () => {
    component.bmiForm.setValue({ height: 180, weight: 75, date: '2024-06-19' });
    component.calculateBMIwithoutClear();
    expect(component.bmi).toBeCloseTo(23.15, 2);
    expect(component.bmiCategory).toBe('Normalgewicht');
    expect(component.bmiForm.value.height).toBe(180);
    expect(component.bmiForm.value.weight).toBe(75);
  });

  it('should not calculate BMI without clearing the form if form is invalid', () => {
    component.bmiForm.setValue({ height: 0, weight: 0, date: '2024-06-19' });
    component.calculateBMIwithoutClear();
    expect(component.bmi).toBe(0);
    expect(component.bmiCategory).toBe('');
  });

  // Tests für getBmiCategory
  it('should return Untergewicht for BMI less than 18.5', () => {
    expect(component.getBmiCategory(18.4)).toBe('Untergewicht');
  });

  it('should return Normalgewicht for BMI between 18.5 and 24.9', () => {
    expect(component.getBmiCategory(23)).toBe('Normalgewicht');
  });

  it('should return Übergewicht -> Präadipositas for BMI between 25 and 29.9', () => {
    expect(component.getBmiCategory(28)).toBe('Übergewicht -> Präadipositas');
  });

  it('should return Übergewicht -> Adipositas for BMI 30 or more', () => {
    expect(component.getBmiCategory(30)).toBe('Übergewicht -> Adipositas');
  });

  // Tests für save
  it('should save BMI data successfully', () => {
    component.bmiForm.setValue({ height: 180, weight: 75, date: '2024-06-19' });
    dataServiceSpy.saveBMIData.and.returnValue(of({}));
    component.save();
    expect(dataServiceSpy.saveBMIData).toHaveBeenCalled();
    expect(component.SaveSuccess).toBeTrue();
  });

  it('should handle error when saving BMI data', () => {
    component.bmiForm.setValue({ height: 180, weight: 75, date: '2024-06-19' });
    dataServiceSpy.saveBMIData.and.returnValue(throwError('Error'));
    component.save();
    expect(dataServiceSpy.saveBMIData).toHaveBeenCalled();
    expect(component.SaveFail).toBeTrue();
  });

  it('should not save BMI data if form is invalid', () => {
    component.bmiForm.setValue({ height: 0, weight: 0, date: '2024-06-19' });
    component.save();
    expect(dataServiceSpy.saveBMIData).not.toHaveBeenCalled();
  });

  it('should call calculateBMIwithoutClear when saving', () => {
    spyOn(component, 'calculateBMIwithoutClear');
    component.bmiForm.setValue({ height: 180, weight: 75, date: '2024-06-19' });
    dataServiceSpy.saveBMIData.and.returnValue(of({}));
    component.save();
    expect(component.calculateBMIwithoutClear).toHaveBeenCalled();
  });
});
