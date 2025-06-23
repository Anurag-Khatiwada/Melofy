import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import proxy from "express-http-proxy";
import { match } from "path-to-regexp";
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
    }
    else {
        next();
    }
});
app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info(`Received body: ${JSON.stringify(req.body)}`);
    next();
});
const proxyOptions = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl.replace(/^\/v1/, "/api");
    },
    proxyErrorHandler: (err, req, res, next) => {
        logger.error(`Proxy error occurred: ${err.message}`, {
            stack: err.stack,
            service: "api-gateway",
            timestamp: new Date().toString(),
        });
        // res.status(500).json({
        //   message: "Internal server error",
        //   error: err.message,
        // });
    },
};
// Set up proxy for user service
const matchAddToPlaylist = match("/add-to-playlist/:id");
app.use("/v1/user", (req, res, next) => {
    const shouldValidate = req.path === "/my-profile" || matchAddToPlaylist(req.path);
    if (shouldValidate) {
        return validateToken(req, res, next);
    }
    next();
}, proxy(userServiceUrl, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = {
            ...proxyReqOpts.headers,
            "Content-Type": "application/json",
        };
        proxyReqOpts.headers = {
            ...proxyReqOpts.headers,
            "x-user-id": srcReq.user?.userId || "",
        };
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        logger.info(`Response received from User Service: ${proxyRes.statusCode}`);
        return proxyResData;
    },
}));
//setting proxy for admin services:
app.use("/v1/admin", validateToken, proxy(process.env.ADMIN_SERVICE, {
    ...proxyOptions,
    parseReqBody: false, //  Important: disables body parsing so file stream passes through
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = {
            ...proxyReqOpts.headers,
            "x-user-id": srcReq.user?.userId || "",
            "x-auth-token": srcReq.user?.token || "",
        };
        // if (
        //   !proxyReqOpts.headers["Content-Type"] ||
        //   proxyReqOpts.headers["Content-Type"].includes("application/json")
        // ) {
        //   proxyReqOpts.headers["Content-Type"] = "application/json";
        // }
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        logger.info(`Response received from Admin Service: ${proxyRes.statusCode}`);
        return proxyResData;
    },
}));
//setting proxy for song services:
app.use("/v1/songs", proxy(process.env.SONG_SERVICE, {
    ...proxyOptions,
    parseReqBody: false, //  Important: disables body parsing so file stream passes through
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = {
            ...proxyReqOpts.headers,
            // "x-user-id": srcReq.user?.userId || "",
            // "x-auth-token": srcReq.user?.token || "",
        };
        // if (
        //   !proxyReqOpts.headers["Content-Type"] ||
        //   proxyReqOpts.headers["Content-Type"].includes("application/json")
        // ) {
        //   proxyReqOpts.headers["Content-Type"] = "application/json";
        // }
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        logger.info(`Response received from song Service: ${proxyRes.statusCode}`);
        return proxyResData;
    },
}));
app.use(errorHandler);
app.listen(PORT, () => {
    logger.info(`Api gateway Server is running on port ${PORT}`);
});
