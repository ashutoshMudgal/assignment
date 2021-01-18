const {
    body,
} = require('express-validator');

exports.userProvider = function () {
    return [
        body("mobile", " mobile is Required field and should be a valid mobile number!").exists().isMobilePhone().isLength({ min: 10 }),
    ]
};