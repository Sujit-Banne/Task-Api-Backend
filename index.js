const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const taskRoute = require('./routes/tasks')

require('dotenv').config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/v1/tasks', taskRoute)

//connection to db
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('connected to database');
        app.listen(PORT, () => {
            console.log(`server is running on port: ${PORT}`);
        })
    }).catch((err) => {
        console.log(err);
    })