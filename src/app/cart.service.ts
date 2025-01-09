import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Cart } from "../shared/models/cart";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CartService{
    private currentCart = new BehaviorSubject<any>(null);

    setCurrentCart(data: Cart){
      this.currentCart.next(data);
    }
    getCartData(): Observable<Cart> {
      return this.currentCart.asObservable();
    }
}