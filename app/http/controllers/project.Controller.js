const { ProjectModel } = require("../../models/project");
const { Controller } = require('./Controller');

class ProjectController extends Controller {
    async createProject(req, res, next) {
        try {
            const { title, text, image, tags } = req.body;
            const result = await ProjectModel.create({ title, text, owner: req.user._id, image, tags });
            if (!result) throw this.error400(req, res, "پروژه ساخته نشد");
            return this.success200(req, res, "پروژه با موفقیت ساخته شد")
        } catch (err) {
            next(err)
        }
    }
    getAllProjects() {

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