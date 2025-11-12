
const Joi = require("joi");

const validRoles = ['admin', 'user', 'viewer'];

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid(...validRoles),
})


const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})


module.exports = { registerSchema , loginSchema } ; 