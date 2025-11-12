
const express = require("express") ; 
const app = express() ;  
require("dotenv").config() ; 
const PORT = process.env.PORT ;    
const cors = require("cors") ;  
const morgan = require("morgan");
const connectDatabases = require("./src/database/connectDatabase");


app.use(cors()) ; 
app.use(morgan("dev")) ; 
app.use(express.json()) ;   

connectDatabases() ; 

app.get("/" , (req ,res) => { 
    return res.json({ status : 200 , message : "Welcome to our server"}) ; 
})

app.listen(PORT , () => { 
    console.log(`Server is listening on PORT ${PORT}`) ; 
})