import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../shared/services/EventService';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchText = '';
  constructor(private eventService: EventService){}
  searchItem(){
    this.eventService.emit('searchProduct', this.searchText);
    this.eventService.emit('resetSort',0);
  }
  clearSearch(){
    this.searchText = "";
    this.eventService.emit('searchProduct', this.searchText)
    this.eventService.emit('resetSort', 0);
  }
}
