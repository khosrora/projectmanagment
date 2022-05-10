const { body } = require("express-validator");

function createProjectValidator() {
    return [
        body("title").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد"),
        body("tags").isArray({ min: 0, max: 10 }).withMessage("حداکثر 10 تگ میتوانید قرار بدهید"),
        body("text").notEmpty().isLength({ min: 20 }).withMessage("متن پروژه نمیتواند خالی باشد"),
    ]
}

module.exports = {
    createProjectValidator
}