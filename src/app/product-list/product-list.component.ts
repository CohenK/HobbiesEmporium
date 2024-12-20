import { Component, Input} from '@angular/core';
import { Item } from '../../shared/models/item';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { EventService } from '../../shared/services/EventService';
import { DataService } from '../data.service';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent{
  @Input() displayProducts: Item[] = [];

  constructor(private router: Router, private eventService: EventService, private dataService: DataService){}

  toDetailsPage(item:Item){
    this.dataService.setSelectedProduct(item);
    this.router.navigate(['details'])
  }
}