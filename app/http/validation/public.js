const { param } = require("express-validator");

function mongoIdValidator() {
    return [
        param('id').isMongoId().withMessage("شناسه ارسال شده صحیح نمی باشد")
    ]
}


module.exports = { mongoIdValidator }