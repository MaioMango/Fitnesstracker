import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInfoModalComponent } from './food-info-modal.component';

describe('FoodInfoModalComponent', () => {
  let component: FoodInfoModalComponent;
  let fixture: ComponentFixture<FoodInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodInfoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
