const userModel = require('./../model/user');
const jwt = require('jsonwebtoken');

module.exports.socialLogin = async (req, res) => {
    try {
        const user = await userModel.findBySocialId(req.body.socialId);
        if (user.length) {
            const query = {
                socialId: req.body.socialId
            };
            const update = {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    image: req.body.image,
                    updatedAt: new Date()
                }
            };
            const option = {
                new: true
            };
            const updatedUser = await userModel.updateUser(query, JSON.parse(JSON.stringify(update)), option);
            const token = jwt.sign({userId: updatedUser._id}, process.env.SECRET_TOKEN);
            return res.status(200).json({ 'message': "User updated" , data: updatedUser, token });
        } else {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                socialId: req.body.socialId,
                phoneNumber: req.body.phoneNumber,
                gender: req.body.gender,
                image: req.body.image,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            const createdUser = await userModel.createUser(user);
            const token = jwt.sign({userId: createdUser._id}, process.env.SECRET_TOKEN);
            return res.status(200).json({ 'message': "User created", data: createdUser, token });
        }
    } catch (error) {
        return res.status(500).json({message: 'Error in social login'});
    }
}
