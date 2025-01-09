import { Item } from "./item";

interface cartItem{
  item: Item,
  amount: number
}

interface value{
  grade: string,
  name: string,
  price: number,
  amount: number
}

export class Cart{
    constructor(private cartItems: Map<string, value> = new  Map<string, value>, private amount: number = 0, private subTotal: number = 0){}

    addItem(data: cartItem): void{
      let key = JSON.stringify(data.item);
      let model = data.item;

      if(this.cartItems.has(key)){
        let currentAmt: number = this.cartItems.get(key)?.amount as number;
        if(currentAmt === 3){
          
        }else{
          let amt = Math.min(3,currentAmt+data.amount)
          this.cartItems.set(key,{grade: model.grade, name: model.name, price: model.price, amount: amt});
          this.amount -= currentAmt;
          this.amount += amt;
          this.subTotal += model.price * amt;
        }
      }else{
        this.cartItems.set(key,{grade: model.grade, name: model.name, price: model.price, amount: data.amount});
        this.amount = this.amount + data.amount;
        this.subTotal += model.price * data.amount;
      }
      console.log(this.cartItems);
    }

    removeItem(data: string): boolean{
      if(this.cartItems.has(data)){
        let price = this.cartItems.get(data)?.price!;
        let amount = this.cartItems.get(data)?.amount as number;
        this.amount -= amount;
        this.subTotal -= price * amount;
        this.cartItems.delete(data)
        return true;
      }else{
        return false;
      }
    }

    itemIncrement(data:string): void{
      let currentValue = this.cartItems.get(data);
      if(currentValue?.amount! <= 2){
        this.cartItems.set(data,{grade: currentValue?.grade!, name: currentValue?.name!, price: currentValue?.price!, amount: currentValue?.amount!+1});
        this.amount = this.amount + 1;
        this.subTotal += currentValue?.price!;
      }
    }

    itemDecrement(data:string): void{
      let currentValue = this.cartItems.get(data);
      if(currentValue?.amount! > 1){
        this.cartItems.set(data,{grade: currentValue?.grade!, name: currentValue?.name!, price: currentValue?.price!, amount: currentValue?.amount!-1});
        this.amount = this.amount - 1;
        this.subTotal -= currentValue?.price!;
      }else if(currentValue?.amount! === 1){
        this.removeItem(data);
        this.subTotal -= currentValue?.price!;
      }
    }

    getItems(){ return this.cartItems }
    getAmt():number{ return this.amount }
    getSubTotal():number{ return this.subTotal }
}