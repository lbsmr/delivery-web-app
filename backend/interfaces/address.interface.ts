import { Document } from "mongoose";

export interface Address extends Document{
    city:string,
    street:string,
    resNum:Number,
    apartment:Boolean,
    zip:Number
}