import { Order } from "./order";

export class Customer{
    constructor(public ID: string = "guest", public orders: Order[] = []){}
}