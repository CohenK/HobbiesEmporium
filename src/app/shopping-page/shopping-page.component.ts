import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { SorterComponent } from '../sorter/sorter.component';
import { Item } from '../../shared/models/item';
import { EventService } from '../../shared/services/EventService';
import { FilterComponent } from '../filter/filter.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { BackendService } from '../../shared/services/backendService';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'shopping-page',
  standalone: true,
  imports: [
    ProductListComponent,
    FilterComponent,
    SearchBarComponent,
    SorterComponent,
  ],
  templateUrl: './shopping-page.component.html',
  styleUrl: './shopping-page.component.css',
})
export class ShoppingPageComponent implements OnInit {
  searchTerm: String = '';
  products: Item[] = [];
  sortResult: Item[] = [];
  filteredResult: Item[] = [];
  displayedItems: Item[] = [];
  pagedItems: Item[] = [];
  loading: boolean = true;
  searching: boolean = false;
  page: number = 1;
  prodPerPage = 8;

  //Most recent history of user search for sequential processing of items: sort > filter
  //Makes item results robust so one phase of the item manipulation doesn't forget the needs of the other phases
  //Updated when each corresponding event is called
  recentQueries = {
    sort: () => {},
    filters: { gradeFilters: [], sizeFilters: [], premiumFilters: [] },
  };

  constructor(
    eventService: EventService,
    private backendService: BackendService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    eventService.listen('sort', (value: any) => {
      this.recentQueries.sort = value;
      if (value !== 0) {
        this.sortResult.sort(value);
      }
      eventService.emit('filterChanged', this.recentQueries.filters);
    });

    eventService.listen('filterChanged', (filters: any) => {
      this.recentQueries.filters = filters;
      let gradeTemp: Set<Item> = new Set();
      this.filteredResult = [...this.sortResult];

      if (filters.gradeFilters.length > 0 && filters.gradeFilters.length < 7) {
        this.filteredResult.forEach((product) => {
          if (filters.gradeFilters.includes(product.grade)) {
            gradeTemp.add(product);
          }
        });
      } else {
        gradeTemp = new Set(this.sortResult);
      }
      let sizeTemp: Set<Item> = new Set();

      if (filters.sizeFilters.length > 0 && filters.sizeFilters.length < 6) {
        gradeTemp.forEach((item: Item) => {
          filters.sizeFilters.forEach((filter: string) => {
            if (item.size === filter) {
              sizeTemp.add(item);
            }
          });
        });
      } else {
        sizeTemp = gradeTemp;
      }
      if (filters.premiumFilters.length === 1) {
        if (filters.premiumFilters[0] === 'Yes') {
          sizeTemp.forEach((item) => {
            if (item.pbandai === false) {
              sizeTemp.delete(item);
            }
          });
        } else {
          sizeTemp.forEach((item) => {
            if (item.pbandai === true) {
              sizeTemp.delete(item);
            }
          });
        }
      }
      this.filteredResult = Array.from(sizeTemp);
      this.displayedItems = [...this.filteredResult];
      this.updatePagedItems();
    });
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.searchTerm = params.get('searchTerm') ?? '';
      this.page = 1;
      if (this.searchTerm) {
        this.searching = true;
        this.backendService.getSearchProducts(this.searchTerm).subscribe({
          next: (response: Item[]) => {
            console.log(response);
            this.products = response.map(
              (item) =>
                new Item(
                  item.id,
                  item.name,
                  item.grade,
                  item.size,
                  item.release,
                  item.pbandai,
                  item.price,
                  item.thumbnail,
                  item.model
                )
            );
            this.sortResult = [...this.products];
            this.displayedItems = [...this.products];
            this.updatePagedItems();
          },
          error: (err) => {
            console.error('Error fetching our products:', err);
          },
          complete: () => {
            this.loading = false;
          },
        });
      } else {
        this.backendService.getAllProducts().subscribe({
          next: (response: Item[]) => {
            this.products = response.map(
              (item) =>
                new Item(
                  item.id,
                  item.name,
                  item.grade,
                  item.size,
                  item.release,
                  item.pbandai,
                  item.price,
                  item.thumbnail,
                  item.model
                )
            );
            this.sortResult = [...this.products];
            this.displayedItems = [...this.products];
            this.updatePagedItems();
          },
          error: (err) => {
            console.error('Error fetching our products:', err);
          },
          complete: () => {
            this.loading = false;
          },
        });
      }
    });
  }
  get totalPages(): number {
    return Math.ceil(this.products.length / this.prodPerPage);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePagedItems();
    }
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagedItems();
    }
  }

  updatePagedItems() {
    const start = (this.page - 1) * this.prodPerPage;
    const end = this.page * this.prodPerPage;
    this.pagedItems = this.displayedItems.slice(start, end);
  }

  resetSearch() {
    this.router.navigate(['']);
  }
}
