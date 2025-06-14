import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentShippingPageComponent } from './payment-shipping-page.component';

describe('PaymentShippingPageComponent', () => {
  let component: PaymentShippingPageComponent;
  let fixture: ComponentFixture<PaymentShippingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentShippingPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentShippingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
