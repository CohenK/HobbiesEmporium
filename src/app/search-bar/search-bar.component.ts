import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    console.log(`Searching for ${this.searchText}`)
  }
}
