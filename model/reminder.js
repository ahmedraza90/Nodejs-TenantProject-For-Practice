const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    categoryId: {
        type: String, default: null, required: true
    },
    subCategoryId: {
        type: String, default: null, required: true
    },
    issueId: {
        type: String, default: null, required: true
    },
    subIssueId: {
        type: String, default: null, required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // title: {type: String, default: null, required: true},
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    priority: {type: String},
    nextService: {type: String, default: null , required: true},
    schedule: {type: String, default: null , required: true},
    daysBefore: {type: String, default: null},
    detail: {type: String, default: null},
}, {timestamps: true});

module.exports = mongoose.model("reminders", reminderSchema);