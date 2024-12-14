import { Component } from '@angular/core';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filters = ['Entry Grade', 'High Grade', "Real Grade", "Master Grade", "Perfect Grade", "Super Deformed", "Reborn 100", "P-Bandai"]
}
