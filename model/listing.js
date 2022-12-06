const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    marketingDescription: {
        type: String,
        default: null
    },
    leaseDetail: {type: Object,default: null},
    allowPets: {
        type: Boolean
    },
    petsDetail: {type: Object,default: null},
    phoneNumber: {type: String,default: null}
},
{ timestamps: true }
);


module.exports = mongoose.model("Lists", listSchema);