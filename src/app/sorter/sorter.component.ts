import { Component } from '@angular/core';
import { Item } from '../../shared/models/item';
import { FormsModule } from '@angular/forms';
import events from './../../shared/services/EventService'

@Component({
  selector: 'sorter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sorter.component.html',
  styleUrl: './sorter.component.css'
})

export class SorterComponent {
  DateConversion(data: string){
    const[month,year]=data.split('');
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return [Number(year),months.indexOf(month)];
  }
  
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

  listSorter = 0      


  sorterChanged(value: any){
    events.emit('sort', this.sorters[value])
  }
}
