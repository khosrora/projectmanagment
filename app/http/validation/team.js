const { body } = require("express-validator");
const { TeamModel } = require("../../models/team");

function teamCreateValidation() {
    return [
        body("name").notEmpty().isLength({ min: 4, max: 100 }).withMessage("نام تیم بین 4 و 100 کاراکتر باشد"),
        body("description").notEmpty().isLength({ min: 10, max: 250 }).withMessage("توضیحات تیم بین 10 و 250 کاراکتر باشد"),
        body("username").custom(async (username) => {
            const usernameRegep = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
            if(usernameRegep.test(username)){
                const team = await TeamModel.findOne({username});
                if(team) throw "نام کاربری قبلا توسط تیم دیگری استفاده شده است";
                return true 
            }
            throw "نام کاربری را به طور صحیح وارد کنید"
        }),

    ]
}
module.exports = {
    teamCreateValidation
}