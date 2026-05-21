// require('dotenv').config();

// const express = require('express');

// const connecttoDB = require('./database/db.js');
// const authRoutes = require('./routes/auth-routes.js')

// connecttoDB();



// const app = express();

// // Middleware
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 3000;




// app.listen(PORT , ()=>{


//     console.log(`Server is now running ${PORT}`);
    
// })

import express from 'express';
import dotenv from 'dotenv';
import connecttoDB from './database/db.js';
import authRoutes from './routes/auth-routes.js';
import homeRoutes from './routes/home-routes.js'
import adminroutes from './routes/admin-routes.js'
import imageroutes from './routes/image-routes.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
connecttoDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('api/home', homeRoutes);
app.use('api/admin', adminroutes )
app.use('api/image', imageroutes)


// Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
