import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import events from './../../shared/services/EventService';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})

export class FilterComponent {
  gradeFilters = [
    {filter: "Entry Grade", isActive: false}, 
    {filter: "High Grade", isActive: false},
    {filter: "Real Grade",isActive: false},
    {filter: "Master Grade", isActive: false},
    {filter: "Perfect Grade", isActive: false},
    {filter:"Super Deformed", isActive: false},
    {filter: "Reborn 100", isActive: false}
  ]
  sizeFilters = [
    {filter: "1/144", isActive: false},
    {filter: "1/100", isActive: false},
    {filter: "1/72", isActive: false},
    {filter: "1/60", isActive: false},
    {filter: "1/48", isActive: false},
    {filter: "Super Deformed", isActive: false},

  ]
  premiumFilters = [
    {filter: "Yes", isActive: false},
    {filter: "No", isActive: false}
  ]
  filters = {
    gradeFilters:[] as string[],
    sizeFilters:[] as string[],
    premiumFilters:[] as string[]
  };

  //appends or removes filters based on user input and sends this list to shoppingPage to determine data output to product list
  toggleFilter(filter: any, filterType: any){
    filter.isActive = !filter.isActive;
    if(filter.isActive){
      filterType.push(filter.filter);
    }else{
      let index = filterType.indexOf(filter.filter);
      filterType.splice(index,1);
    }
    events.emit('filterChanged', this.filters);
  }
}
