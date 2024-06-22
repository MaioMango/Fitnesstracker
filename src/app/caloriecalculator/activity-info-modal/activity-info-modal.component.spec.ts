import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityInfoModalComponent } from './activity-info-modal.component';

describe('ActivityInfoModalComponent', () => {
  let component: ActivityInfoModalComponent;
  let fixture: ComponentFixture<ActivityInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityInfoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
