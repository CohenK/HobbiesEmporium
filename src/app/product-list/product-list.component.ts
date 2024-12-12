import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../shared/models/item';
import { ProductCardComponent } from '../product-card/product-card.component';
import { DataFetchService } from '../data-fetch.service';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  constructor(private dataFetchService: DataFetchService){}
  ngOnInit(): void {
    this.dataFetchService.getItems().subscribe((data: any)=>{
      this.products = data;
    });
  }
  @Input() products: Item[] = [];
}