const { associate } = require("../models/sql");
const connectMongo = require("./mongoose");
const sequelize = require("./sequelize");


async function connectDatabases() {
    try {
        await connectMongo();

        await sequelize.authenticate();
        associate() ; 
        console.log("PostgreSQL connected successfully"); 
        await sequelize.sync({ alter: true }); 
        console.log("Database synced") ; 

    } catch (error) {
        console.log(`Database Connection failed `, error.message);
    }
}

module.exports = connectDatabases ; 