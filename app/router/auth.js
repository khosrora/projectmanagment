const router = require('express').Router();
// !middleware
const { registerValidator, loginValidation } = require('./../http/validation/auth');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
// ! controller
const { AuthController } = require('./../http/controllers/auth.Controller');




// ! routes
router.post("/register", registerValidator(), expressValidationMapper, AuthController.register)
router.post("/login", loginValidation(), expressValidationMapper, AuthController.login)


module.exports = {
    authRouter: router
};