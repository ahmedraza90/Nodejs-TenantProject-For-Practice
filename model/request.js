const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    type: {type: String,enum: ["basic", "advance"], default: null, required: true},
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
    issueTitle: {type: String, default: null, required: true},
    issueDetail: {type: String, default: null, required: true},
    requestPriority: {type: String, default: null},
    issuePhoto: { type: Array, default: null },
    isShare: {type: Boolean},
    authorizationCode: {type: String,default: null},
    availableDates: {type: [Object]},
    pets: {type: Object, default: null, required: true},
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "properties",
        required: true,
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts",
        required: true,
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts",
        required: true,
    },
    // timeframe: {type: Object, default: null, required: true},
    materials: {type: [Object]},

    status: {type: String, default: null, enum: ["new","inProgress", "inReview","resolved","cancel","archive"], required: true },
},{ timestamps: true });

module.exports = mongoose.model("requests", requestSchema);
