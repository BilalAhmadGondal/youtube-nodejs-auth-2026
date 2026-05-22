import express from 'express'

import authMiddleware  from '../middleware/auth-middleware.js';

import adminMiddleware  from '../middleware/admin-middleware.js';
import uploadmiddleware from '../middleware/upload-middleware.js';
import {imagecontroller} from '../controllers/image-controller.js';
import {deleteImageController} from '../controllers/image-controller.js';
import {fetchImagesController} from '../controllers/image-controller.js';


const router = express.Router()

// to upload images
router.post('/upload', authMiddleware, adminMiddleware,  uploadmiddleware.single('image'), imagecontroller)

// to get all the images 


router.delete('/:id', adminMiddleware, authMiddleware, deleteImageController)
// router.get('/get', authMiddleware, fetchImagesController)




export default router