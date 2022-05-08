const router = require('express').Router();
// !middleware
const { registerValidator } = require('./../http/validation/auth');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
// ! controller
const { AuthController } = require('./../http/controllers/auth.Controller');




// ! routes
router.post("/register", registerValidator(), expressValidationMapper, AuthController.register)


module.exports = {
    authRouter: router
};