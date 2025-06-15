import logger from "../utils/logger.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const isAuth = async (req, res, next) => {
    try {
        const userId = req.header("x-user-id");
        const token = req.header("x-auth-token");
        if (!userId || userId === "") {
            logger.warn("Access request in admin without authorization! Please login");
            res.status(403).json({
                success: false,
                message: "Access request in admin without authorization! Please login",
            });
            return;
        }
        let { data } = await axios.get(`${process.env.USER_SERVICE}/api/user/my-profile`, {
            headers: {
                token,
                "x-user-id": userId,
            },
        });
        req.user = data.user;
        next();
    }
    catch (error) {
        logger.error("Internal server error", error);
    }
};
