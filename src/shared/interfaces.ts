import { Item } from "./models/item"

export interface cartItem{
    item: Item,
    amount: number
}

export interface value{
    grade: string,
    name: string,
    price: number,
    amount: number
}

export interface userInfo{
    email: string,
    orders: string[]
}

export interface orderItem{
    item: string,
    amount: number,
    cost: number
}

export interface orderInfo{
    id: string,
    date: Date,
    total: number
}

export interface firestoreOrder{
    account: string,
    amount: number,
    checkoutInfo: any,
    deliveryInfo: any,
    items: any[],
    orderDate: Date,
    subTotal: number,
    tax: number,
    total: number
}