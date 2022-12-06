const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    name: { type: String, enum: ["Free", "Starter","Growth"],required: true},
    price: { type: Number,  required: true },
    stripe_planId: { type: String, default: null },
    billingPeriod:{type:String, default: null},
    stripe_priceId:{type:String,default: null}
}, { timestamps: true });

module.exports = mongoose.model("Plans", planSchema);