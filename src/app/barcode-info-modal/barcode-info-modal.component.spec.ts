import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeInfoModalComponent } from './barcode-info-modal.component';

describe('BarcodeInfoModalComponent', () => {
  let component: BarcodeInfoModalComponent;
  let fixture: ComponentFixture<BarcodeInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarcodeInfoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarcodeInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
