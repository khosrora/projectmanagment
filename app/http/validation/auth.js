const { body } = require('express-validator');
const { UserModel } = require('../../models/user');



function registerValidator() {
    return [
        body("username").custom(async (value, ctx) => {
            if (value) {
                const usernameRegex = /^[a-z]+[a-z0-9\_\.]{2,}/gi
                if (usernameRegex.test(value)) {
                    const user = await UserModel.findOne({ username: value });
                    if (user) throw "نام کاربری خود را تغییر بدهید"
                    return true
                }
                throw "نام کاربری صحیح نمی باشد"
            }
            throw "نام کاربری نمیتوانب خالی باشد"
        }),
        body("email").isEmail().withMessage("پست الکترونیک صحیح نمی باشد").custom(async (value, ctx) => {
            const user = await UserModel.findOne({ email: value });
            if (user) throw " پست الکترونیک خود را تغییر بدهید"
            return true
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره تماس صحیح نمی باشد").custom(async (value, ctx) => {
            const user = await UserModel.findOne({ mobile: value });
            if (user) throw "  شماره تماس خود را تغییر بدهید"
            return true
        }),
        body("password").isLength({ min: 6, max: 16 }).withMessage("رمز عبور حداقل باید 6 و حداکثر 16 کاراکتر باشد").custom((value, ctx) => {
            if (!value) throw ("رمز عبور نباید خالی باشد");
            if (value !== ctx?.req?.body?.confirm_password) throw ("رمز عبور با تکرار آن یکسان نمی باشد");
            return true
        })
    ]
}
module.exports = {
    registerValidator
}