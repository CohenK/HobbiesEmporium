import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Item } from "../shared/models/item";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataService{
    private selectedProduct = new BehaviorSubject<any>(null);

    setSelectedProduct(data: Item){
      this.selectedProduct.next(data);
    }
    getData(): Observable<Item> {
      return this.selectedProduct.asObservable();
    }
}