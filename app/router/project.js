const { ProjectController } = require('../http/controllers/project.Controller');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
const { createProjectValidator } = require('../http/validation/project');
const { uploadFile } = require('../modules/express-fileUpload');
const { checkLogin } = require('./../http/middlewares/autoLogin');
const fileupload = require('express-fileupload');
const { mongoIdValidator } = require('../http/validation/public');

const router = require('express').Router();


// * router
router.post("/createProject", fileupload(), checkLogin, uploadFile, createProjectValidator(), expressValidationMapper, ProjectController.createProject)
router.post("/list", checkLogin, ProjectController.getAllProjects)
router.post("/:id", checkLogin, mongoIdValidator(), ProjectController.getProjectById)
router.post("/remove/:id", checkLogin, mongoIdValidator(), ProjectController.removeProject)
router.post("/edit/:id", checkLogin, mongoIdValidator(), ProjectController.updateProject)


module.exports = {
    projectRouter: router
};