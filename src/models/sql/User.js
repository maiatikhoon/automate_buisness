
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/sequelize");
const { _userType } = require("../../utils");


const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(30), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(200), allowNull: false },
    username: { type: DataTypes.STRING(50), allowNull: false },
    role: { type: DataTypes.ENUM(_userType.admin, _userType.user, _userType.viewer), allowNull: false, defaultValue: _userType.user },
},
    {
        tableName: 'users',
        timestamps: true,
        underscored: true,
    })

module.exports = User; 