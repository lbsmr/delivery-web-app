import { Address } from "./address.interface";
import { CartProduct } from "./cart.product.interface";
import { Payment } from "./payment.interface";

export interface IOrder{
    _id:string,
    buyerId:string,
    restaurantId:string,
    products:[CartProduct],
    payment:Payment,
    address:Address,
    totalAmount:Number
}