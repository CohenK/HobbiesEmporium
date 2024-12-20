import { Component, OnInit} from '@angular/core';
import { Item } from '../../shared/models/item';
import { DataService } from '../data.service';

@Component({
  selector: 'details-page',
  standalone: true,
  imports: [],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit{
  item!: Item;
  constructor(private dataService: DataService){
    
  }
  

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.item = data
    });
    console.log(this.item);
  }
} 
