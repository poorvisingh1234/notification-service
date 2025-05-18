const express = require('express')
const dotenv = require('dotenv')
const notificationRoutes = require('./routes/notificationRoutes')

dotenv.config()
const app = express()
app.use(express.json())
app.use('/notifications', notificationRoutes)

module.exports = app
