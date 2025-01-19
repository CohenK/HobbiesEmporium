import { Component, Input} from '@angular/core';
import { Cart } from '../../shared/models/cart';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'cart-modal',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent{
  @Input() cart!: Cart;
  @Input() logged!: boolean;

  constructor(private router: Router, private cartService: CartService){}

  toCheckout(){
    if(this.cart.getAmt()===0){
      alert("There are no items in your cart to checkout.");
    }else if(!this.logged){
      alert("Please sign in or create an account to proceed.");
    }else{
      this.cartService.setCurrentCart(this.cart);
      this.router.navigate(['checkout'])
    }
  }
}
