import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieInfoModalComponent } from './calorie-info-modal.component';

describe('CalorieInfoModalComponent', () => {
  let component: CalorieInfoModalComponent;
  let fixture: ComponentFixture<CalorieInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalorieInfoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalorieInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
