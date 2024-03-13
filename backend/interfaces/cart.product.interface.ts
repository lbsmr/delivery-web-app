import { Document } from "mongoose";

export interface CartProduct extends Document{
    productId:string,
    quantity:number,
}