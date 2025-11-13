
const mongoose = require('mongoose');
const { _collectionName } = require('../../utils');

const activitySchema = new mongoose.Schema({
    event: { type: String, required: true },
    userId: { type: Number, required: false },
    assetId: { type: Number, required: false },
    meta: { type: mongoose.Schema.Types.Mixed },
    status: { type: String, default: 'ok' },
    retries: { type: Number, default: 0 },
}, {
    timestamps: true,
});

const ActivityLog = mongoose.model(_collectionName.activitylogs, activitySchema); 

module.exports = ActivityLog ; 
