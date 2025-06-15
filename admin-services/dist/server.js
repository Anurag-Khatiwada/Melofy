import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import redis from "redis";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/error-handler.js";
import { initDB } from "./utils/initDB.js";
import adminRoutes from "./routes/admin-routes.js";
import configureCloudinary from "./utils/cloudinary.js";
const app = express();
const PORT = process.env.PORT || 5002;
export const redisClient = redis.createClient({
    password: process.env.REDIS_PASS,
    socket: {
        host: "redis-11513.crce206.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 11513
    }
});
redisClient.connect().then(() => logger.info("connected to redis")).catch((error) => logger.error(error));
configureCloudinary();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Received body: ${JSON.stringify(req.body)}`);
    next();
});
app.use('/api/admin', adminRoutes);
app.use(errorHandler);
initDB().then(() => {
    app.listen(PORT, () => {
        logger.info(`Admin service Server is running on port ${PORT}`);
    });
});
