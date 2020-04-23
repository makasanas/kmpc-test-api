const express = require('express');
const router = express.Router();

const userController = require('./../controller/user');

const authorization = require('./../middleware/authorize');

const validate = require('./../validator/user');

/* Check ping */
router.get('/ping', function(req, res) {
  res.status(200).json({success: true});
});

/* Social login */
router.post('/login', validate.socialLogin, userController.socialLogin);

module.exports = router;
