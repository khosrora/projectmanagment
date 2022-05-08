const { UserController } = require('../http/controllers/user.Controller');
const { checkLogin } = require('../http/middlewares/autoLogin');

const router = require('express').Router();



// * router
router.post("/getProfile", checkLogin, UserController.getProfile)

module.exports = {
    userRouter: router
};