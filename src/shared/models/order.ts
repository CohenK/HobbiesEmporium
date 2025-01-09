import { Cart } from "./cart";

interface orderItem{
    item: string
    amount: number
    cost: number
}

export class Order{
    items: orderItem[] = [];
    itemAmt: number;
    subTotal: number;
    tax: number;
    total: number;
    orderNo: number;
    orderDate: Date;

    constructor(
        orderNo: number = 10000,
        cart: Cart,
        orderDate: Date = new Date()
    ){
        this.itemAmt = cart.getAmt();
        this.subTotal = cart.getSubTotal();
        this.tax = this.subTotal * 0.125;
        this.total = this.subTotal + this.tax;
        this.orderNo =  orderNo;
        this.orderDate = orderDate;
        let cartItems = cart.getItems();
        cartItems.forEach((cartItem)=>{
            this.items.push({item: `(${cartItem.grade})-${cartItem.name}`, amount: cartItem.amount, cost: cartItem.price*cartItem.amount})
        })

    }
}