const express = require('express')

const chats= require('../backend/data/data') 
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const colors = require('colors')

dotenv.config()
const app = express()


mongoose.connect('mongodb+srv://obayomisamuel941:Ayosam2403@cluster0.iuubs1l.mongodb.net/ayoola sam chat app').then(()=>{
  console.log('database connected succesfully'.cyan)
})



app.get('/',(req,res)=>{
  res.send('api is running successfully')
});
app.get('/api/chat',(req,res)=>{
  res.send(chats)
});
app.get('/api/chat/:id',(req,res) => {
  // console.log(req.params.id)
  const singleChat = chats.find(c=>c._id === req.params.id);
  res.send(singleChat)
});
const PORT = process.env.PORT  || 5000

app.listen(5000,()=>{
  console.log(`Server running on port ${PORT}`.cyan)
})