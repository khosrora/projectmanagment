const { UserController } = require('../http/controllers/user.Controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { imageValidator } = require('../http/validation/user');
const { upload_multer } = require('../modules/multer');
const { expressValidationMapper } = require('./../http/middlewares/checkErrors');

const router = require('express').Router();



// * router
router.post("/getProfile", checkLogin, UserController.getProfile)
router.post("/editProfile", checkLogin, UserController.editProfile)
router.post("/profileImage", checkLogin,
    upload_multer.single("image"), imageValidator(),
    expressValidationMapper, UserController.uploadProfileImage)

module.exports = {
    userRouter: router
};