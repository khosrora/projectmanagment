const autoBind = require('auto-bind');
const { ProjectModel } = require('../../models/project');



class Controller {

    constructor() {
        autoBind(this)
    }

    error400(req, res, payload) {
        return res.status(400).json({
            status: 400,
            success: false,
            payload: payload
        })
    }
    error401(req, res, payload) {
        return res.status(401).json({
            status: 401,
            success: false,
            payload: payload
        })
    }
    error404(req, res, payload) {
        return res.status(404).json({
            status: 404,
            success: false,
            payload: payload
        })
    }
    success200(req, res, payload) {
        return res.status(200).json({
            status: 200,
            success: true,
            payload: payload
        })
    }

    async findProject(id, owner) {
        const project = await ProjectModel.findOne({ owner, _id: id });
        if (!project) throw this.error404(req, res, "پروژه ای با این اطلاعات پیدا نشد")
        return project
    }
}

module.exports = { Controller }