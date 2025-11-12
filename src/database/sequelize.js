
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRESQL_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,    
            rejectUnauthorized: false
        }
    },
    logging: false, 
})

module.exports = sequelize ; 