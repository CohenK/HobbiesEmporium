import { Component, Input} from '@angular/core';
import { Item } from '../../shared/models/item';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent{
  @Input() displayProducts: Item[] = [];

  constructor(private router: Router){}

  toDetailsPage(item:Item){
    this.router.navigate(['details/',item.id]);
  }
}