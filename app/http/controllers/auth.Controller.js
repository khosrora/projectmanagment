const { hashString, tokenMaker } = require("../../modules/functions");
const { UserModel } = require('./../../models/user');
const bcrypt = require('bcrypt');

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
    async login(req, res, next) {
        try {
            console.log(req.headers);
            const { username, password } = req.body;
            const user = await UserModel.findOne({ username });
            if (!user) throw { status: 401, success: false, message: "لطفا ابتدا ثبت نام کنید" };
            const compareResult = bcrypt.compareSync(password, user.password);
            if (!compareResult) throw { status: 401, success: false, message: "لطفا ابتدا ثبت نام کنید" };
            const token = tokenMaker({ username });
            user.token = token;
            await user.save()

            return res.status(200).json({
                status: 200,
                success: true,
                message: "ورود موفقیت آمیز بود",
                token
            });
        } catch (err) {
            next(err)
        }
    }
    resetPassword() {

    }
}

module.exports = {
    AuthController: new AuthController()
}