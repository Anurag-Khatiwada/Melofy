import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import proxy from "express-http-proxy";
import { IncomingMessage } from "http";

import logger from "./utils/logger.js";
import errorHandler from "./middleware/error-handler.js";
import { validateToken } from "./middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || "5000";
const userServiceUrl = process.env.USER_SERVICE;

if (!userServiceUrl) {
  throw new Error("USER_SERVICE is not defined in environment variables");
}

// Middleware
app.use(cors());
app.use(helmet());

// Conditional express.json to avoid breaking multipart/form-data
app.use((req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (!contentType.startsWith("multipart/form-data")) {
    express.json()(req, res, next);
  } else {
    next();
  }
});

app.use((req: Request, res: Response, next: NextFunction): void => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Received body: ${JSON.stringify(req.body)}`);
  next();
});

// Proxy Options
interface CustomError extends Error {
  status?: number;
}

const proxyOptions = {
  proxyReqPathResolver: (req: Request): string => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.error(`Proxy error occurred: ${err.message}`, {
      stack: err.stack,
      service: "api-gateway",
      timestamp: new Date().toString(),
    });
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  },
};

// Set up proxy for user service

app.use(
  "/v1/user",
  (req, res, next) => {
    // ✅ Conditionally apply validation only to /v1/user/my-profile
    if (req.method === "GET" && req.path === "/my-profile") {
      return validateToken(req, res, next);
    }
    // Skip validation for all other routes
    next();
  },
  proxy(userServiceUrl, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts: any, srcReq: Request) => {
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        "Content-Type": "application/json",
      };
      proxyReqOpts.headers = {
        ...proxyReqOpts.headers,
        "x-user-id": srcReq.user?.userId || ""
      }
      return proxyReqOpts;
    },
    userResDecorator: (
      proxyRes: IncomingMessage,
      proxyResData: Buffer,
      userReq: Request,
      userRes: Response
    ) => {
      logger.info(
        `Response received from User Service: ${proxyRes.statusCode}`
      );
      return proxyResData;
    },
  } as any)
);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
