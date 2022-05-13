const { TeamModel } = require("../../models/team");
const { UserModel } = require("../../models/user");
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
    async getMyTeams(req, res, next) {
        try {
            const userID = req.user._id;
            const teams = await TeamModel.find({ $or: [{ owner: userID }, { users: userID }] });
            if (!teams) this.error400(req, res, "شما در تیمی فعال نیستید");
            return this.success200(req, res, teams);
        } catch (err) {
            next(err)
        }
    }
    async removeTeambyId(req, res, next) {
        try {
            const teamId = req.params.id;
            const team = await TeamModel.findByIdAndRemove({ _id: teamId });
            // TODO Cannot set headers after they are sent to the client
            if (!team) this.error400(req, res, "متاسفانه تیمی برای نمایش پیدا نشد");
            return this.success200(req, res, "تیم با موفقیت حذف شد");
        } catch (err) {
            next(err);
        }
    }
    async inviteUserToTeam(req, res, next) {
        try {
            const userID = req.user._id;
            const { username, teamID } = req.params;
            const team = await TeamModel.findOne({ $or: [{ owner: userID }, { users: userID }], _id: teamID });
            if (!team) this.error400(req, res, "لطفا ابتدا یک تیم را ایجاد کنید");
            const user = await UserModel.findOne({ username });
            if (!user) this.error400(req, res, "کاربر مورد نظر جهت دعوت یافت نشد");
            // TODO fixed error
            // const userInvited = await TeamModel.findOne({ $or: [{ owner: userID}, { users: teamID }], _id: teamID });
            // if (userInvited) this.error400(req, res, "درخواست ارسال شده است");
            const request = {
                caller: req.user.username,
                requestDate: new Date(),
                teamID,
                status: "pending"
            };
            const updateUserResult = await UserModel.updateOne({ username }, { $push: { inviteRequest: request } });
            if (updateUserResult.modifiedCount == 0) throw this.error500(req, res, "قبت درخواست در حال حاضر امکان پذیر نیست");
            return this.success200(req, res, "دعوت کاربر ارسال شد");
        } catch (err) {
            next(err);
        }
    }
    async updateTeam(req, res, next) {
        try {
            const data = { ...req.body };
            Object.keys(data).forEach(key => {
                if (!data[key]) delete data[key];
                if (["", " ", undefined, null, NaN].includes(data[key])) delete data[key];
            })
            const userID = req.user._id;
            const { teamID } = req.params;
            const team = await TeamModel.findOne({ owner: userID, _id: teamID });
            if (!team) throw this.error404(req, res, "تیمی با این مشخصات وجود ندارد");
            const teamEditResult = await TeamModel.updateOne({ _id: teamID }, { $set: data });
            if (teamEditResult.modifiedCount == 0) throw this.error500(req, res, "بروزرسانی با شکست مواجه شد");
            return this.success200(req, res, "تیم با موفقیت به روز شد")
        } catch (err) {
            next(err)
        }
    }
}

module.exports = {
    TeamController: new TeamController()
}