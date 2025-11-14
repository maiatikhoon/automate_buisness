

const express = require("express") ; 
const { registerUser, loginUser, googleCallback } = require("../controllers/authController");
const authRoutes = express.Router() ; 
const passport = require("passport") ; 


authRoutes.use('/register' , registerUser) ;  
authRoutes.use('/login' , loginUser) ; 
authRoutes.get("/google", passport.authenticate("google", { scope: ["profile", "email"] })  );
authRoutes.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback );



module.exports = authRoutes ; 