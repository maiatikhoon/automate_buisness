
const mongoose = require("mongoose") ; 

async function connectMongo() { 

    try { 
        await mongoose.connect(process.env.MONGO_URL) ; 
        console.log("Mongodb connected successfully") ; 
    }catch(error) { 
        console.log("Connection failed" , error.message ) ; 
    }
}

module.exports = connectMongo ; 