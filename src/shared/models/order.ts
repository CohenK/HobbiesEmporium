import { Item } from "./item";

export class Order{
    constructor(public orderNo: number, public orderItems: Item[], public subTotal:number, public orderTax: number, public orderTotal: number, public orderDate: Date){}
}