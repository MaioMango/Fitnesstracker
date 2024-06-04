import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingFoodModalComponent } from './existing-food-modal.component';

describe('ExistingFoodModalComponent', () => {
  let component: ExistingFoodModalComponent;
  let fixture: ComponentFixture<ExistingFoodModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExistingFoodModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExistingFoodModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
