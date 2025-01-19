import { Component, Input } from '@angular/core';
import { EventService } from '../../shared/services/EventService';
import { value } from '../../shared/interfaces';

@Component({
  selector: 'cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})

export class CartItemComponent{
  @Input() cartItem!: [string, value];

  constructor(public eventService: EventService){}

  increment(){
    if(this.cartItem[1].amount < 3){
      this.eventService.emit("incrementCartCount",this.cartItem[0]);
    }
  }
  decrement(){
    if(this.cartItem[1].amount > 1){
      this.eventService.emit("decrementCartCount",this.cartItem[0]);
    }
  }
  removeItem(){
    this.eventService.emit("removeItem",this.cartItem[0]);
  }
}
