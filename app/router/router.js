const router = require('express').Router();
// ! imports
const { authRouter } = require('./auth');
const { projectRouter } = require('./project');
const { teamRouter } = require('./team');
const { userRouter } = require('./user');


router.use("/auth", authRouter);
router.use("/project", projectRouter);
router.use("/team", teamRouter);
router.use("/user", userRouter);




module.exports = {
    AllRoutes: router
};