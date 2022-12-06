const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    stripe_planId: {
        type: String,
        ref: "Plans",
        required:true

    },
    subscriptionId:{
        type: String,
        required:true
    },
}, { timestamps: true });

module.exports = mongoose.model("subscription", subscriptionSchema);