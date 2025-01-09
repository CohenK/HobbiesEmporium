import { Component } from '@angular/core';
import { Cart } from '../../shared/models/cart';
import { CartService } from '../cart.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Delivery } from '../../shared/models/delivery';
import { invalidZipCode, invalidAddress, invalidPhoneNumber } from '../validators';
import { Router } from '@angular/router';

@Component({
  selector: 'delivery-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './delivery-page.component.html',
  styleUrl: './delivery-page.component.css'
})

export class DeliveryPageComponent {
  cart!: Cart;
  deliveryInfo: Delivery =  new Delivery();
  constructor(private cartService: CartService, private router: Router){}

  ngOnInit(): void {
    this.cartService.getCartData().subscribe(data => {
      this.cart = data
    });
  }

  deliveryForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, invalidPhoneNumber]),
    email: new FormControl('', Validators.email),
    billingAddress: new FormControl('', [Validators.required, invalidAddress]),
    city: new FormControl('', [Validators.required, invalidAddress]),
    zipcode: new FormControl('', [Validators.required, invalidZipCode])
  })
  submitForm(){
    this.router.navigate([''])
  }
}
