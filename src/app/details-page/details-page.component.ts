import { Component, OnInit} from '@angular/core';
import { Item } from '../../shared/models/item';
import { DataService } from '../data.service';
import { ModelCarouselComponent } from '../model-carousel/model-carousel.component';
import { DetailInfoComponent } from '../detail-info/detail-info.component';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { EventService } from '../../shared/services/EventService';

@Component({
  selector: 'details-page',
  standalone: true,
  imports: [ModelCarouselComponent,DetailInfoComponent,AddToCartComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit{
  item!: Item;
  constructor(private dataService: DataService, private eventService: EventService){}

  addToCart(amount: any){
    this.eventService.emit("addToCart",{item: this.item, amount: amount})
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.item = data
    });
  }
} 
