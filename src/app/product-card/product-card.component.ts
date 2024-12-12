import { Component, Input } from '@angular/core';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() item!: Item;
}