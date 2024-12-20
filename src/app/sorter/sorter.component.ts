import { Component } from '@angular/core';
import { Item } from '../../shared/models/item';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../shared/services/EventService';

@Component({
  selector: 'sorter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sorter.component.html',
  styleUrl: './sorter.component.css'
})

export class SorterComponent {
  sorters = [
    0,
    (item1: Item, item2: Item) =>{
      return item1.price > item2.price ? 1:-1;
    },
    (item1: Item, item2: Item)=>{
      return item1.price < item2.price ? 1:-1;
    },
    (item1: Item, item2: Item)=>{
      return item1.name > item2.name ? 1:-1;
    },
    (item1: Item, item2: Item)=>{
      return item1.name < item2.name ? 1:-1;
    },
    (item1: Item, item2: Item)=>{
      let item1Date = new Date(item1.release);
      let item2Date = new Date(item2.release)
      return item1Date > item2Date ? 1:-1;
    },
    (item1: Item, item2: Item)=>{
      let item1Date = new Date(item1.release);
      let item2Date = new Date(item2.release)
      return item1Date < item2Date ? 1:-1;
    }
  ]
  constructor(private eventService: EventService){
    eventService.listen('resetSort', (value:any)=>{
      this.sorterChanged(this.listSorter);
    })
  }

  listSorter = 0      
 

  sorterChanged(value: any){
    this.eventService.emit('sort', this.sorters[value])
  }
}
