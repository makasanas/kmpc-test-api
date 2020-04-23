const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const sensorSchema = new Schema({
    mac: { type: String },
    title: { type: String },
    assignment: { type: String },
    version: { type: String },
    shipped: { type: Date },
    installed: { type: Date },
    sensorCost: { type: Schema.Types.Double },
    lastSeen: { type: Date },
    parentGroup: { type: ObjectId, ref: 'Group' },
    userId: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});

const Sensor = mongoose.model('Sensor', sensorSchema);
module.exports = Sensor;