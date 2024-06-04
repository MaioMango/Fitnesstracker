import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualBarcodescannerModalComponent } from './manual-barcodescanner-modal.component';

describe('ManualBarcodescannerModalComponent', () => {
  let component: ManualBarcodescannerModalComponent;
  let fixture: ComponentFixture<ManualBarcodescannerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualBarcodescannerModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualBarcodescannerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
