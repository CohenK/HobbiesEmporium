import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../shared/models/item';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent{
  @Input() displayProducts: Item[] = [];
}