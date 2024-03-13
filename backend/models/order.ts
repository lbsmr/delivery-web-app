import {Schema,Model,model} from 'mongoose';
import { IOrder } from '../interfaces/order.interface';

const address = {
    city:String,
    street:String,
    resNum:Number,
    department:Boolean,
    zip:Number
}

const payment = {
    paymentType:String,
    nameOnCard:String,
    expiration:Date,
    cvv:Number,
    creditNumber:Number
}

const orderSchema:Schema = new Schema({
    buyerId:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true,
    },
    restaurantId:{
        type:Schema.Types.ObjectId,
        ref:"Account",
        required:true,
    },
    products:Array,
    payment:payment,
    address:address,
    totalAmount:{
        type:Number,
        required:true,
        trim:true
    }
});

const Order:Model<IOrder> = model<IOrder>('Order',orderSchema);

export default Order;