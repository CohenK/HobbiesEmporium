import { Component } from '@angular/core';
import { Cart } from '../../shared/models/cart';
import { CartService } from '../cart.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Billing } from '../../shared/models/billing';
import { invalidCardNumber, invalidCVC, invalidZipCode, invalidAddress, invalidExpirationYear } from '../validators';
import { Router } from '@angular/router';

@Component({
  selector: 'checkout-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})

export class CheckoutPageComponent {
  cart!: Cart;
  billingInfo: Billing =  new Billing();
  constructor(private cartService: CartService, private router: Router){}

  ngOnInit(): void {
    this.cartService.getCartData().subscribe(data => {
      this.cart = data
    });
  }

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
    this.router.navigate(['delivery'])
  }
}
