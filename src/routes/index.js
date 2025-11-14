
const express = require("express") ; 
const authRoutes = require("./auth");
const assetRoutes = require("./assets");
const adminRoutes = require("./admin");
const analyticsRoutes = require("./analytics");

const router = express.Router() ; 


router.use('/auth' , authRoutes )  ;  
router.use('/assets' , assetRoutes) ;  
router.use('/admin' , adminRoutes ) ;  
router.use('/analytics' , analyticsRoutes) ; 


module.exports = router ; 