const jwt = require("jsonwebtoken") 
const jwtSecret = "123@123" /* (set up password to confirm the newToken) */

//! @param {object} payload
//! @return {String} token

 const generateToken = (payload) => {
   const token = jwt.sign(payload , jwtSecret, { expiresIn:"1h"})  //   
   return token ;
 }

//! @param {String} token
//! @return {object} payload

const verifyToken = (token) => {
  const payload = jwt.verify(token, jwtSecret)
  console.log(payload)
  return payload
}

module.exports = { generateToken , verifyToken }