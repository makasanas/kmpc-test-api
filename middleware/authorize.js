const jwt = require('jsonwebtoken');
const userModel = require('./../model/user');

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const decoded = await jwt.verify(req.headers.authorization, process.env.SECRET_TOKEN);
      const user = await userModel.findById(decoded.userId);
      if (user !== null) {
        req.decoded = user;
        next();
      } else {
        return res.status(404).json({ message: 'Requested user does not exists' });
      }
    } catch (error) {
      return res.status(403).json({ 'message': 'Authorization failed' });
    }
  } else {
    return res.status(403).json({ 'message': 'Invalid request' });
  }
}