import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { WeightComponent } from './weight.component';
import { AuthService } from '../services/auth.service';
import { DataService } from '../../services/data.service';

fdescribe('WeightComponent', () => {
  let component: WeightComponent;
  let fixture: ComponentFixture<WeightComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let dataServiceMock: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['getIdFromToken']);
    dataServiceMock = jasmine.createSpyObj('DataService', ['saveWeightData']);

    await TestBed.configureTestingModule({
      declarations: [WeightComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: DataService, useValue: dataServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    // Arrange
    const expectedDate = new Date().toISOString().split('T')[0];

    // Act
    component.ngOnInit();

    // Assert
    expect(component.weightForm.value).toEqual({
      weight: '',
      date: expectedDate
    });
  });

  it('should validate the form correctly', () => {
    // Arrange
    const weightInput = component.weightForm.controls['weight'];
    const dateInput = component.weightForm.controls['date'];

    // Act 1
    weightInput.setValue('');
    dateInput.setValue('');

    // Assert 1
    expect(component.weightForm.valid).toBeFalsy();

    // Act 2
    weightInput.setValue(3);
    dateInput.setValue('2023-01-01');

    // Assert 2
    expect(component.weightForm.valid).toBeFalsy();

    // Act 3
    weightInput.setValue(5);

    // Assert 3
    expect(component.weightForm.valid).toBeTruthy();
  });

  it('should save data successfully and show success message', () => {
    // Arrange
    authServiceMock.getIdFromToken.and.returnValue(1);
    dataServiceMock.saveWeightData.and.returnValue(of({}));

    // Act
    component.weightForm.controls['weight'].setValue(5);
    component.weightForm.controls['date'].setValue('2023-01-01');
    component.save();
    fixture.detectChanges();

    // Assert
    expect(component.SaveSuccess).toBeTrue();
    expect(component.SaveFail).toBeFalse();
    expect(dataServiceMock.saveWeightData).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('.alert-success'))).not.toBeNull();
  });

  it('should handle save error and show fail message', () => {
    // Arrange
    authServiceMock.getIdFromToken.and.returnValue(1);
    dataServiceMock.saveWeightData.and.returnValue(throwError('error'));
    component.weightForm.controls['weight'].setValue(5);
    component.weightForm.controls['date'].setValue('2023-01-01');

    // Act
    component.save();
    fixture.detectChanges();

    // Assert
    expect(component.SaveSuccess).toBeFalse();
    expect(component.SaveFail).toBeTrue();
    expect(dataServiceMock.saveWeightData).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('.alert-danger'))).not.toBeNull();
  });

  it('should correct negative weight values to 4', () => {
    // Arrange
    const weightInput = component.weightForm.controls['weight'];
    weightInput.setValue(-5);

    // Act
    component.checkNegativeValue('weight');
    fixture.detectChanges();

    // Assert
    expect(weightInput.value).toBe(4);
  });

  it('should handle edge case: weight exactly 4 kg', () => {
    // Arrange
    const weightInput = component.weightForm.controls['weight'];
    weightInput.setValue(4);

    // Act
    component.checkNegativeValue('weight');
    fixture.detectChanges();

    // Assert
    expect(weightInput.value).toBe(4);
  });

  it('should handle edge case: no date selected', () => {
    // Arrange
    spyOn(component, 'save').and.callThrough();
    component.weightForm.controls['weight'].setValue(5);
    component.weightForm.controls['date'].setValue('');

    // Act
    component.save();
    fixture.detectChanges();

    // Assert
    expect(component.save).toHaveBeenCalled();
    expect(dataServiceMock.saveWeightData).not.toHaveBeenCalled();
  });

  it('should handle edge case: empty weight value', () => {
    // Arrange
    spyOn(component, 'save').and.callThrough();
    component.weightForm.controls['weight'].setValue('');
    component.weightForm.controls['date'].setValue('2023-01-01');

    // Act
    component.save();
    fixture.detectChanges();

    // Assert
    expect(component.save).toHaveBeenCalled();
    expect(dataServiceMock.saveWeightData).not.toHaveBeenCalled();
  });
});
