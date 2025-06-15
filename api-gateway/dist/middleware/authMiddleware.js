import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
export const validateToken = (req, res, next) => {
    const authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        logger.warn("Invalid token");
        res.status(400).json({
            success: false,
            message: "Invalid token"
        });
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded) {
            logger.warn(`Invalid token`);
            res.status(400).json({
                success: false,
                message: "Invalid token"
            });
            return;
        }
        const payload = decoded;
        console.log(payload);
        req.user = {
            userId: payload.user || payload.userId || payload._id || "",
            token: token
        };
        next();
    });
};
