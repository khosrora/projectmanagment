const { UserModel } = require("../../models/user");
const { createLinkFiles } = require("../../modules/functions");
const { Controller } = require("./Controller");

class UserController extends Controller {

    getProfile(req, res, next) {
        try {
            const user = req.user;
            user.profile_image = createLinkFiles(req, user.profile_image)
            return this.success200(req, res, user)
        } catch (err) {
            next(err)
        }
    }
    async editProfile(req, res, next) {
        try {
            let data = req.body;
            const userID = req.user._id;
            const result = await UserModel.updateOne({ _id: userID }, { $set: data })
            if (result.modifiedCount > 0) this.success200(req, res, "بروز رسانی با موفقیت انجام شد")
            throw this.error400(req, res, "لطفا دوباره امتحان کنید")
        } catch (err) {
            next(err)
        }
    }
    async uploadProfileImage(req, res) {
        try {
            const userID = req.user._id;
            if (Object.keys(req.file).length == 0) throw this.error400(req, res, "لطفا یک تصویر را انتخاب کنید");
            const filePath = req.file?.path.replace("\\", "/").substring(7);
            const result = await UserModel.updateOne({ id: userID }, { $set: { profile_image: filePath } });
            if (result.modifiedCount == 0) throw this.error400(req, res, "بارگذاری با شکست مواجح شد")
            return this.success200(req, res, "عکس پروفایل شما با موفقیت بارگذاری شد")
        } catch (err) {
            next(err)
        }
    }
    async getAllRequest(req, res, next) {
        try {
            const userID = req.user._id;
            const requests = await UserModel.findById(userID, { inviteRequest: 1 });
            return this.success200(req, res, requests)
        } catch (err) {
            next(err)
        }
    }
    async requestByStatus(req, res, next) {
        try {
            const status = req.params;
            const userID = req.user._id;
            const requests = await UserModel.aggregate([
                { $match: { _id: userID } },
                {
                    $project: {
                        inviteRequest: 1,
                        _id: 0,
                    }
                }
            ]);
            return this.success200(req, res, requests)
        } catch (err) {
            next(err)
        }
    }
    async changeStatusRequest(req, res, next) {
        try {
            const { id, status } = req.params;
            const request = await UserModel.findOne({ "inviteRequest._id": id });
            if (!request) throw this.error404(req, res, "درخواستی با این مشخصات پیدا نشد");
            const findRequest = request.inviteRequest.find(item => item.id === id);
            if (findRequest.status !== "pending") throw this.error400(req, res, "وضعیت درخواست مشخص شده است");
            if (!['accepted', 'rejected'].includes(status)) throw this.error400(req, res, "اطلاعات ارسال شده صحیح نمی باشد");
            const updateResult = await UserModel.updateOne({ "inviteRequest._id": id }, { $set: { 'inviteRequest.$.status': status } });
            if (updateResult.modifiedCount == 0) throw this.error500(req, res, "تغییر درخواست با مشکل مواجه شد");
            return this.success200(req, res, "وضعیت درخواست تغییر کرد");
        } catch (err) {
            next(err)
        }
    }
    acceptInviteTeam() {

    }
    rejectInviteInTeam() {

    }
}

module.exports = {
    UserController: new UserController()
}