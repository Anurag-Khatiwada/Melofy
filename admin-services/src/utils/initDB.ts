import { sql } from "../config/db.js"
import logger from "./logger.js"

export const initDB = async()=>{
    try{
        await sql`
            CREATE TABLE IF NOT EXISTS albums(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                thumbnail VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `

         await sql`
            CREATE TABLE IF NOT EXISTS songs(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                thumbnail VARCHAR(255),
                audio VARCHAR(255) NOT NULL,
                album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `

        logger.info("Database initialized successfully")
    }catch(err){
        logger.error("Error in initialing Database",err)
    }
}