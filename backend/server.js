const express = require('express')

const chats= require('../backend/data/data') 
const dotenv = require('dotenv')


dotenv.config()
const app = express()






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
  console.log(`Server running on port ${PORT}`)
})