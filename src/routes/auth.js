

const express = require("express") ; 
const { registerUser, loginUser } = require("../controllers/registerUser");
const authRoutes = express.Router() ; 


authRoutes.use('/register' , registerUser) ;  
authRoutes.use('/login' , loginUser) ; 



module.exports = authRoutes ; 