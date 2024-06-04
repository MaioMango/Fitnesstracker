import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiInfoModalComponent } from './bmi-info-modal.component';

describe('BmiInfoModalComponent', () => {
  let component: BmiInfoModalComponent;
  let fixture: ComponentFixture<BmiInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmiInfoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmiInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
