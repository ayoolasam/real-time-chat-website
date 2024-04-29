const jwt = require('jsonwebtoken')




const generateToken = (id)=>{
  
   const expiresIn ="1h"

return jwt.sign({id},process.env.JWT_SECRET,{ expiresIn })
  
}

module.exports = generateToken  