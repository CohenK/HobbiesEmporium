import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Billing } from '../../shared/models/billing';
import { invalidCardNumber, invalidCVC, invalidZipCode, invalidAddress, invalidExpirationYear } from '../validators';
import { Router } from '@angular/router';
import { EventService } from '../../shared/services/EventService';

@Component({
  selector: 'checkout-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})

export class CheckoutPageComponent {
  billingInfo: Billing =  new Billing();
  constructor(private router: Router, private eventService: EventService){}

  paymentForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    cardNumber: new FormControl('', [Validators.required, invalidCardNumber]),
    expirationMonth: new FormControl('', Validators.required),
    expirationYear: new FormControl('', [Validators.required, invalidExpirationYear]),
    cvc: new FormControl('', [Validators.required, invalidCVC]),
    billingAddress: new FormControl('', [Validators.required, invalidAddress]),
    city: new FormControl('', [Validators.required, invalidAddress]),
    zipcode: new FormControl('', [Validators.required, invalidZipCode])
  })
  submitForm(){
    const now = new Date();
    if((Number(this.billingInfo.expirationMonth) <= now.getMonth() && Number(this.billingInfo.expirationYear) <= now.getFullYear()) || Number(this.billingInfo.expirationYear) < now.getFullYear()){
      alert("Invalid expiration info");
      return;
    }
    this.eventService.emit("checkoutInfo",this.billingInfo);
    this.router.navigate(['delivery']);
  }
}
