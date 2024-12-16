import { Component, Input, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { FilterComponent } from '../filter/filter.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SorterComponent } from '../sorter/sorter.component';
import { DataFetchService } from '../data-fetch.service';
import { Item } from '../../shared/models/item';
import events from './../../shared/services/EventService';

@Component({
  selector: 'shopping-page',
  standalone: true,
  imports: [ProductListComponent, FilterComponent, SearchBarComponent, SorterComponent],
  templateUrl: './shopping-page.component.html',
  styleUrl: './shopping-page.component.css'
})
export class ShoppingPageComponent implements OnInit{
  @Input() products: Item[] = [];
  @Input() searchText: string = "";

  constructor(private dataFetchService: DataFetchService){
    events.listen('searchProduct',(searchTerm: any)=>{
      console.log(`searching for ${searchTerm} in product list`)
      if(searchTerm === " "){
        this.displayItems = this.products;
      }
      else{
        this.displayItems = this.products.filter(item => item.name.toUpperCase().includes(searchTerm.toUpperCase()))
      }
      console.log(this.displayItems);
    })
  }
  ngOnInit(): void {
    this.dataFetchService.getItems().subscribe((data: any)=>{
      this.products = data;
      this.displayItems = this.products;
    });
  }
  displayItems: Item[] = [];
}
