const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status: {
        type: String,
        default: "unpaid",
        enum: ["Invalid", "Cancelled", "Overdue","paid","unpaid","Refund"],

    },
    type: {
        type: String,
        required:true,
        enum: ["Rent", "Maintenance","IdVerification","Late payment fees","Deposit"],

    },
    amount: {
        type: Number,
        required:true
    },
    Payee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contacts",
        required: true,
    },
    description: {
        type: String,
        default:null
    },
    dueOn: {type:Date, default: null }, //'2002-12-09'
    lease: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leases",
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model("subscription", applicationSchema);