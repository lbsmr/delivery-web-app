import {RequestHandler,Request,Response} from 'express';
import Product from '../models/product';
import config from '../config';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/jwt.interface';

export const createProduct:RequestHandler = async (req:Request,res:Response) => {
    try {
        const {name,description,price,image} = req.body;
        const creatorId = req.headers["loggedInUserId"];

        if(!name || !description || !price || !image){
            return res.status(400).json({msg:"All fields must be entered."});
        }

        if(description.length > 50){
            return res.status(400).json({msg:"Description max length is 30 characters."});
        }

        const product = new Product({
            name:name,
            description:description,
            price:price,
            image:image,
            creatorId:creatorId
        });
        await product.save();
        return res.status(200).json({msg:"Product created."})
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const deleteProduct:RequestHandler = async (req:Request,res:Response) => {
    try {
        const productId = req.params.id;
        if(!productId){
            return res.status(400).json({msg:"No product id received."});
        }
        const productFound = await Product.findByIdAndDelete(productId);
        if(!productFound){
            return res.status(404).json({msg:"Product wasn't found."});
        }
        return res.status(200).json({msg:"Item deleted."});
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const updateProduct:RequestHandler = async (req:Request,res:Response) => {
    try {
        const productId = req.params.id;
        const productUpdated = await Product.findByIdAndUpdate(productId,req.body,{new:true});
        if(!productUpdated){
            return res.status(404).json({msg:"Product wasn't found."});
        }
        return res.status(200).json({msg:"Item updated."});
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const getProducts:RequestHandler = async (req:Request,res:Response) => {
    try {
        const products = await Product.find();
        if(!products){
            return res.status(400).json({msg:"There are no products available."});
        }
        return res.status(200).json(products);
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const getProduct:RequestHandler = async (req:Request,res:Response) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(!product){
            return res.status(404).json({msg:"Product wasn't found."});
        }
        return res.status(200).json(product);
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}