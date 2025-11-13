
const jwt = require("jsonwebtoken");
const { User } = require("../models/sql");

const verifyToken = async (req, res, next) => {

    try {

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(200).json({ status: 401, message: "Token is missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id, { attributes: ['id', 'email', 'username', 'role'] });

        if (!user) {
            return res.status(200).json({ status: 400, message: "User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error.message);
        return res.status(200).json({ status: 401, message: "Authentication Failed" });
    }
}

module.exports = verifyToken ; 