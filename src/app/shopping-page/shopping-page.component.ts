import { Component, Input, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { SorterComponent } from '../sorter/sorter.component';
import { DataFetchService } from '../data-fetch.service';
import { Item } from '../../shared/models/item';
import { EventService } from '../../shared/services/EventService';
import { FilterComponent } from '../filter/filter.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'shopping-page',
  standalone: true,
  imports: [ProductListComponent, FilterComponent, SearchBarComponent, SorterComponent],
  templateUrl: './shopping-page.component.html',
  styleUrl: './shopping-page.component.css'
})
export class ShoppingPageComponent implements OnInit{
  products: Item[] = [];
  searchResult: Item[] = [];
  sortResult: Item[] = [];
  filteredResult: Item[] = [];
  displayedItems: Item[] = [];

  //Most recent history of user search for sequential processing of items: search > sort > filter
  //Makes item results robust so one phase of the item manipulation doesn't forget the needs of the other phases
  //Updated when each corresponding event is called
  recentQueries = {searchTerm: "", sort:()=>{}, filters:{}}; 

  constructor(private dataFetchService: DataFetchService, eventService: EventService){
    eventService.listen('searchProduct',(searchTerm: any)=>{
      this.recentQueries.searchTerm = searchTerm; 
      if(searchTerm === " "){
        this.searchResult = this.products;
      }
      else{
        this.searchResult = this.products.filter(item => item.name.toUpperCase().includes(searchTerm.toUpperCase()));
      }
      eventService.emit('sort',this.recentQueries.sort)
    })

    eventService.listen('sort',(value:any)=>{
      this.recentQueries.sort = value;
      this.sortResult = [...this.searchResult];
      if(value===0){
        this.sortResult = [...this.searchResult];
      }else{
        this.sortResult.sort(value)
      }
      eventService.emit('filterChanged',this.recentQueries.filters)
    })

    eventService.listen('filterChanged',(filters: any)=>{
      this.recentQueries.filters = filters;
      let gradeTemp: Set<Item> = new Set();
      this.filteredResult = [...this.sortResult];

      if(filters.gradeFilters.length > 0 && filters.gradeFilters.length < 7){
        this.filteredResult.forEach(product=>{
          filters.gradeFilters.forEach((filter: string)=> {
            if(product.grade === filter){
              gradeTemp.add(product);
            }
          });
        })
      }else{
        gradeTemp = new Set(this.sortResult);
      }
      let sizeTemp: Set<Item> = new Set();

      if(filters.sizeFilters.length > 0 && filters.sizeFilters.length < 6){
        gradeTemp.forEach((item: Item)=>{
          filters.sizeFilters.forEach((filter:string)=>{
            if(item.size === filter){
              sizeTemp.add(item);
            }
          })
        })
      }else{
        sizeTemp = gradeTemp;
      }
      if(filters.premiumFilters.length === 1){
        if(filters.premiumFilters[0] === 'Yes'){
          sizeTemp.forEach(item=>{
            if(item.pbandai === false){
              sizeTemp.delete(item);
            }
          })
        }else{
          sizeTemp.forEach(item=>{
            if(item.pbandai === true){
              sizeTemp.delete(item);
            }
          })
        }
      }
      this.filteredResult = Array.from(sizeTemp);
      this.displayedItems = [...this.filteredResult];
    })
  }
  ngOnInit(): void {
    this.dataFetchService.getItems().subscribe((data: any)=>{
      this.products = data;
      this.searchResult = [...this.products];
      this.sortResult = [...this.products];
      this.displayedItems = [...this.products];
    });
  }
}
