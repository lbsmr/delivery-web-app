import { Document } from "mongoose";
import { CartProduct } from "./cart.product.interface";
import { Payment } from "./payment.interface";
import { Address } from "./address.interface";

export interface IOrder extends Document{
    buyerId:string,
    restaurantId:string,
    products:[CartProduct],
    payment:Payment,
    address:Address,
    totalAmount:Number
}