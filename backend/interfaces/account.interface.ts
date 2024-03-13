import {Document} from "mongoose"

export interface IAccount extends Document{
    email:string,
    name:string,
    password:string,
    role:string,
    cart:object,
    bankName:string,
    bankAccountNumber:Number
}