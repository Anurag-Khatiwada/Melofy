import logger from "../utils/logger.js";
import jwt, {JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface CustomJwtPayload extends JwtPayload {
  user?: string;
  userId?: string;
  _id?: string;
}

// Extend Express Request type to include req.user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}


export const validateToken = (req: Request,res: Response, next: NextFunction): void=>{
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1] as string;

    if(!token){
        logger.warn("Invalid token");
         res.status(400).json({
            success: false,
            message: "Invalid token"
        })
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err,decoded)=>{
        if(err || !decoded){
            logger.warn(`Invalid token`);
            res.status(400).json({
                success: false,
                message: "Invalid token"
            })
            return
        }

        const payload = decoded as CustomJwtPayload
        console.log(payload)
        req.user  = {
             userId: payload.user || payload.userId || payload._id || "",
        }

        next()
    })
}

