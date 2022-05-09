const { ProjectController } = require('../http/controllers/project.Controller');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
const { createProjectValidator } = require('../http/validation/project');
const { uploadFile } = require('../modules/express-fileUpload');
const { checkLogin } = require('./../http/middlewares/autoLogin');
const fileupload = require('express-fileupload');

const router = require('express').Router();


// * router
router.post("/createProject", fileupload(), checkLogin, uploadFile, createProjectValidator(), expressValidationMapper, ProjectController.createProject)


module.exports = {
    projectRouter: router
};