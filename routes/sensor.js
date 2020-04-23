const express = require('express');
const router = express.Router();

const sensorController = require('./../controller/sensor');

const authorization = require('./../middleware/authorize');

const validator = require('./../validator/sensor');

/* Check ping */
router.get('/ping', function(req, res) {
    res.status(200).json({success: true});
  });

router.post('/group', validator.createGroup, authorization, sensorController.createGroup);

router.put('/group/:groupId', validator.updateGroup, authorization, sensorController.updateGroup);

router.delete('/group/:groupId', authorization, sensorController.deleteGroup);

router.get('/groups', authorization, sensorController.getGroups);

router.get('/group/:groupId', authorization, sensorController.getGroupById);

router.get('/sub-groupAndSensor/:groupId', authorization, sensorController.getSubGroupAndSensor);

router.post('/', validator.createSensor, authorization, sensorController.createSensor);

router.put('/:sensorId', validator.updateSensor, authorization, sensorController.updateSensor);

router.delete('/:sensorId', authorization, sensorController.deleteSesnor);

router.get('/:sensorId', authorization, sensorController.getSensorById);

router.post('/search', validator.search, authorization, sensorController.searchSensor);

module.exports = router;