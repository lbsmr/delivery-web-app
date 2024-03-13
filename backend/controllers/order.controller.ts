import Order from "../models/order";
import Account from "../models/account";
import Product from "../models/product";
import config from "../config";
import {RequestHandler,Request,Response} from "express";
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from "../interfaces/jwt.interface";
import { IOrder } from "../interfaces/order.interface";
import { IAccount } from "../interfaces/account.interface";
import { CartProduct } from "../interfaces/cart.product.interface";

export const createOrder:RequestHandler = async (req:Request,res:Response) => {
    try {
        const {city,street,resNum,apartment,zip,paymentType,nameOnCard,expiration,cvv,creditNumber} = req.body;
        console.log(req.body)
        const id = req.headers["loggedInUserId"];
        const buyer:IAccount | any = await Account.findById(id);
        const cartProducts = buyer.cart.products;
        let totalPrice = 0;
        let restaurantId;
        for(let i = 0;i<cartProducts.length;i++){
            const product:CartProduct | any = await Product.findById(cartProducts[i].productId);
            totalPrice = totalPrice + cartProducts[i].quantity * product.price;
            restaurantId = product.creatorId;
        }

        if(!city || !street || !resNum || !zip || !paymentType){
            return res.status(400).json({msg:"All fields must be entered."});
        }

        switch (paymentType) {
            case "Cash":
                const newOrder:IOrder = new Order({
                    buyerId:buyer._id,
                    restaurantId:restaurantId,
                    address:{
                        city:city,
                        street:street,
                        resNum:resNum,
                        apartment:apartment,
                        zip:zip
                    },
                    payment:{
                        paymentType:paymentType
                    },
                    products:cartProducts,
                    totalAmount:totalPrice
                });
                await newOrder.save();
                buyer.clearCart();
                break;
            case "Debit":
                if(!nameOnCard || !expiration || !cvv){
                    return res.status(400).json({msg:"All fields must be entered."});
                }
                const newOrder1:IOrder = new Order({
                    buyerId:buyer._id,
                    restaurantId:restaurantId,
                    address:{
                        city:city,
                        street:street,
                        resNum:resNum,
                        apartment:apartment,
                        zip:zip
                    },
                    payment:{
                        paymentType:paymentType,
                        nameOnCard:nameOnCard,
                        expiration:expiration,
                        cvv:cvv
                    },
                    products:cartProducts,
                    totalAmount:totalPrice
                });
                await newOrder1.save();
                buyer.clearCart();
                break;
            case "Credit":
                if(!nameOnCard || !expiration || !cvv || !creditNumber){
                    return res.status(400).json({msg:"All fields must be entered."});
                }
                const newOrder2:IOrder = new Order({
                    buyerId:buyer._id,
                    restaurantId:restaurantId,
                    address:{
                        city:city,
                        street:street,
                        resNum:resNum,
                        apartment:apartment,
                        zip:zip
                    },                    
                    payment:{
                        paymentType:paymentType,
                        nameOnCard:nameOnCard,
                        expiration:expiration,
                        cvv:cvv,
                        creditNumber:creditNumber
                    },
                    products:cartProducts,
                    totalAmount:totalPrice
                });
                await newOrder2.save();
                buyer.clearCart();
                break;
        }
        return res.status(200).json({msg:"Order created."});
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const getOrders:RequestHandler = async (req:Request,res:Response) => {
    try {
        const id = req.headers["loggedInUserId"];
        const account:IAccount | any = await Account.findById(id);
        let orders = await Order.find({email:account.email}).sort({
            createdAt:-1,
        });
        return res.status(200).json(orders);
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const getOrder:RequestHandler = async (req:Request,res:Response) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        return res.status(200).json(order);
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}