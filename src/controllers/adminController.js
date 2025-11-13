const { User, Asset } = require("../models/sql");
const asyncErrorHandler = require("../utils/asyncErrorHandler");


module.exports.listAllUsers = asyncErrorHandler(async (req, res) => { 

  const users = await User.findAll({
    attributes: ["id", "username", "email", "role", "createdAt"],
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({
    status: 200,
    message: "All users fetched successfully",
    data: users,
  }); 

});

module.exports.deleteUser = asyncErrorHandler(async (req, res) => { 

  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(200).json({ status: 404, message: "User not found" });
  }

  await user.destroy();
  return res.status(200).json({ status: 200, message: "User deleted successfully" });
});
