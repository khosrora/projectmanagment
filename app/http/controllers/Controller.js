const autoBind = require('auto-bind');



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
        return res.status(400).json({
            status: 401,
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

}

module.exports = { Controller }