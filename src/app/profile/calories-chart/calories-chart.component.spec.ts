import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesChartComponent } from './calories-chart.component';

describe('CaloriesChartComponent', () => {
  let component: CaloriesChartComponent;
  let fixture: ComponentFixture<CaloriesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaloriesChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaloriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
