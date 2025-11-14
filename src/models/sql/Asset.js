
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");


const Asset = sequelize.define("Asset", {

    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    key: { type: DataTypes.STRING(200), allowNull: false },
    filename: { type: DataTypes.STRING(200), allowNull: false },
    user_id: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
    },
    mime: { type: DataTypes.STRING(100), allowNull: true },
    size: { type: DataTypes.INTEGER, allowNull: true },
    tags: { type: DataTypes.JSONB, allowNull: true, defaultValue: [] },
    permissions: { type: DataTypes.JSONB, allowNull: true },
    meta: { type: DataTypes.JSONB, allowNull: true },
},
    {
        tableName: 'assets',
        timestamps: true,
        underscored: true,
    }) ; 


module.exports = Asset ; 