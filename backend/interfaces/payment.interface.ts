import { Document } from "mongoose";

enum PaymentTypes{
    "Cash",
    "Debit",
    "Credit"
}

export interface Payment extends Document{
    paymentType:PaymentTypes,
    nameOnCard:String,
    expiration:Date,
    cvv:Number,
    creditNumber:Number
}