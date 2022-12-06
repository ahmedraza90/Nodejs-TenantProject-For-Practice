const mongoose = require("mongoose");

const leaseSchema = new mongoose.Schema({

    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "properties",
        required: true,
    },
    tenant: {
        type: Array,
        required: true,
    },
    rentSetting: { type: Object, default: null },
    depositInfo: { type: Object, default: null },
    insurance: { type: Object, default: null },
    leaseMonthToMonth: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    leaseDocuments: { type: Array, default: null }
},
    { timestamps: true }
);


module.exports = mongoose.model("Leases", leaseSchema);