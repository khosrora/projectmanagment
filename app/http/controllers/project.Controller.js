const { ProjectModel } = require("../../models/project");
const { createLinkFiles } = require("../../modules/functions");
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
            for (const project of projects) {
                project.image = createLinkFiles(req, project.image)
            }
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
            project.image = createLinkFiles(req, project.image)
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
    async updateProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            await this.findProject(projectID, owner);
            const data = { ...req.body };
            Object.entries(([key, value]) => {
                if (!["title", "text", "tags"].includes(key)) delete data[key];
                if (['', " ", 0, null, undefined, NaN, [], {}].includes(value)) delete data[key];
                if (key === "tags" && ((data['tags'].constructor === Array))) {
                    data["tags"] = data["tags"].filter(val => {
                        if (!['', " ", 0, null, undefined, NaN, [], {}].includes(val)) return val
                    })
                    if (data['tags'].length === 0) delete data['tags']
                }
            })
            const updateResult = await ProjectModel.updateOne({ _id: projectID }, { $set: data });
            if (updateResult.modifiedCount == 0) throw this.error400(req, res, "بروز رسانی انجام نشد");
            return this.success200(req, res, "پروژه با ویرایش انجام شد")
        } catch (err) {
            next(err)
        }
    }

    async updateProjectImage(req, res, next) {
        try {
            const { image } = req.body;
            const owner = req.user._id;
            const projectID = req.params.id;
            await this.findProject(projectID, owner);
            const updateResult = await ProjectModel.updateOne({ _id: projectID }, { $set: { image } })
            if (updateResult.modifiedCount == 0) throw this.error400(req, res, "بروز رسانی انجام نشد");
            return this.success200(req, res, "پروژه با ویرایش انجام شد")
        } catch (err) {
            next(err)
        }
    }

    getProjectOfTeam() {

    }
    getProjectOfUser() {

    }
}

module.exports = {
    ProjectController: new ProjectController()
}