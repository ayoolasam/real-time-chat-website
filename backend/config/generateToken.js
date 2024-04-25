const jwt = require('jsonwebtoken')




const generateToken = (id)=>{
  
  const expiresIn ="1h"
  // console.log(process.env.JWT_SECRET)
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
  
// return jwt.sign({id},process.env.JWT_SECRET,{expiresIn})
}

module.exports = generateToken  