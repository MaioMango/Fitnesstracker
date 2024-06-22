import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CaloriecalculatorComponent } from './caloriecalculator.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { DataService } from '../../services/data.service';
import { of, throwError } from 'rxjs';

fdescribe('CaloriecalculatorComponent', () => {
  let component: CaloriecalculatorComponent;
  let fixture: ComponentFixture<CaloriecalculatorComponent>;
  let authServiceMock: any;
  let dataServiceMock: any;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['getUsernameFromToken', 'getIdFromToken']);
    dataServiceMock = jasmine.createSpyObj('DataService', ['saveCalorieData']);
    
    await TestBed.configureTestingModule({
      declarations: [CaloriecalculatorComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: DataService, useValue: dataServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CaloriecalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.calorieForm;
    expect(form).toBeDefined();
    expect(form.get('age')?.value).toBe('');
    expect(form.get('gender')?.value).toBe('Male');
    expect(form.get('weight')?.value).toBe('');
    expect(form.get('height')?.value).toBe('');
    expect(form.get('activity')?.value).toBe('1.2');
    expect(form.get('date')?.value).toBe(new Date().toISOString().split('T')[0]);
  });

  it('should set username from auth service', () => {
    authServiceMock.getUsernameFromToken.and.returnValue('testuser');
    component.ngOnInit();
    expect(component.username).toBe('testuser');
  });

  it('should mark age as invalid if empty', () => {
    const ageControl = component.calorieForm.get('age');
    ageControl?.setValue('');
    expect(ageControl?.valid).toBeFalse();
  });
  
  it('should mark height as invalid if less than 70', () => {
    const heightControl = component.calorieForm.get('height');
    heightControl?.setValue(60);
    expect(heightControl?.valid).toBeFalse();
  });
  
  it('should mark weight as invalid if less than 4', () => {
    const weightControl = component.calorieForm.get('weight');
    weightControl?.setValue(3);
    expect(weightControl?.valid).toBeFalse();
  });

  it('should calculate calories for male', () => {
    component.calorieForm.setValue({
      age: 25,
      gender: 'Male',
      weight: 70,
      height: 175,
      activity: '1.725', // Sehr aktiv
      date: new Date().toISOString().split('T')[0]
    });
    component.calculateCalories();
    expect(component.calories).toBeCloseTo(2974);
  });

  it('should calculate calories for female', () => {
    component.calorieForm.setValue({
      age: 25,
      gender: 'Female',
      weight: 60,
      height: 165,
      activity: '1.2', // Sedentär
      date: new Date().toISOString().split('T')[0]
    });
    component.calculateCalories();
    expect(component.calories).toBeCloseTo(1686);
  });

  it('should call dataService.saveCalorieData on save with correct parame-ters', () => {
    component.calorieForm.setValue({
      age: 25,
      gender: 'Male',
      weight: 70,
      height: 175,
      activity: '1.725', // Sehr aktiv
      date: new Date().toISOString().split('T')[0]
    });

    const userId = '1';
    authServiceMock.getIdFromToken.and.returnValue(userId);
    dataServiceMock.saveCalorieData.and.returnValue(of({}));

    component.save();
    expect(dataServiceMock.saveCalorieData).toHaveBeenCalledWith(jasmine.objectContaining({
      userId: userId,
      calories: component.calories,
      date: jasmine.any(String)
    }));
  });


  it('should handle save success', () => {
    dataServiceMock.saveCalorieData.and.returnValue(of({}));
    component.save();
    expect(component.SaveSuccess).toBeTrue();
  });

  it('should handle save error', () => {
    dataServiceMock.saveCalorieData.and.returnValue(throwError(() => new Error('Save error')));
    component.save();
    expect(component.SaveFail).toBeTrue();
  });

  it('should open the activity info modal when info icon is clicked', () => {
    spyOn(component, 'openActivityInfoModal');
    const infoIcon = fixture.nativeElement.querySelector('.activity-info-icon');
    infoIcon.click();
    fixture.detectChanges();
    expect(component.openActivityInfoModal).toHaveBeenCalled();
    expect(component.showActivityInfoModal).toBeTrue();
  });
  
  it('should close the activity info modal when closeModalEvent is emitted', () => {
    component.showActivityInfoModal = true;
    component.closeActivityInfoModal();
    fixture.detectChanges();
    expect(component.showActivityInfoModal).toBeFalse();
  });

});
