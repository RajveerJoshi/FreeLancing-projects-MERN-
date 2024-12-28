const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const client=require('./routes/clientRoutes')
const freelancer=require('./routes/freelancerRoute')
const app = express();

require('dotenv').config(); // Load environment variables
// const helmet = require('helmet');
const cors = require('cors');

// app.use(helmet());
app.use(cors());
// app.use(express.urlencoded({ extended: true }))
// Middleware
app.use(express.json());
// Routes
app.use('/api', authRoutes); 
app.use('/api/client', client); 
app.use('/api/freelancer', freelancer); 

module.exports = app;
