import { Item } from "./item";

interface cartItem{
    item: Item,
    amount: number
  }

export class Cart{
    constructor(private cartItems: Map<Item, number>, private amount: number){}

    public addItem(data: cartItem): void{
        if(this.cartItems.has(data.item)){
            let currentAmt: number = this.cartItems.get(data.item) as number;
            let amt = Math.min(3,this.cartItems.get(data.item) as number + data.amount)
            this.amount = this.amount - currentAmt + amt;
            this.cartItems.set(data.item,Math.min(3,currentAmt+data.amount))
          }else{
            this.cartItems.set(data.item,data.amount);
            this.amount = this.amount + data.amount;
          }
    }
    getItems(){ return this.cartItems }
    public getAmt():number{ return this.amount }
}