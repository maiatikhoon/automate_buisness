const { User } = require("../models/sql");



module.exports.findAllUsers = async () => {

    const users = await User.findAll({
        attributes: ["id", "username", "email", "role", "createdAt"],
        order: [["createdAt", "DESC"]],
    });

    return users;
}


module.exports.deleteUser = async (id) => {

    const user = await User.findByPk(id);
    if (!user) {
        return false ; 
    } 

    await user.destroy(); 
    return true ;
}
