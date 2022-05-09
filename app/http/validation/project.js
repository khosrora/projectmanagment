const { body } = require("express-validator");

function createProjectValidator() {
    return [
        body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        body("text").notEmpty().isLength({ min: 20 }).withMessage("متن پروژه نمیتواند خالی باشد"),
    ]
}

module.exports = {
    createProjectValidator
}