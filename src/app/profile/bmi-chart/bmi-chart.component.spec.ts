import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiChartComponent } from './bmi-chart.component';

describe('BmiChartComponent', () => {
  let component: BmiChartComponent;
  let fixture: ComponentFixture<BmiChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmiChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
