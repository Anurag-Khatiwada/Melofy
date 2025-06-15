import logger from "./logger.js";
const TryCatch = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            logger.error(error);
            res.status(500).json({
                message: error.message || "Internal Server Error"
            });
        }
    };
};
export default TryCatch;
