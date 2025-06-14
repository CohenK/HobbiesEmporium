import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/models/item';
import { ModelCarouselComponent } from '../model-carousel/model-carousel.component';
import { DetailInfoComponent } from '../detail-info/detail-info.component';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { EventService } from '../../shared/services/EventService';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../shared/services/backendService';

@Component({
  selector: 'details-page',
  standalone: true,
  imports: [ModelCarouselComponent, DetailInfoComponent, AddToCartComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css',
})
export class DetailsPageComponent implements OnInit {
  loading: boolean = true;
  productId!: string;
  item!: Item;
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}

  addToCart(amount: any) {
    this.eventService.emit('addToCart', { item: this.item, amount: amount });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('productID') as string;
    });
    if (this.productId) {
      this.loading = true;
      this.backendService.getProduct(parseInt(this.productId)).subscribe({
        next: (item) => {
          if (item) {
            this.item = item;
          } else {
            console.error('Item does not exist.');
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          this.loading = false;
        },
      });
    } else {
      console.error('ProductID not found');
      this.loading = false;
    }
  }
}
