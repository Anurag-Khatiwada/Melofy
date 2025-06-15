import express from 'express'
import uploadFile from '../middleware/multer.js';
import { addSong, addThumbnailToSong, addToAlbum, deleteAlbum, deleteSong } from '../controller/admin-controller.js';
import { isAuth } from '../middleware/authMiddleware.js';
import { json } from 'express';


const router = express.Router();

router.post("/add-album", 
    
    isAuth,
    
    uploadFile,
    
    addToAlbum
);

router.post("/add-song", isAuth, uploadFile, addSong)
router.post("/add-thumbnail/:id", isAuth, uploadFile, addThumbnailToSong)
router.delete("/delete-album/:id", isAuth, deleteAlbum)
router.delete("/delete-song/:id",isAuth,deleteSong)



export default router