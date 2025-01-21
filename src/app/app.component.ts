import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { EventService } from '../shared/services/EventService';
import { Cart } from '../shared/models/cart';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { ThankyouModalComponent } from './thankyou-modal/thankyou-modal.component';
import { cartItem, value } from '../shared/interfaces';
import { Billing } from '../shared/models/billing';
import { Delivery } from '../shared/models/delivery';
import { db } from './firebase';
import { doc, updateDoc, addDoc, collection, getDoc } from "firebase/firestore";
import { LoggedService } from '../shared/services/LoggedService';
import { SessionService } from '../shared/services/SessionService';
import { Item } from '../shared/models/item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CartModalComponent, ThankyouModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'HobbiesEmporium';
  cart = new Cart();
  loggedIn: boolean = false;
  userID: string = "";
  userCheckoutInfo: Billing = new Billing();
  userDeliveryInfo: Delivery = new Delivery();

  async updateFirestoreUserCart(){
    const userDocRef = doc(db, `users/${this.userID}`);
    await updateDoc(userDocRef, {
      cart: this.cart.serialize()
    });
  }
  async coalesceCarts(){
    const userDocRef = doc(db, `users/${this.userID}`);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.data();
    const userCartInfo: string = userData!['cart'];
    const userCartData = JSON.parse(userCartInfo, (k, v) => {
      if (v && v.__isMap) {
        // Convert back to Map
        return new Map(v.data);
      }
      return v;
    });
    const cart = new Cart();
    this.cart.getItems().forEach((value,item)=>{
      cart.addItem({item: JSON.parse(item) as Item, amount: value.amount});
    })
    const userCartDataItems = userCartData.cartItems as Map<string,value>;
    userCartDataItems.forEach((value,item)=>{
      cart.addItem({item: JSON.parse(item) as Item, amount: value.amount});
    })
    // const totalAmount = this.cart.getAmt() + userCartData.amount;
    // const totalSubTotal = this.cart.getSubTotal() + userCartData.subTotal;
    // const allItems = new Map<string,value>([...this.cart.getItems(),...userCartData.cartItems]);
    // return new Cart(allItems, totalAmount, totalSubTotal);
    return cart;
  }

  constructor(eventService: EventService, private router: Router, private loggedService: LoggedService, private sessionService: SessionService){
    eventService.listen("addToCart",(data: cartItem)=>{
      if(this.cart.addItem(data)){
        alert("Items have been added to your cart.")  
      }else{
        alert("No more of this item can be purchased.")
      }
      this.sessionService.setObjectWithMap('userCartInfo', this.cart);
      if(this.loggedIn) this.updateFirestoreUserCart();
    });
    eventService.listen("incrementCartCount",(data: string)=>{
      this.cart.itemIncrement(data);
      this.sessionService.setObjectWithMap('userCartInfo', this.cart);
      if(this.loggedIn) this.updateFirestoreUserCart();
    });
    eventService.listen("decrementCartCount",(data: string)=>{
      this.cart.itemDecrement(data);
      this.sessionService.setObjectWithMap('userCartInfo', this.cart);
      if(this.loggedIn) this.updateFirestoreUserCart();
    });
    eventService.listen("removeItem",(data: string)=>{
      this.cart.removeItem(data);
      this.sessionService.setObjectWithMap('userCartInfo', this.cart);
      if(this.loggedIn) this.updateFirestoreUserCart();
    });
    eventService.listen("checkoutInfo",(data: Billing)=>{
      this.userCheckoutInfo = data;
      this.sessionService.setData('userCheckoutInfo', data);
    });
    eventService.listen("deliveryInfo", async (data: Delivery)=>{
      this.userDeliveryInfo = data;
      this.sessionService.setData('userDeliveryInfo', data);
      try{
        const collectionRef = collection(db, 'orders');
        const userDocRef = doc(db, `users/${this.userID}`);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data();
        const userOrders: string[] = userData!['orders'];
        let items: string[] = [];
        this.cart.getItems().forEach((item)=>{
          items.push(JSON.stringify(item));
        })
        
        addDoc(collectionRef, {
          account: this.userID,
          items: items,
          amount: this.cart.getAmt(),
          subTotal: this.cart.getSubTotal(),
          tax: parseFloat((this.cart.getSubTotal()*0.2).toFixed(2)),
          total: parseFloat((this.cart.getSubTotal()*1.2).toFixed(2)),
          orderDate: new Date(),
          checkoutInfo: JSON.stringify(this.userCheckoutInfo),
          deliveryInfo: JSON.stringify(this.userDeliveryInfo),
        }).then(async (orderRef)=>{
          userOrders.push(orderRef.id);
          await updateDoc(userDocRef, {
            orders: userOrders
          });
        })
      }catch(error){
        console.error("There was an error creating order: ", error);
        return;
      }
      this.cart.clearCart();
      this.sessionService.removeData('userCartInfo');
      if(this.loggedIn) this.updateFirestoreUserCart();
    });

  eventService.listen("userLogout",(data: any)=>{
    this.loggedIn = false;
    this.loggedService.setLoggedState(false);
    this.sessionService.removeData('userID');
    this.sessionService.removeData('userCartInfo');
    this.cart = new Cart();
    this.router.navigate(['']);
  });

  eventService.listen("userLogin",(data: string)=>{
    this.userLogin(data);
  });

  }
  sessionLogin(event: any){
    this.loggedService.setLoggedState(true);
    this.loggedIn = true;
    this.userID = event;
    this.sessionService.setData('userID',event);
  }
  userLogin(event: any){
    this.sessionLogin(event);
    this.coalesceCarts().then(returnedCart=>{
      this.cart = returnedCart;
      this.updateFirestoreUserCart();
      this.sessionService.setObjectWithMap('userCartInfo', this.cart);
    });
    this.router.navigate(['user/',this.userID])
  }
  // on app load check for any localstorage data to repopulate variables: userID, checkout and delivery info
  ngOnInit(): void {
    alert("This is a demo website, please do not provide any real personal information.")
    const sessionUserID = this.sessionService.getData('userID');
    const sessionCart = this.sessionService.getObjectWithMap('userCartInfo');
    const sessionCheckout = this.sessionService.getData('userCheckoutInfo');
    const sessionDelivery = this.sessionService.getData('userDeliveryInfo');
    if(sessionUserID){
      this.sessionLogin(sessionUserID);
    }
    if(sessionCart){
      this.cart = new Cart(sessionCart.cartItems, sessionCart.amount, sessionCart.subTotal);
    }
    if(sessionCheckout){
  
      this.userCheckoutInfo = sessionCheckout;
    }
    if(sessionDelivery){
      this.userDeliveryInfo = sessionDelivery;
    }
  }
}