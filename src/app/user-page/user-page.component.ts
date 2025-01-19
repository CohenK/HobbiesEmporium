import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { orderInfo, userInfo } from '../../shared/interfaces';
import { LoggedService } from '../../shared/services/LoggedService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit{
  loading: boolean = true;
  logged!: boolean;
  userID: string = "";
  userInfo!: userInfo;
  orders: orderInfo[] = [];

  constructor(private route: ActivatedRoute, private loggedService: LoggedService){}

  async ngOnInit(){
    this.loggedService.state.subscribe((current)=>{
      this.logged = current;
    })
    if(this.logged){
      this.route.paramMap.subscribe(params => {
        this.userID = params.get('userID') as string;
      });
    
      try{  
        const docRef = doc(db, "users", this.userID);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        this.userInfo = {
          email: data!['email'],
          orders: data!['orders']
        };
        this.userInfo.orders.forEach(async(order)=>{
          const docRef = doc(db, "orders", order);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          this.orders.push({
            id: order,
            date: (data!['orderDate']).toDate(),
            total: data!['total']
          })
        })
  
      }catch(error) {
        console.error('Error fetching user info:', error);
      } finally {
        this.loading = false;
      };
    }
  }
}
