const sequelize = require("../../database/sequelize");
const Asset = require("./Asset");
const User = require("./User"); 


function associate() {
 

    Asset.belongsTo(User, {
        as: "uploader",
        foreignKey: "user_id",
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })

    User.hasMany(Asset, {
        as: 'assets',
        foreignKey: 'user_id',
        sourceKey: 'id',
    });
}

module.exports = { associate , User , Asset , sequelize } ; 