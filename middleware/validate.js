const validator = require('../helpers/validate');

const validatePillow = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        type: 'required|string',
        size: 'required|string',
        color: 'required|string',
        // price: 'required|string',
        description: 'required|string',
        numInStock: 'min:0'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const validateUser = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        username: 'required|string',
        email: 'required|email',
        birthday: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    validatePillow,
    validateUser
}