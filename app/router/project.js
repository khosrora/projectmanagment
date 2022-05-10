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
router.get("/list", checkLogin, ProjectController.getAllProjects)
router.get("/:id", checkLogin, mongoIdValidator(), ProjectController.getProjectById)
router.delete("/remove/:id", checkLogin, mongoIdValidator(), ProjectController.removeProject)
router.put("/edit/:id", checkLogin, mongoIdValidator(), ProjectController.updateProject)
router.patch("/editProjectImage/:id", fileupload(), checkLogin, uploadFile, mongoIdValidator(), expressValidationMapper, ProjectController.updateProjectImage)


module.exports = {
    projectRouter: router
};