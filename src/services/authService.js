const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/sql/User");
const { generateToken } = require("../utils/token");

module.exports.registerUserService = async ({ username, email, password, role }) => {

    if (role && role === 'admin') {
        return res.status(200).json({ status: 400, message: 'Cannot self-assign Admin role during registration.' });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        return res.status(200).json({ status: 400, message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password: hashedPassword, role });

    const payload = { id: newUser.id, role: newUser.role, username: newUser.username, email: newUser.email };

    const token = generateToken(payload);

    return { user : payload , token } ; 
}

module.exports.loginUserService = async ({ email , password }) => {

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(200).json({ status: 400, message: "User doesn't exist, Register first" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        return res.status(200).json({ status: 401, message: "Invalid Credentials." });
    }

    const payload = { id: user.id, role: user.role, username: user.username, email: user.email }; 

    const token = generateToken(payload);
    return { user : payload  , token } ; 
}