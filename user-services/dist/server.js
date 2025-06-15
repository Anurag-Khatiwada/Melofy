import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/error-handler.js";
import connectToDb from "./config/db-Config.js";
import userRoutes from "./routes/userRoute.js";
const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Received body: ${JSON.stringify(req.body)}`);
    next();
});
app.use("/api/user", userRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
    logger.info(`User service Server is running on port ${PORT}`);
    connectToDb();
});
