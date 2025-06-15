import { Request } from "express";
import TryCatch from "../utils/try-catch.js";
import logger from "../utils/logger.js";
import getBuffer from "../utils/dataUri.js";
import { sql } from "../config/db.js";
import cloudinary from "cloudinary";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import { redisClient } from "../server.js";

// interface AuthenticatedRequest extends Request {
//   user?: {
//     _id: string;
//     role: string;
//   };
//   file?: Express.Multer.File;
// }

export const addToAlbum = TryCatch(async (req: AuthenticatedRequest, res) => {
  logger.info("Add to album url hit...");

  if (req.user?.role !== "admin") {
    logger.warn("Only admin can add to album! You are not admin");
    res.status(403).json({
      success: false,
      message: "Can't add to album as you are not admin",
    });
    return
  }


  const { title, description } = req.body;

  const file = req.file;
  if (!file) {
    logger.warn("No file available for upload");
    res.status(400).json({
      success: false,
      message: "No file available for upload",
    });
    return;
  }

  const fileBuffer = getBuffer(file);

  if (!fileBuffer || !fileBuffer?.content) {
    logger.warn("Error generating file buffer");
    return res.status(500).json({
      success: false,
      message: "Error generating file buffer",
    });
  }

  const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
    folder: "albums",
  });
  const result = await sql`
        INSERT INTO albums (title, description, thumbnail) VALUES (${title},${description},${cloud.secure_url}) RETURNING *
    `;
  logger.info("Album created successfully");

  if(redisClient.isReady){
    await redisClient.del(`albums`);
    logger.info("Cache invalidated for albums")
  }

  res.status(200).json({
    success: true,
    messsage: "Album created successfully",
    album: result[0],
  });
});


export const addSong = TryCatch(async(req: AuthenticatedRequest, res )=>{
  logger.info('Add song url hit...')

  if (req.user?.role !== "admin") {
    logger.warn("Only admin can add to album! You are not admin");
    res.status(403).json({
      success: false,
      message: "Can't add to album as you are not admin",
    });
    return
  }

    const { title, description, album_id } = req.body;

    const isAlbum = await sql`SELECT FROM albums WHERE id = ${album_id}`;

    if(isAlbum.length===0){
      logger.warn("Album doesnot exists");
      res.status(404).json({
        success: false,
        message:"Album doesnot exists"
      })
      return
    }

    const file = req.file;

    const fileBuffer = getBuffer(file)

    if (!fileBuffer || !fileBuffer?.content) {
    logger.warn("Error generating file buffer");
    return res.status(500).json({
      success: false,
      message: "Error generating file buffer",
    });
  }

  const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
    folder: "songs",
    resource_type: "video"
  })

  const result = await sql`
  INSERT INTO songs (title, description, audio, album_id) VALUES (${title},${description},${cloud.secure_url},${album_id}) RETURNING *
  `

  logger.info("Song added successfully")

  
  if(redisClient.isReady){
    await redisClient.del(`songs`);
    logger.info("Cache invalidated for songs")
  }

  res.status(200).json({
    success: true,
    message: "Song added successfully",
    result
  })

})

export const addThumbnailToSong = TryCatch(async(req: AuthenticatedRequest, res )=>{
  logger.info("Add thumbnail to song URL hit...");

  if (req.user?.role !== "admin") {
    logger.warn("Only admin can add to album! You are not admin");
    res.status(403).json({
      success: false,
      message: "Can't add to album as you are not admin",
    });
    return
  }

   const file = req.file;

   const isSong = await sql`SELECT * FROM songs WHERE id = ${req.params.id}`

   if(!isSong){
      logger.warn("Song doesnot exists");
      res.status(404).json({
        success: false,
        message:"Song doesnot exists"
      })
      return
    }



  const fileBuffer = getBuffer(file)

    if (!fileBuffer || !fileBuffer?.content) {
    logger.warn("Error generating file buffer");
    return res.status(500).json({
      success: false,
      message: "Error generating file buffer",
    });
  }

  const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
    folder: "songs",
    resource_type: "auto"
  })

  const result = await sql`
  UPDATE  songs SET thumbnail = ${cloud.secure_url} WHERE id = ${req.params.id} RETURNING *
  `

  logger.info("Thumbnail added successfully")
  res.status(200).json({
    success: true,
    message: "Thumbnail added successfully",
    result
  })
})

export const deleteAlbum = TryCatch(async(req: AuthenticatedRequest, res)=>{
  logger.info("Delete album URL hit...");

  if (req.user?.role !== "admin") {
    logger.warn("Only admin can add to album! You are not admin");
    res.status(403).json({
      success: false,
      message: "Can't add to album as you are not admin",
    });
    return
  }

  const {id} = req.params;

  const isAlbum = await sql`SELECT FROM albums WHERE id = ${id}`;

    if(isAlbum.length===0){
      logger.warn("Album doesnot exists");
      res.status(404).json({
        success: false,
        message:"Album doesnot exists"
      })
      return
    }

  await sql`DELETE FROM songs WHERE album_id = ${id}`

  await sql`DELETE FROM albums WHERE id=${id}`

  logger.info("Album deleted successfully");
  
  if(redisClient.isReady){
    await redisClient.del(`album_songs_${id}`);
    logger.info("Cache invalidated for song in album")
  }
  res.status(200).json({
    success: true,
    message: "Album deleted successfully"
  })

})


export const deleteSong = TryCatch(async(req: AuthenticatedRequest, res)=>{
  logger.info("Delete Song URL hit...");

  if (req.user?.role !== "admin") {
    logger.warn("Only admin can add to album! You are not admin");
    res.status(403).json({
      success: false,
      message: "Can't add to album as you are not admin",
    });
    return
  }

  const {id} = req.params;

  const isSong = await sql`SELECT FROM songs WHERE id = ${id}`;

    if(!isSong){
      logger.warn("Song doesnot exists");
      res.status(404).json({
        success: false,
        message:"Song doesnot exists"
      })
      return
    }

    
  if(redisClient.isReady){
    await redisClient.del(`song:${id}`);
    logger.info(`Cache invalidated for song:${id}`)
  }

  await sql`DELETE FROM songs WHERE id = ${id}`

  logger.info("Song deleted successfully");
  res.status(200).json({
    success: true,
    message: "Song deleted successfully"
  })

})