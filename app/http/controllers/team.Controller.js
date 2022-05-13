const { TeamModel } = require("../../models/team");
const { Controller } = require('./Controller');

class TeamController extends Controller {
    async createTeam(req, res, next) {
        try {
            const { name, description, username } = req.body;
            const owner = req.user._id;
            // TODO fixed error ==>  E11000 duplicate key error collection: projectManageDB.teams index: id_name_1 dup key: { id_name: null } 
            const team = await TeamModel.create({ name, description, username, owner });
            if (!team) throw this.error500(req, res, "ایجاد تیم با خطا مواجه شد");
            return this.success200(req, res, "تیم ساخته شد");
        } catch (err) {
            next(err)
        }
    }
    async getListOfTeam(req, res, next) {
        try {
            const teams = await TeamModel.find();
            return this.success200(req, res, teams)
        } catch (err) {
            next(err)
        }
    }
    async getTeamById(req, res, next) {
        try {
            const teamId = req.params.id;
            const team = await TeamModel.findById({ _id: teamId });
            if (!team) this.error400(req, res, "متاسفانه تیمی برای نمایش پیدا نشد");
            return this.success200(req, res, team);
        } catch (err) {
            next(err)
        }
    }

    inviteUserToTeam() {

    }
    RemoveUserFromTeam() {

    }
    updateTeam() {

    }
}

module.exports = {
    TeamController: new TeamController()
}