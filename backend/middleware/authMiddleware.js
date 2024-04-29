const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers["authorization"] && req.headers["authorization"].startsWith("Bearer")) {
      // Split the authorization header by space to separate the 'Bearer' prefix and the token
      token = req.headers["authorization"].split(" ")[1];
    }
    if (!token) {
      // If token is not found, return an error
      return res.status(401).json({ error: 'Authorization token not provided' });
    }
    
    // Verify the token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
    // Retrieve user information from the decoded token
    req.user = await User.findById(decoded.id).select('-password');
    // Proceed to the next middleware
    next();
  } catch (err) {
    console.log(err);
    // Handle any errors
    return res.status(401).json({ error: 'Invalid authorization token' });
  }
}

module.exports = { protect };




// const jwt = require('jsonwebtoken')
// const User = require('../Models/userModel')



// const protect = async(req,res,next)=>{
// try{
//   let token;
//   if(
//     req.body.authorization && req.body.authorization.startsWith("Bearer")
//   )
//   token = req.body.authorization.split(" ")[1]

//   const decoded = jwt.verify(token,process.env.JWT_SECRET);


//   req.user = await User.findById(decoded.id).select('-password')
  
//   next()

// }catch(err){
//   console.log(err)
// }
// }


// module.exports = {protect}