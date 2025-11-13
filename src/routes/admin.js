
const express = require("express") ; 
const verifyToken = require("../middlewares/verifyToken");
const permit = require("../middlewares/permit");
const { listAllUsers, deleteUser } = require("../controllers/adminController");
const adminRoutes = express.Router() ; 


adminRoutes.get("/users", verifyToken, permit("admin"), listAllUsers);
adminRoutes.delete("/user/:id", verifyToken, permit("admin"), deleteUser);

module.exports = adminRoutes ; 