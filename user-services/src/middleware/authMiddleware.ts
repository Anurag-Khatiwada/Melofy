import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.js";
import { IUser, User } from "../model/User.js";

// Extend Express Request type to include req.user
export interface AuthencatedRequest extends Request{
    user?: IUser | null
}

export const isAuth = async(req: AuthencatedRequest, res: Response, next: NextFunction)=>{

    try{
        
        const userId = req.header('x-user-id') as string;
        const token = req.header('token') as string

        console.log(userId)

        if(!userId || userId===""){
        logger.warn("Access request without authorization! Please login");
        res.status(403).json({
            success: false,
            message:"Access request without authorization! Please login"
        })
        }


    const user = await User.findById(userId).select("-password")
    if(!user){
        res.status(404).json({
            success: false,
            message: "User not found"
        })

        return
    }
    console.log(user)

    req.user = user

    next()
    }catch(error){
        logger.error("Internal server error")
    }


}