import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Customer } from '../shared/models/customer';
import { Order } from '../shared/models/order';
import { Item } from '../shared/models/item';
import { NavbarComponent } from './navbar/navbar.component';
import { EventService } from '../shared/services/EventService';
import { Cart } from '../shared/models/cart';

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
  cart = new Cart(new Map<Item, number>(),0)

  constructor(eventService: EventService){
    eventService.listen("addToCart",(data: cartItem)=>{
      this.cart.addItem(data);
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
