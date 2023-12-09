import User from './../models/user'
import jwt, { Secret } from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';




export const requireAuth = async (req: Request,res: Response,next:NextFunction) => {
    const {authorization} = req.headers;
    if(authorization) {
        const token = authorization.split(" ")[1];
        if(token && token !== "null") {
            const secret = process.env.SECRET as Secret
            const idObj = jwt.verify(token,secret);
            if(typeof idObj !== "string") {
                const {_id} = idObj;
                const user = await User.findOne({_id});
                if(user) {
                    req.headers["user"] = JSON.stringify(user);
                    next();
                } else {
                    res.status(400).json({msg: "User not found"});
                }
            } else {
                res.status(400).json({msg: "Invalid authorization token"});
            }
        } else {
            res.status(400).json({msg: "Invalid authorization token"});
        }
        
    } else {
        res.status(400).json({msg: "Invalid authorization token"});
    }
} 