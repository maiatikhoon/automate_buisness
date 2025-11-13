
const express = require("express");

const assetRoutes = express.Router();
const multer = require("multer");
const verifyToken = require("../middlewares/verifyToken");
const permit = require("../middlewares/permit");
const { uploadAssets, listAssets, updateAssets, deleteAssest, getSharedAssets, listAllAssets } = require("../controllers/assetsController");

const upload = multer({ storage: multer.memoryStorage() });


assetRoutes.post('/', verifyToken, permit("admin", "user"), upload.array('files', 10), uploadAssets);
assetRoutes.get("/" , verifyToken , permit("admin" , "user") , listAssets ) ;  
assetRoutes.put("/:id" , verifyToken , permit("admin" , "user")  , updateAssets) ; 
assetRoutes.delete("/:id" , verifyToken , permit("admin" , "user") , deleteAssest) ; 
assetRoutes.get("/shared/:id" , verifyToken , permit("admin" , "user") ,  getSharedAssets ) ;  
assetRoutes.get("/all" , verifyToken , permit("admin") , listAllAssets ) ; 

module.exports = assetRoutes; 