const { hashString } = require("../../modules/functions");
const { UserModel } = require('./../../models/user');

class AuthController {
    async register(req, res, next) {
        try {
            const { username, password, email, mobile } = req.body;
            const hash_password = hashString(password);
            const user = await UserModel.create({ username, email, password: hash_password, mobile })
            res.json(user)
        } catch (err) {
            next(err)
        }
    }
    login() {

    }
    resetPassword() {

    }
}

module.exports = {
    AuthController: new AuthController()
}