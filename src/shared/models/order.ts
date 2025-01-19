import { Billing } from "./billing";
import { Cart } from "./cart";
import { Delivery } from "./delivery";
import { orderItem } from "../interfaces";

export class Order{
    items: orderItem[] = [];
    itemAmt: number;
    subTotal: number;
    tax: number;
    total: number;
    orderID: string;
    orderDate: Date;
    billingInfo: Billing;
    deliveryInfo: Delivery;

    constructor(
        orderID: string = "",
        cart: Cart,
        orderDate: Date = new Date(),
        billing: Billing,
        delivery: Delivery
    ){
        this.itemAmt = cart.getAmt();
        this.subTotal = cart.getSubTotal();
        this.tax = this.subTotal * 0.125;
        this.total = this.subTotal + this.tax;
        this.orderID =  orderID;
        this.orderDate = orderDate;
        let cartItems = cart.getItems();
        this.billingInfo = billing;
        this.deliveryInfo = delivery;
        cartItems.forEach((cartItem)=>{
            this.items.push({item: `(${cartItem.grade})-${cartItem.name}`, amount: cartItem.amount, cost: cartItem.price*cartItem.amount})
        })

    }
}