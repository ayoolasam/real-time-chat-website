const Chat = require('../Models/chatModel')
const User = require('../Models/userModel')




const accessChat = async(req,res)=>{
  try{
const {userId} = req.body

if(!userId){
  console.log("userid param not sent with request")
  return res.sendStatus(400)
}

var isChat = await Chat.find({
  isGroupChat:false,
  $and:[
    {users:{$elemMatch:{$eq:req.user._id}}},
    {users:{$elemMatch:{$eq:userId}}}
  ],
}).populate("users","-password").populate("latestMessage")

isChat = await User.populate(isChat,{
  path:'latestMessage.sender',
  select:"name pic email"
})
 if (isChat.length > 0){
  res.send(isChat[0]);
 }else{
  var chatData = {
    chatName:"sender",
    isGroupChat:false,
    users: [req.user._id, userId]
  }



  const createdChat = await Chat.create(chatData)


  const FullChat = await Chat.findOne({_id : createdChat._id}).
  populate("users","-password")
  res.status(200).send(FullChat)
 }


  }catch(err){
    console.log(err)
  }
}









const fetchChats = async(req,res)=>{
try{

Chat.find({users:{ $elemMatch:{ $eq: req.user._id}}})
.populate("users","-password")
.populate("groupAdmin","-password")
.populate('latestMessage')
 .sort({ updatedAt : -1})
 .then( async (results)=>{
  results = await User.populate( results, {
    path: "latestMessage.sender",
    select: "name pic email",
  });


  res.status(200).send(results);
 });
}
catch(err){
  console.log(err)
}



}

const createGroupChat = async(req,res)=>{
try{

if (!req.body.users || !req.body.name ){
  return res.status(400).send({ message: "please fill all the fields"})
}

var users = JSON.parse (req.body.users);

if (users.length < 2){
  return res
  .status(400)
  .send("More than two users are required to form a group chat")
  
}
users.push(req.user)

const groupChat = await Chat.create({
  chatName: req.body.name,
  users: users,
  isGroupChat:true,
  groupAdmin:req.user,



})



  try{

const fullGroupChat = await Chat.findOne({_id:groupChat._id})
.populate("users","-password")
.populate("groupAdmin","-password")


res.status(200).json(fullGroupChat)

  } catch(err){
      console.log(err)
    
  }

}catch(err){
  console.log(err)
}
}


const renameGroup = async (req,res)=>{
  try{
const {chatId,chatName}= req.body;

const updatedChat = await Chat.findByIdAndUpdate(
  chatId,{
    chatName,
  },
  {
    new:true,}
)
.populate("users","-password")
.populate("groupAdmin","-password")


if(!updatedChat){
  res.status(404);
  throw new Error("chat not found")
}else{
  res.json(updatedChat)
}

  }catch(err){console.log(err)}
}
module.exports = {accessChat,fetchChats,createGroupChat,renameGroup}