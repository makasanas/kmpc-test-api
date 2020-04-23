const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const groupSchema = new Schema({
    shortTitle: { type: String },
    title: { type: String },
    wifi: { type: String },
    groupCost: { type: Schema.Types.Double },
    parentGroup: { type: ObjectId, ref: 'Group' },
    userId: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;