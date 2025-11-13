
const express = require("express") ; 
const authRoutes = require("./auth");
const assetRoutes = require("./assets");

const router = express.Router() ; 


router.use('/auth' , authRoutes )  ;  
router.use('/assets' , assetRoutes) ; 


module.exports = router ; 