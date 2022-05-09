const { UserModel } = require("../../models/user");
const { Controller } = require("./Controller");

class UserController extends Controller {

    getProfile(req, res, next) {
        try {
            const user = req.user;
            user.profile_image = req.protocol + "://" + req.get("host") + "/" + (user.profile_image).replace(/[\\\\]/gm , "/")
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
    addSkills() {

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
    editSkills() {

    }
    acceptInviteTeam() {

    }
    rejectInviteInTeam() {

    }
}

module.exports = {
    UserController: new UserController()
}