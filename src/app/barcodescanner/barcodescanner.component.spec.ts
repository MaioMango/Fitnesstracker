import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodescannerComponent } from './barcodescanner.component';

describe('BarcodescannerComponent', () => {
  let component: BarcodescannerComponent;
  let fixture: ComponentFixture<BarcodescannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarcodescannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarcodescannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
