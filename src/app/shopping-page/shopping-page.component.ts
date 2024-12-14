import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { FilterComponent } from '../filter/filter.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SorterComponent } from '../sorter/sorter.component';

@Component({
  selector: 'shopping-page',
  standalone: true,
  imports: [ProductListComponent, FilterComponent, SearchBarComponent, SorterComponent],
  templateUrl: './shopping-page.component.html',
  styleUrl: './shopping-page.component.css'
})
export class ShoppingPageComponent {

}
