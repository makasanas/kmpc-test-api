const Joi = require('joi');

module.exports.createGroup = async (req, res, next) => {
    let schema = Joi.object().keys({
        shortTitle: Joi.string().required().label('shortTitle'),
        title: Joi.string().required().label('title'),
        wifi: Joi.string().required().label('wifi'),
        parentGroup: Joi.string().optional().allow(null).empty(''),
    });

    const { error } = Joi.validate(req.body, schema, { allowUnknown: true});

    if (error) {
        let field = error.details[0].path[0];
        return res.status(400).json({ message: `${field} is missing or not a proper value` });
    } else {
        next();
    }
}

module.exports.updateGroup = async (req, res, next) => {
    let schema = Joi.object().keys({
        shortTitle: Joi.string().optional().allow(null).empty(''),
        title: Joi.string().optional().allow(null).empty(''),
        wifi: Joi.string().optional().allow(null).empty(''),
        parentGroup: Joi.string().optional().allow(null).empty(''),
    });

    const { error } = Joi.validate(req.body, schema, { allowUnknown: true});

    if (error) {
        let field = error.details[0].path[0];
        return res.status(400).json({ message: `${field} is missing or not a proper value` });
    } else {
        next();
    }
}

module.exports.createSensor = async (req, res, next) => {
    let schema = Joi.object().keys({
        mac: Joi.string().required().label('shortTitle'),
        title: Joi.string().required().label('title'),
        version: Joi.string().required().label('wifi'),
        shipped: Joi.date().optional().allow(null).empty(''),
        installed: Joi.date().optional().allow(null).empty(''),
        lastSeen: Joi.date().optional().allow(null).empty(''),
        sensorCost: Joi.number().required().label('sensorCost'),
        parentGroup: Joi.string().required().label('parentGroup')
    });

    const { error } = Joi.validate(req.body, schema, { allowUnknown: true});

    if (error) {
        let field = error.details[0].path[0];
        return res.status(400).json({ message: `${field} is missing or not a proper value` });
    } else {
        next();
    }
}

module.exports.updateSensor = async (req, res, next) => {
    let schema = Joi.object().keys({
        mac: Joi.string().optional().allow(null).empty(''),
        title: Joi.string().optional().allow(null).empty(''),
        version: Joi.string().optional().allow(null).empty(''),
        shipped: Joi.date().optional().allow(null).empty(''),
        installed: Joi.date().optional().allow(null).empty(''),
        lastSeen: Joi.date().optional().allow(null).empty(''),
        sensorCost: Joi.number().optional().allow(null).empty(''),
        parentGroup: Joi.string().optional().allow(null).empty('')
    });

    const { error } = Joi.validate(req.body, schema, { allowUnknown: true});

    if (error) {
        let field = error.details[0].path[0];
        return res.status(400).json({ message: `${field} is missing or not a proper value` });
    } else {
        next();
    }
}

module.exports.search = async (req, res, next) => {
    let schema = Joi.object().keys({
        mac: Joi.string().required().allow('').label('shortTitle'),
        title: Joi.string().required().allow('').label('title')
    });

    const { error } = Joi.validate(req.body, schema, { allowUnknown: true});

    if (error) {
        let field = error.details[0].path[0];
        return res.status(400).json({ message: `${field} is missing or not a proper value` });
    } else {
        next();
    }
}