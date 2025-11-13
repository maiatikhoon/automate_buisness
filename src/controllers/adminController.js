const { User, Asset } = require("../models/sql");
const { deleteUser, findAllUsers } = require("../services/userService");
const asyncErrorHandler = require("../utils/asyncErrorHandler");


module.exports.listAllUsers = asyncErrorHandler(async (req, res) => {

    const users = await findAllUsers() ;  

    return res.status(200).json({
        status: 200,
        message: "All users fetched successfully",
        data: users,
    });

});

module.exports.deleteUser = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;

    const isUserFoundAndDeleted = await deleteUser(id);

    if (!isUserFoundAndDeleted) {
        return res.status(200).json({ status: 404, message: "User not found" });
    }

    return res.status(200).json({ status: 200, message: "User deleted successfully" });
});
