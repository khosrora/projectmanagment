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
    async getAllProjects(req, res, next) {
        try {
            const owner = req.user._id;
            const projects = await ProjectModel.find({ owner });
            return this.success200(req, res, projects);
        } catch (err) {
            next(err)
        }
    }
    async getProjectById(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await this.findProject(projectID, owner)
            return this.success200(req, res, project)
        } catch (err) {
            next(err)
        }
    }
    async removeProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            await this.findProject(projectID, owner);
            const delProjectResult = await ProjectModel.deleteOne({ _id: projectID })
            if (delProjectResult.deletedCount == 0) throw this.error400(req, res, "پروژه حذف نشد");
            return this.success200(req, res, "پروژه با موفقیت حذف شد")
        } catch (err) {
            next(err)
        }
    }
    getProjectOfTeam() {

    }
    getProjectOfUser() {

    }
    updateProject() {

    }
}

module.exports = {
    ProjectController: new ProjectController()
}