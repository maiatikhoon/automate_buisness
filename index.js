
const express = require("express") ; 
const app = express() ;  
require("dotenv").config() ; 
const PORT = process.env.PORT || 3000 ;     
const apiVersion = process.env.apiVersion ; 
const cors = require("cors") ;  
const morgan = require("morgan");
const connectDatabases = require("./src/database/connectDatabase");
const router = require("./src/routes");


app.use(cors()) ; 
app.use(morgan("dev")) ; 
app.use(express.json()) ;   

connectDatabases() ; 

app.get("/" , (req ,res) => { 
    return res.json({ status : 200 , message : "Welcome to our server"}) ; 
}) 

app.use(apiVersion , router) ; 

app.listen(PORT , () => { 
    console.log(`Server is listening on PORT ${PORT}`) ; 
})