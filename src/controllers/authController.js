const { registerUserService, loginUserService } = require("../services/authService");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { generateToken } = require("../utils/token");
const { registerSchema, loginSchema } = require("../validations/authValidators");


module.exports.registerUser = asyncErrorHandler(async (req, res) => {

    const { error, value } = registerSchema.validate(req.body);

    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const { email, password, username, role } = value;
    const { user, token } = await registerUserService({ username, email, password, role });

    return res.status(200).json({ status: 201, data: { user, token }, message: "User created successfully" });
})


module.exports.loginUser = asyncErrorHandler(async (req, res) => {

    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        const message = error.details.map(d => d.message.replace(/['"]/g, '')).join(",");
        return res.status(200).json({ status: 400, message: message });
    }

    const { email, password } = value;
    const { user, token } = await loginUserService({ email, password });

    return res.status(200).json({ status: 200, data: { user, token }, message: "User Logged in successfully" });
})

module.exports.googleCallback = async (req, res) => {

    try {
        const user = req.user;

        const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        };

        const token = generateToken(payload);

        return res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);

    } catch (err) {
        console.error("Google OAuth Error:", err);
        return res.redirect(`${process.env.FRONTEND_URL}/auth/failure`);
    }
}