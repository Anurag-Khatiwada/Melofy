import mongoose from "mongoose";
import logger from "../utils/logger.js";
const connectToDb = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            dbName: "Melofy"
        }).then(() => { logger.info("Successfully connected to database"); }).catch((err) => { logger.error(`Error connecting to database ${err.message}`); });
    }
    catch (err) {
        logger.error(`Internal server Error`);
    }
};
export default connectToDb;
