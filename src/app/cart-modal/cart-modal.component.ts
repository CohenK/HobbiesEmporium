import { Component, Input} from '@angular/core';
import { Cart } from '../../shared/models/cart';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { Item } from '../../shared/models/item';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'cart-modal',
  standalone: true,
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent{
  @Input() cart!: Cart;
}
