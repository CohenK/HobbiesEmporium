import { Component, OnInit} from '@angular/core';
import { Item } from '../../shared/models/item';
import { ModelCarouselComponent } from '../model-carousel/model-carousel.component';
import { DetailInfoComponent } from '../detail-info/detail-info.component';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';
import { EventService } from '../../shared/services/EventService';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

@Component({
  selector: 'details-page',
  standalone: true,
  imports: [ModelCarouselComponent,DetailInfoComponent,AddToCartComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit{
  loading: boolean = true;
  productId!: number;
  item!: Item;
  constructor(private eventService: EventService, private route: ActivatedRoute){}

  addToCart(amount: any){
    this.eventService.emit("addToCart",{item: this.item, amount: amount})
  }

  async ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('productID'));
    });

    try{  
      const docRef = doc(db, "products", this.productId.toString());
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      if (docSnap.exists()){
        this.item = docSnap.data() as Item;
      }else{
        console.error("Item does not exist.");
      }
    }catch(error) {
      console.error('Error fetching document:', error);
    } finally {
      this.loading = false;
    }
    
  };

} 
