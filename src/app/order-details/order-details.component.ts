import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggedService } from '../../shared/services/LoggedService';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { firestoreOrder } from '../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { MaskCreditCardPipe } from '../mask-credit-card.pipe';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, MaskCreditCardPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit{
  loading: boolean = true;
  orderID!: string;
  userID!: string;
  orderInfo!:firestoreOrder;
  logged!: boolean;
  falseUser: boolean = false;

  constructor(private route: ActivatedRoute, private loggedService: LoggedService){}

  async ngOnInit(){
    this.loggedService.state.subscribe((current)=>{
      this.logged = current;
    })
    if(this.logged){
      this.route.paramMap.subscribe(params => {
        this.orderID = params.get('orderID') as string;
        this.userID = params.get('userID') as string;
      })

      try{  
        const docRef = doc(db, "orders", this.orderID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();

        if(this.userID != data!['account']){
          this.falseUser = true;
          this.loading = false;
          return;
        }
        const temp: any[] = [];
        data!['items'].forEach((item: any)=>{
          temp.push(JSON.parse(item));
        })
        this.orderInfo = {
          account: data!['account'] as string,
          amount: data!['amount'] as number,
          checkoutInfo: JSON.parse(data!['checkoutInfo']),
          deliveryInfo: JSON.parse(data!['deliveryInfo']),
          items: temp,
          orderDate: data!['orderDate'].toDate(),
          subTotal: data!['subTotal'],
          tax: data!['tax'],
          total: data!['total']
        }
      }catch(error) {
        console.error('Error fetching order info:', error);
      } finally {
        this.loading = false;
      };
    };
  }
}
