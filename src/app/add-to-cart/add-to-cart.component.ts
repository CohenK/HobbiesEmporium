import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-to-cart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-to-cart.component.html',
  styleUrl: './add-to-cart.component.css'
})
export class AddToCartComponent {
  @Output() amount = new EventEmitter<number>();
  count: number = 1;
  

  decrement(){
    if(this.count > 1){
      this.count = this.count-1;
    } 
  }
  increment(){
    if(this.count < 3){
      this.count = this.count+1;
    }
  }
  indicateAmount(){
    this.amount.emit(this.count);
  }
}
