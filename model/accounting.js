const mongoose = require("mongoose");

const accountingSchema = new mongoose.Schema({
    categoryId: {
        type: String,
        required: true,
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    dueOn: {type:Date, default: null }, //'2002-12-09'
    amount: {type: Number, required: true},
    payee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts",
        required: true,
    },
    lease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leases",
        default: null,
    },
    details: {type: String, required: true},
    files: { type: Array, default: null },
    type: {type: String, enum: ["property", "general"],required: true},
    accountingType: {type: String, enum: ["normal", "recurring"],required: true},
    transactionType: {type: String, enum: ["income", "expense"],required: true},
    startDate: {type: Date, default: null },
    endDate: {type: Date, default: null },
    frequency: {type: String, default: null },
}, {timestamps: true});

module.exports = mongoose.model("Accountings", accountingSchema);