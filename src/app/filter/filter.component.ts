import { Component } from '@angular/core';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})




export class FilterComponent {
  gradeFilters = [
    {filter: "Entry Grade", active: false}, 
    {filter: "High Grade", active: false},
    {filter: "Real Grade",active: false},
    {filter: "Master Grade", active: false},
    {filter: "Perfect Grade", active: false},
    {filter:"Super Deformed", active: false},
    {filter: "Reborn 100", active: false}
  ]
  sizeFilters = [
    {filter: "1/144", active: false},
    {filter: "1/100", active: false},
    {filter: "1/72", active: false},
    {filter: "1/60", active: false},
    {filter: "1/48", active: false},
    {filter: "SD", active: false},

  ]
  premiumFilters = [
    {filter: "Yes", active: false},
    {filter: "No", active: false}
  ]
}
