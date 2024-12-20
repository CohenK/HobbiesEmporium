import { Observable, Subject } from "rxjs";
import { Item } from "../models/item";

export class DataService{
    private selectedProduct = new Subject<Item>();
    product = this.selectedProduct.asObservable();


    setSelectedProduct(item: Item){
        this.selectedProduct.next(item);
    }
}