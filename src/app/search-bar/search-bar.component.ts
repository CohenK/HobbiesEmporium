import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../shared/services/EventService';

import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchText = '';
  constructor(private eventService: EventService, private router: Router) {}

  toSearchResults() {
    if (this.searchText) {
      this.router.navigate(['search/'], {
        queryParams: { searchTerm: this.searchText },
      });
      this.eventService.emit('resetSort', 0);
    }
  }
  clearSearch() {
    this.searchText = '';
    this.eventService.emit('resetSort', 0);
  }
}
