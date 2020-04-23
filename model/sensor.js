const sensorSchema = require('./../schema/sensor');
const groupSchema = require('./../schema/group');
const { ObjectId } = require('mongodb');

module.exports.createGroup = async (group) => {
    try {
        const newGroup = new groupSchema(group);
        return await newGroup.save();
    } catch (error) {
        throw error;
    }
}

module.exports.updateGroup = async (query, update, option) => {
    try {
        return await groupSchema.findOneAndUpdate(query, update, option);
    } catch (error) {
        throw error;
    }
}

module.exports.deleteGroup = async (groupId) => {
    try {
        return await groupSchema.findOneAndRemove({ _id: groupId });
    } catch (error) {
        throw error;
    }
}

module.exports.getGroups = async (userId) => {
    try {
        return await groupSchema.find({ userId, 'parentGroup': { $eq: null }});
    } catch (error) {
        throw error;
    }
}

module.exports.getAllGroups = async (userId) => {
    try {
        return await groupSchema.aggregate([
            {
                $match: {
                    userId: userId,
                    parentGroup: { $eq: null }
                }
            }, {
                $graphLookup: {
                    from: 'groups', 
                    startWith: '$_id',
                    connectFromField: '_id', 
                    connectToField: 'parentGroup', 
                    as: 'sub-group', 
                    depthField: 'steps',
                }
            }, {
                $project: {
                    _id: 1,
                    shortTitle: 1,
                    title: 1,
                    wifi: 1,
                    groupCost: 1,
                    sumCost: { $sum: [ "$groupCost", { $sum: '$sub-group.groupCost' } ] },
                    amountSensors: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'sub-group': 1
                }
            }, {
                $graphLookup: {
                    from: 'sensors',
                    startWith: '$sub-group._id',
                    connectFromField: 'sub-group._id',
                    connectToField: 'parentGroup',
                    as: 'sensors',
                    depthField: 'depth',
                }
            }, {
                $project: {
                    _id: 1,
                    shortTitle: 1,
                    title: 1,
                    wifi: 1,
                    groupCost: 1,
                    sumCost: { $sum: [ "$sumCost", { $sum: '$sensors.sensorCost' } ] },
                    sumCoast: 1,
                    amountSensors: { '$size': '$sensors' },
                    createdAt: 1,
                    updatedAt: 1,
                }
            },
            {
                $lookup:
                  {
                    from: 'sensors',
                    localField:'_id',
                    foreignField:'parentGroup',
                    as:'groupSensors'
                  }
             },
             {
                $project: {
                    _id: 1,
                    shortTitle: 1,
                    title: 1,
                    wifi: 1,
                    groupCost: 1,
                    sumCost:  { $sum: [ "$sumCost", { $sum: '$groupSensors.sensorCost' } ] },
                    amountSensors: { $sum: [ "$amountSensors", { $sum: { '$size': '$groupSensors' } } ] },
                    createdAt: 1,
                    updatedAt: 1,
                    // 'sub-group': 1,
                    // 'groupSensors':1,
                }
            }
        ]).exec();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getGroupSubGroup = async (userId, groupId) => {
    try {
        return await groupSchema.aggregate([
            {
                $match: {
                    userId: userId,
                    parentGroup : ObjectId(groupId)
                }
            },
            {
                $project: {
                    _id: 1,
                    shortTitle: 1,
                    title: 1,
                    wifi: 1,
                    groupCost: 1,
                    sumCost: { $sum: [ "$groupCost", { $sum: '$sub-group.groupCost' } ] },
                    amountSensors: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'sub-group': 1
                }
            },
            {
                $graphLookup: {
                    from: 'groups', 
                    startWith: '$_id',
                    connectFromField: '_id', 
                    connectToField: 'parentGroup', 
                    as: 'sub-group', 
                    depthField: 'steps',
                }
            }, 
            {
                $project: {
                    _id: 1,
                    shortTitle: 1,
                    title: 1,
                    wifi: 1,
                    groupCost: 1,
                    sumCost: { $sum: [ "$groupCost", { $sum: '$sub-group.groupCost' } ] },
                    amountSensors: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'sub-group': 1
                }
            }
            , {
                $graphLookup: {
                    from: 'sensors',
                    startWith: '$sub-group._id',
                    connectFromField: 'sub-group._id',
                    connectToField: 'parentGroup',
                    as: 'sensors',
                    depthField: 'depth',
                }
            }, {
                $project: {
                    _id: 1,
                    shortTitle: 1,
                    title: 1,
                    wifi: 1,
                    groupCost: 1,
                    sumCost: { $sum: [ "$sumCost", { $sum: '$sensors.sensorCost' } ] },
                    amountSensors: { '$size': '$sensors' },
                    createdAt: 1,
                    updatedAt: 1,
                    'sub-group': 1,
                }
            },
            {
                $lookup:
                  {
                    from: 'sensors',
                    localField:'_id',
                    foreignField:'parentGroup',
                    as:'groupSensors'
                  }
             },
             {
                $project: {
                    _id: 1,
                    shortTitle: 1,
                    title: 1,
                    wifi: 1,
                    groupCost: 1,
                    sumCost:  { $sum: [ "$sumCost", { $sum: '$groupSensors.sensorCost' } ] },
                    amountSensors: { $sum: [ "$amountSensors", { $sum: { '$size': '$groupSensors' } } ] },
                    createdAt: 1,
                    updatedAt: 1,
                   // 'sub-group': 1,
                   // 'groupSensors':1,
                }
            },
        ]).exec();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports.getGroupsByGroupId = async (groupId) => {
    try {
        return await groupSchema.findOne({ _id: groupId });
    } catch (error) {
        throw error;
    }
}

module.exports.getSensorsByGroupId = async (groupId) => {
    try {
        return await sensorSchema.find({ parentGroup: groupId });
    } catch (error) {
        throw error;
    }
}

module.exports.createSensor = async (sensor) => {
    try {
        const newSensor = new sensorSchema(sensor);
        return await newSensor.save();
    } catch (error) {
        throw error;
    }
}

module.exports.updateSensor = async (query, update, option) => {
    try {
        return await sensorSchema.findOneAndUpdate(query, update, option);
    } catch (error) {
        throw error;
    }
}

module.exports.deleteSensor = async (sensorId) => {
    try {
        return await sensorSchema.findOneAndRemove({ _id: sensorId });
    } catch (error) {
        throw error;
    }
}

module.exports.getSensorById = async (sensorId) => {
    try {
        return await sensorSchema.findOne({ _id: sensorId });
    } catch (error) {
        throw error;
    }
}

module.exports.searchSensor = async (mac, title) => {
    try {
        return await sensorSchema.find({ $or: [ { 'mac': { $regex: mac, $options: '$i' }}, { title: { $regex: title, $options: '$i' }}] });
    } catch (error) {
        throw error;
    }
}