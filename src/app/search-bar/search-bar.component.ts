import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import events from './../../shared/services/EventService';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchText = '';
  searchItem(){
    events.emit('searchProduct', this.searchText);
  }
}
