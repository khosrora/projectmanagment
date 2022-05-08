const res = require("express/lib/response");

class UserController {
    getProfile(req, res, next) {
        try {
            const user = req.user;
            return res.status(200).json({
                status: 200,
                success: true,
                user
            })
        } catch (err) {
            next(err)
        }
    }
    editProfile() {

    }
    addSkills() {

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