const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    dateTime: {type: String, default: null , required: true},
    taskDetail: {type: String, default: null,required: true,},
    isRecurring: { type: Boolean, default: false },
    recurringFrequency: {type: String, default: null },
}, {timestamps: true});

module.exports = mongoose.model("tasks", taskSchema);