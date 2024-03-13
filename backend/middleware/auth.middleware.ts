import jwt from 'jsonwebtoken';
import config from '../config';
import {Request,Response,NextFunction} from 'express';
import { JwtPayload } from '../interfaces/jwt.interface';

export const auth = (roleToVerify:string) => {
    return async (req:Request,res:Response,next:NextFunction) =>{
        const token:any = req.headers['access-token'];
        if(!token){
            return res.status(401).json({msg:"Access denied."});
        }
        try {
            const verified = jwt.verify(token,config.JWT_SECRET) as JwtPayload;
            if(!verified){
                return res.status(500).json({msg:"Internal server error."});
            }
            if(verified.role !== roleToVerify){
                return res.status(403).json({msg:"Access denied."});
            }
            req.headers["loggedInUserId"] = verified.accountId;
            next();
        } catch (err) {
            res.status(400).json({msg:"Invalid token."});
        }
    }
}

export const getAccountId = async (req:Request,res:Response,next:NextFunction) => {
    const token:any = req.headers['access-token'];
    if(!token){
        return res.status(401).json({msg:"Access denied."});
    }
    try {
        const verified = jwt.verify(token,config.JWT_SECRET) as JwtPayload;
        if(!verified){
            return res.status(500).json({msg:"Internal server error."});
        }
        req.headers["loggedInUserId"] = verified.accountId;
        next();
    } catch (err) {
        res.status(400).json({msg:"Invalid token."});
    }
}