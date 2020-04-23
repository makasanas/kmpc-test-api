const sensorModel = require('./../model/sensor');

module.exports.createGroup = async (req, res) => {
    try {
        const group = {
            shortTitle: req.body.shortTitle,
            title: req.body.title,
            wifi: req.body.wifi,
            groupCost: req.body.groupCost,
            parentGroup: req.body.parentGroup,
            userId: req.decoded._id,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const createdGroup = await sensorModel.createGroup(JSON.parse(JSON.stringify(group)));
        return res.status(200).json({ 'message': "Group created", data: createdGroup });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error in create group' });
    }
}

module.exports.updateGroup = async (req, res) => {
    try {
        console.log(req.params.groupId);
        const group = await sensorModel.getGroupsByGroupId(req.params.groupId);
        if (group !== null) {
            if (group.userId.toString() === req.decoded._id.toString()) {
                const query = {
                    _id: req.params.groupId
                };
                const update = {
                    $set: {
                        shortTitle: req.body.shortTitle,
                        title: req.body.title,
                        wifi: req.body.wifi,
                        groupCost: req.body.groupCost,
                        parentGroup: req.body.parentGroup,
                        updatedAt: new Date()
                    }
                };
                const option = {
                    new: true
                };
                const updatedGroup = await sensorModel.updateGroup(query, JSON.parse(JSON.stringify(update)), option);
                return res.status(200).json({ 'message': "Group updated", data: updatedGroup });
            } else {
                return res.status(200).json({ 'message': "You doesn't have access" });
            }
        } else {
            return res.status(200).json({ 'message': "Group does not exists" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error in update' });
    }
}

module.exports.getGroups = async (req, res) => {
    try {
        const groups = await sensorModel.getAllGroups(req.decoded._id);
        return res.status(200).json({ 'message': "Fatched groups", groups: groups });
    } catch (error) {
        return res.status(500).json({ message: 'Error in fetch groups' });
    }
}

module.exports.getGroupById = async (req, res) => {
    try {
        console.log(req.decoded._id + " " + req.params.groupId);
        const group = await sensorModel.getGroupSubGroup(req.decoded._id, req.params.groupId);
        const sensor = await sensorModel.getSensorsByGroupId(req.params.groupId);
        return res.status(200).json({ 'message': "Fatched group", groups: group, sensors:sensor });
    } catch (error) {
        return res.status(500).json({ message: 'Error in fetch group' });
    }
}

module.exports.getSubGroupAndSensor = async (req, res) => {
    try {
        const response = await Promise.all([sensorModel.getSubGroupsByGroupId(req.params.groupId), sensorModel.getSensorsByGroupId(req.params.groupId)]);
        return res.status(200).json({ 'message': "Fatched sub-groups and sensors", 'sub-groups': response[0], sensors: response[1] });
    } catch(error) {
        return res.status(500).json({ message: 'Error in fetch sub-groups and sensors' });
    }
}

module.exports.deleteGroup = async (req, res) => {
    try {
        const deletedGroup = await sensorModel.deleteGroup(req.params.groupId);
        return res.status(200).json({ 'message': "Group deleted", data: deletedGroup });
    } catch (error) {
        return res.status(500).json({ message: 'Error in delete group' });
    }
}

module.exports.createSensor = async (req, res) => {
    try {
        const sensor = {
            mac: req.body.mac,
            title: req.body.title,
            assignment: req.body.assignment,
            version: req.body.version,
            shipped: req.body.shipped,
            installed: req.body.installed,
            sensorCost: req.body.sensorCost,
            lastSeen: req.body.lastSeen,
            parentGroup: req.body.parentGroup,
            userId: req.decoded._id,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const createdSensor = await sensorModel.createSensor(JSON.parse(JSON.stringify(sensor)));
        return res.status(200).json({ 'message': "Sensor created", data: createdSensor });
    } catch (error) {
        return res.status(500).json({ message: 'Error in create sensor' });
    }
}

module.exports.updateSensor = async (req, res) => {
    try {
        const sensor = await sensorModel.getSensorById(req.params.sensorId);
        if (sensor !== null) {
            if (sensor.userId.toString() === req.decoded._id.toString()) {
                const query = {
                    _id: req.params.sensorId
                };
                const update = {
                    $set: {
                        mac: req.body.mac,
                        title: req.body.title,
                        assignment: req.body.assignment,
                        version: req.body.version,
                        shipped: req.body.shipped,
                        installed: req.body.installed,
                        sensorCost: req.body.sensorCost,
                        lastSeen: req.body.lastSeen,
                        updatedAt: new Date()
                    }
                };
                const option = {
                    new: true
                };
                const updatedSensor = await sensorModel.updateSensor(query, JSON.parse(JSON.stringify(update)), option);
                return res.status(200).json({ 'message': "Sensor updated", data: updatedSensor });
            } else {
                return res.status(200).json({ 'message': "You doesn't have access" });
            }
        } else {
            return res.status(200).json({ 'message': "Sensor does not exists" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error in update sensor' });
    }
}

module.exports.deleteSesnor = async (req, res) => {
    try {
        const deletedSensor = await sensorModel.deleteSensor(req.params.sensorId);
        return res.status(200).json({ 'message': "Sensor deleted", data: deletedSensor });
    } catch (error) {
        return res.status(500).json({ message: 'Error in delete sensor' });
    }
}

module.exports.getSensorById = async (req, res) => {
    try {
        const sensor = await sensorModel.getSensorById(req.params.sensorId);
        return res.status(200).json({ 'message': "Fatched sensor", data: sensor });
    } catch (error) {
        return res.status(500).json({ message: 'Error in fetch sensor' });
    }
}

module.exports.searchSensor = async (req, res) => {
    try {
        const sensor = await sensorModel.searchSensor(req.body.mac, req.body.title);
        return res.status(200).json({ 'message': "Found sensor", data: sensor });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error in search sensor' });
    }
}