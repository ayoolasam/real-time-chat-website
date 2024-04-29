
const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const bcrypt = require('bcrypt')
const generateToken = require("../config/generateToken");

/**
 * REGISTER USER
 */
const registerUser = async (req, res,next)=>{
  try{
  const {name,email,password,pic} = req.body

  if(!name ||!email || !password){
    res.json({
      status:false,
      message:"please enter all fields"
    })
  
  }

  const userExists = await User.findOne({email})

  if (userExists){
   return res.json({
      status:false,
      message:"user already exists"
    })
  }
  //Hash password

  const hashedpassword =  await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password:hashedpassword,
    pic
  })


  if(user){
  return  res.json({
      
      status:true,
      message:"user created",
      data:{
        user
      },
  token:generateToken(user._id),
    })
  }else{
  return res.json({
      status:false,
      message:"user not created"

    })
  }

}catch(err){
  console.log(err)
}
}





//LOGIN

const authUser =   async(req,res,next)=>{

    try{
  const {email,password} = req.body

  const user = await User.findOne({email})

  if(!user ){
    res.json({
      message:"user not found",
      status:false
    })
  }



  const isPasswordValid = await bcrypt.compare(password,user.password)


  if(!isPasswordValid){
    res.json({
      status:false,
      message:"password is not valid"
    })
  }


  const userWithoutPassword = { ...user.toObject(), password: undefined };

  res.json({
    status:true,
    data:{
      user:userWithoutPassword,
      message:"login successful",
      token:generateToken(user._id)
    },
    
  })
  }catch(err){
    console.log(err)
  }


}



//SEARCH QUERY
const allUsers = async(req,res) => {
try{

const keyword = req.query.search ? {$or:[
  {name: {$regex: req.query.search, $options :"i"}},
  {email: {$regex: req.query.search, $options :"i"}}
]}:{};

let users = await User.find(keyword)
users = users.filter((user) => user._id.toString() !== req.user._id.toString())

res.send(users)

}catch(err){
  console.log(err)
}
}


  
module.exports = {
  registerUser,
  authUser,
  allUsers
}
