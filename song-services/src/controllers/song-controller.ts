import { sql } from "../config/db.js";
import logger from "../utils/logger.js";
import TryCatch from "../utils/try-catch.js";
import { redisClient } from "../server.js";
import { log } from "console";

export const getAllAlbums = TryCatch(async (req, res) => {
  logger.info("Get all albums url hit...");
  let albums;
  const CACHE_EXPIRY = 1800;

  if (redisClient.isReady) {
    albums = await redisClient.get("albums");
  }
  if (albums) {
    logger.info("cache hit");
    return res.status(200).json(JSON.parse(albums));
  } else {
    logger.info("Cache miss");
    albums = await sql`SELECT * FROM albums`;

    if (albums.length === 0) {
      logger.warn("No album available");
      return res.status(404).json({
        success: false,
        message: "No album available",
      });
    }
    if (redisClient.isReady) {
      await redisClient.set("albums", JSON.stringify(albums), {
        EX: CACHE_EXPIRY,
      });
    }
  }

  res.status(200).json({
    success: true,
    albums,
  });
});

export const getAllSongs = TryCatch(async (req, res) => {
  logger.info("Get all songs url hit...");
  const CACHE_EXPIRY = 1800;
  let songs;

  if (redisClient.isReady) {
    songs = await redisClient.get("songs");
  }
  if (songs) {
    logger.info("Cache hit");
    return res.status(200).json(JSON.parse(songs));
  } else {
    logger.info("Cache miss");

    songs = await sql`SELECT * FROM songs`;

    if (songs.length === 0) {
      logger.warn("No song available");
      return res.status(404).json({
        success: false,
        message: "No song available",
      });
    }

    await redisClient.set("songs", JSON.stringify(songs), {
      EX: CACHE_EXPIRY,
    });
  }

  res.status(200).json({
    success: true,
    songs,
  });
});

export const getSongsFromAlbum = TryCatch(async (req, res) => {
  logger.info("Get songs from album url hit...");
    const CACHE_EXPIRY = 1800;

  let album;
  let songs;
  const { id } = req.params;

  if (redisClient.isReady) {
    const cacheData = await redisClient.get(`album_songs_${id}`);
    if (cacheData) {
      logger.info("Cache hit");
      return res.status(200).json(JSON.parse(cacheData));
    }
  }
  album = await sql`SELECT * FROM albums WHERE id=${id}`;
  if (album.length === 0) {
    logger.warn("No album available");
    return res.status(404).json({
      success: false,
      message: "No album available",
    });
  }
  songs = await sql`SELECT * FROM songs WHERE album_id=${id}`;

  if (songs.length === 0) {
    logger.warn("No song available");
    return res.status(404).json({
      success: false,
      message: "No song available",
    });
  }

  const response = { songs, album: album[0] };

  if(redisClient.isReady){
    await redisClient.set(`album_songs_${id}`,JSON.stringify(response),{
    EX: CACHE_EXPIRY 

  })
  }
  logger.info("Cache miss")

  res.status(200).json({
    success: true,
    response,
  });
});

export const getSingleSong = TryCatch(async (req, res) => {
  logger.info("Get single song url hit...");
  let song;
  const CACHE_EXPIRY = 1800;
  const { id } = req.params;

  if (redisClient.isReady) {
    song = await redisClient.get(`song:${id}`);
  }
  if (song) {
    logger.info("Cache hit");
    return res.status(200).json(JSON.parse(song));
  } else {
    logger.info("Cache miss");

    song = await sql`SELECT * FROM songs WHERE id=${id}`;

    if (!song) {
      logger.warn("No song available");
      return res.status(404).json({
        success: false,
        message: "No song available",
      });
    }
    await redisClient.set(`song:${id}`, JSON.stringify(song), {
      EX: CACHE_EXPIRY,
    });
  }

  res.status(200).json({
    success: true,
    song,
  });
});
