require('dotenv').config()
const express = require('express')
const app = express()
const chats= require('../backend/data/data') 
const mongoose = require('mongoose')

const userRoutes = require('../backend/routes/userRoutes')
const {notFound,errorHandler}= require("../backend/middleware/errorMiddleware")
const cors = require('cors')
const chatRoutes = require('../backend/routes/chatRoutes')


app.use(express.json());
app.use(cors())



mongoose.connect('mongodb+srv://obayomisamuel941:Ayosam2403@cluster0.iuubs1l.mongodb.net/ayoolasam').then(()=>{
  console.log('database connected succesfully')
})

const serverTime = new Date();
  console.log(serverTime);

app.get('/',(req,res)=>{
  res.send('api is running successfully')
});

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT  || 5000

app.listen(5000,()=>{
  console.log(`Server running on port ${PORT}`)
})