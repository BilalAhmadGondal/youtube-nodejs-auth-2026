import express from 'express';

import {RegisterUser, LoginUser, changepassword} from '../controllers/auth-controller.js';
 
import authMiddleware from '../middleware/auth-middleware.js'



const router = express.Router();


router.post('./register',  RegisterUser);


router.post('./login', LoginUser);


router.post('./changepassword', authMiddleware , changepassword);



export default router;

                                                                                                                              