import { Component, Input } from '@angular/core';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'detail-info',
  standalone: true,
  imports: [],
  templateUrl: './detail-info.component.html',
  styleUrl: './detail-info.component.css'
})
export class DetailInfoComponent {
  @Input() item!: Item;
}
