const { ProjectModel } = require("../../models/project");
const { Controller } = require('./Controller');

class ProjectController extends Controller {
    async createProject(req, res, next) {
        try {
            const { title, text, image } = req.body;
            const result = await ProjectModel.create({ title, text, owner: req.user._id, image });
            if (!result) throw this.error400(req, res, "پروژه ساخته نشد");
            return this.success200(req, res, "پروژه با موفقیت ساخته شد")
        } catch (err) {
            next(err)
        }
    }
    async getAllProjects(req, res, next) {
        try {
            const owner = req.user._id;
            const projects = await ProjectModel.find({ owner });
            return this.success200(req, res, projects);
        } catch (err) {
            next(err)
        }
    }
    getProjectById() {

    }
    getProjectOfTeam() {

    }
    getProjectOfUser() {

    }
    updateProject() {

    }
    removeProject() {

    }
}

module.exports = {
    ProjectController: new ProjectController()
}