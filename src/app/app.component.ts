import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Customer } from '../shared/models/customer';
import { Order } from '../shared/models/order';
import { Item } from '../shared/models/item';
import { NavbarComponent } from './navbar/navbar.component';
import { EventService } from '../shared/services/EventService';
import { max } from 'rxjs';

interface cartItem{
  item: Item,
  amount: number
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HobbiesEmporium';
  cart: Map<Item, number> = new Map<Item, number>();

  constructor(private eventService: EventService){
    eventService.listen("addToCart",(data: cartItem)=>{
      if(this.cart.has(data.item)){
        let currentAmt: number = this.cart.get(data.item) as number;
        this.cart.set(data.item,Math.min(3,currentAmt+data.amount))
      }else{
        this.cart.set(data.item,data.amount);
      }
      console.log(this.cart);
    })
  }


  // customers = [
  //   new Customer('Cohen'),
  //   new Customer('Marianne',[
  //     new Order(12345, [
  //       new Item('RG Hi-Nu Gundam', 54.99),
  //       new Item('RG RX-78-2 Ver 2.0', 34.99)
  //     ],
  //     88.98, 11.56, 101.22,
  //     new Date()
  //   )
  //   ])
  // ]

}
