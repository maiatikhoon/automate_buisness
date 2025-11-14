
const express = require("express") ; 
const { adminStorageUsage, mostActiveUsers, totalUploadsDeletions, userStorageUsage, assetTypeDistribution, recentActivityTimeline } = require("../controllers/analyticsController");
const verifyToken = require("../middlewares/verifyToken");
const permit = require("../middlewares/permit");

const analyticsRoutes = express.Router() ; 


analyticsRoutes.get("/admin/storage" , verifyToken , permit('admin') ,  adminStorageUsage ) 
analyticsRoutes.get("/admin/active-users" , verifyToken , permit("admin") ,  mostActiveUsers)  
analyticsRoutes.get("/admin/summary" , verifyToken , permit("admin") ,  totalUploadsDeletions)   
analyticsRoutes.get("/user/storage" , verifyToken , permit("user") , userStorageUsage)  
analyticsRoutes.get("/user/type-distribution" , verifyToken , permit("user") , assetTypeDistribution)  
analyticsRoutes.get("/user/recent-activity" , verifyToken , permit("admin" , "user") , recentActivityTimeline );    


module.exports = analyticsRoutes ; 

