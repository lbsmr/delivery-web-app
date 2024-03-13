import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {RequestHandler,Request,Response} from 'express';
import Account from '../models/account';
import config from '../config';

export const signUp:RequestHandler = async (req:Request,res:Response) => {
    try {
        const {email,name,password,passwordCheck,role,bankName,bankAccountNumber} = req.body;
        let accountRole = "";
        if(!email || !password || !passwordCheck || !name){
            return res.status(400).json({msg:"All fields must be entered."});
        }
        const accountExists = await Account.findOne({email:email});
        if(accountExists){
            return res.status(400).json({msg:"Email is already in use."});
        }
        if(password.length < 8){
            return res.status(400).json({msg:"Password needs to be at least 8 characters long."});
        }
        if(password !== passwordCheck){
            return res.status(400).json({msg:"Passwords don`t match."});
        }
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);
        if(!role){
            accountRole = "CLIENT"
            const account = new Account({
                email:email,
                name:name,
                password:passwordHash,
                role:accountRole
            });
            await account.save();
            const token = jwt.sign({accountId:account._id,role:account.role},config.JWT_SECRET);
            return res.status(200).json({
                "token": token
            });
        }else{
            accountRole = role
            if(!bankName || !bankAccountNumber){
                return res.status(400).json({msg:"All fields must be entered."});
            }
            const account = new Account({
                email:email,
                name:name,
                password:passwordHash,
                role:accountRole,
                bankName:bankName,
                bankAccountNumber:bankAccountNumber
            });
            await account.save();
            const token = jwt.sign({accountId:account._id,role:account.role},config.JWT_SECRET); 
            return res.status(200).json({
                "token": token
            });
        }
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const login:RequestHandler = async(req:Request,res:Response) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg:"All fields must be entered."});
        }
        const account:any = await Account.findOne({email:email});
        if(!account){
            return res.status(400).json({msg:"Account does not exist."})
        }
        const isMatch = bcrypt.compareSync(password, account.password);
        if(!isMatch){
            return res.status(400).json({msg:"Wrong credentials."});
        }else{
            const token = jwt.sign({accountId:account._id,role:account.role},config.JWT_SECRET);
            return res.status(200).json({
                "token": token
            });
        }
    } catch (err:any) {
        return res.status(500).json({msg:err.message});
    }
}

export const loggedIn:RequestHandler = async (req:Request,res:Response) => {
    try{
        const token = req.header('access-token');
        if(!token){
            return res.json(false);
        }
        jwt.verify(token,config.JWT_SECRET);
        res.send(true);
    }catch(err:any){
        res.json({err:err.message});
    }
}