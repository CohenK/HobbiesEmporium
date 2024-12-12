import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Customer } from '../shared/models/customer';
import { Order } from '../shared/models/order';
import { Item } from '../shared/models/item';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HobbiesEmporium';
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
