import logger from "../utils/logger.js";
import { User } from "../model/User.js";
export const isAuth = async (req, res, next) => {
    try {
        const userId = req.header('x-user-id');
        console.log(userId);
        if (!userId || userId === "") {
            logger.warn("Access request without authorization! Please login");
            res.status(403).json({
                success: false,
                message: "Access request without authorization! Please login"
            });
        }
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        logger.error("Internal server error");
    }
};
