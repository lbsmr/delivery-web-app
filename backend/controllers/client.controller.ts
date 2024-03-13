import Account from "../models/account";
import Product from "../models/product";
import config from "../config";
import {RequestHandler,Request,Response} from "express";
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from "../interfaces/jwt.interface";

export const addToCart:RequestHandler = async (req:Request,res:Response) => {
    try {
        const productId = req.body.productId;
        let targetProduct;
        const id = req.headers["loggedInUserId"];

        if(!productId){
            return res.status(404).json({msg:"Not found."});
        }
        const product = await Product.findById(productId);
        targetProduct = product;
        const account:any = await Account.findById(id);
        account.addToCart(targetProduct);
        return res.status(200).json({msg:"Product added to cart."});
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const getCart:RequestHandler = async (req:Request,res:Response) => {
    try {
        const id = req.headers["loggedInUserId"];
        const account:any = await Account.findById(id);
        const cartProducts = account.cart.products;
        let cartInfo = [];
        let totalPrice = 0;
        for(let i = 0;i<cartProducts.length;i++){
            const product:any = await Product.findById(cartProducts[i].productId);
            cartInfo.push({"productInfo":product,"quantity":cartProducts[i].quantity})
            totalPrice = totalPrice + cartProducts[i].quantity * product.price;
        }
        return res.status(200).json({"cartInfo":cartInfo,"totalPrice":totalPrice});
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const reduceCart:RequestHandler = async (req:Request,res:Response) => {
    try {
        const productId = req.params.id;
        const id = req.headers["loggedInUserId"];
        if(!productId){
            res.status(404).json({msg:"Not found."});
        }
        const account:any = await Account.findById(id);
        account.reduceQuantity(productId);
        return res.status(200).json({msg:"Quantity reduced."});
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const removeFromCart:RequestHandler = async (req:Request,res:Response) => {
    try {
        const productId = req.params.id;
        const id = req.headers["loggedInUserId"];
        if(!productId){
            res.status(404).json({msg:"Not found."});
        }
        const account:any = await Account.findById(id);
        account.removeFromCart(productId);
        return res.status(200).json({msg:"Removed from cart."});
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const clearCart:RequestHandler = async (req:Request,res:Response) => {
    try {
        const id = req.headers["loggedInUserId"];
        const account:any = await Account.findById(id);
        account.clearCart();
        return res.status(200).json({msg:"Cart cleared."});
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}