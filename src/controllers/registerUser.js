const User = require("../models/sql/User");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { registerSchema, loginSchema } = require("../validations/authValidators");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.registerUser = asyncErrorHandler(async (req, res) => {

    const { error, value } = registerSchema.validate(req.body);

    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const { email, password, username, role } = value;

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

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(200).json({ status: 201, data: { user: payload, token }, message: "User created successfully" });

})


module.exports.loginUser = asyncErrorHandler(async (req, res) => {

    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const { email, password } = value;
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(200).json({ status: 400, message: "User doesn't exist, Register first" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        return res.status(200).json({ status: 401, message: "Invalid Credentials." });
    }

    const payload = { id: user.id, role: user.role, username: user.username, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).json({ status: 200, data: { user: payload, token }, message: "User Logged in successfully" });
})