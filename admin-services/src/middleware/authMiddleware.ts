import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Extend Express Request type to include req.user

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         userId: string;
//       };
//     }
//   }
// }

interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  playlist: string[];
}

export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.header("x-user-id") as string;
    const token = req.header("x-auth-token") as string;
    if (!userId || userId === "") {
      logger.warn(
        "Access request in admin without authorization! Please login"
      );
      res.status(403).json({
        success: false,
        message: "Access request in admin without authorization! Please login",
      });
      return; // ✅ FIXED: prevent further execution
    }

    let  {data}  = await axios.get(
      `${process.env.USER_SERVICE}/api/user/my-profile`,
      {
        headers: {
          token,
          "x-user-id": userId,
        },
      }
    ) as any;
    

    req.user = data.user;

    next();
  } catch (error) {
    logger.error("Internal server error",error);
  }
};
