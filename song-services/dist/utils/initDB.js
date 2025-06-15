import { sql } from "../config/db.js";
import logger from "./logger.js";
export const initDB = async () => {
    try {
        await sql `
        `;
    }
    catch (error) {
        logger.error("Can't initialize database", error);
    }
};
