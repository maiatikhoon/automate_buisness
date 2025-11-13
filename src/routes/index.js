
const express = require("express") ; 
const authRoutes = require("./auth");
const assetRoutes = require("./assets");
const adminRoutes = require("./admin");

const router = express.Router() ; 


router.use('/auth' , authRoutes )  ;  
router.use('/assets' , assetRoutes) ;  
router.use('/admin' , adminRoutes ) ; 


module.exports = router ; 