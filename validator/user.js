const Joi = require('joi');

module.exports.socialLogin = async (req, res, next) => {
    let schema = Joi.object().keys({
        firstName: Joi.string().required().label('firstName'),
        lastName: Joi.string().optional().allow(null).empty(''),
        email: Joi.string().optional().allow(null).empty(''),
        socialId: Joi.string().required().label('socialId'),
        gender: Joi.string().optional().allow(null).empty(''),
        phoneNumber: Joi.string().optional().allow(null).empty(''),
        image: Joi.string().optional().allow(null).empty(''),
    });

    const { error } = Joi.validate(req.body, schema);

    if (error) {
        let field = error.details[0].path[0];
        return res.status(400).json({ message: `${field} is missing or not a proper value` });
    } else {
        next();
    }
}