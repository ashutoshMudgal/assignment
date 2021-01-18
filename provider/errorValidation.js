const {
    validationResult
} = require('express-validator')

exports.validate = function (req, res, next) {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg)
        res.status(400).json(errors.array()[0].msg)
    } else {
        next()
    }
}