const mongoose = require('mongoose')
const dailyData = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now(),
        unique: true
    },
    name:{
        type:String
    },
    visited: {
        type: Boolean,
        default: true,
    },
    vehicle_number: {
        type: String,
    },
    zone_id: {
        type: String,
    },
    contact_number: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});
module.exports = dailyData;