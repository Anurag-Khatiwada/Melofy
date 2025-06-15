import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Request, Response, NextFunction } from "express";

import cors from "cors";
import helmet from "helmet";
import redis from "redis"

import logger from "./utils/logger.js";
import errorHandler from "./middleware/error-handler.js";
import TryCatch from "./utils/try-catch.js";
import songRoutes from "./routes/song-routes.js"

const app = express();
const PORT = process.env.PORT || 5002;

//making redis connection
export const redisClient =redis.createClient({
  password:process.env.REDIS_PASS,
  socket:{
    host:"redis-11513.crce206.ap-south-1-1.ec2.redns.redis-cloud.com",
    port:11513
  }
})

redisClient.connect().then(()=>logger.info("connected to reids")).catch((err)=>logger.error(err))

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction): void => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Received body: ${JSON.stringify(req.body)}`);

  next();
});

//routes:
app.get(
  "/api/songs",
  TryCatch(async (req, res) => {
    res.send("Hi how are you");
  })
);

app.use("/api/songs", songRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  logger.info(`Song service Server is running on port ${PORT}`);
});
