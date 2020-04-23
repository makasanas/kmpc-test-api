const userSchema = require('./../schema/user');

module.exports.findById = async (userId) => {
    try {
        return await userSchema.findOne({ _id: userId }).exec();
    } catch (error) {
        throw error;
    }
}

module.exports.findBySocialId = async (socialId) => {
    try {
        return await userSchema.find({ socialId }).exec();
    } catch (error) {
        throw error;
    }
}

module.exports.createUser = async (user) => {
    try {
        const newUser = new userSchema(user);
        return await newUser.save();
    } catch (error) {
        throw error;
    }
}

module.exports.updateUser = async (query, update, option) => {
    try {
        return await userSchema.findOneAndUpdate(query, update, option);
    } catch (error) {
        throw error;
    }
}