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
router.get("/requests", checkLogin, UserController.getAllRequest)
router.get("/requests/:status", checkLogin, UserController.requestByStatus)
router.get("/change-status-request/:id/:status", checkLogin, UserController.changeStatusRequest)


module.exports = {
    userRouter: router
};