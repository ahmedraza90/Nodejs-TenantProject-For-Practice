const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    name: { type: String, default: null, required: true },
    builtYear: { type: Number, default: null },
    MIsNumber: { type: Number, default: null },
    currency: { type: String, default: null, required: true },
    streetAddress: { type: String, default: null, required: true },
    city: { type: String, default: null, required: true },
    state: { type: String, default: null, required: true },
    zip: { type: Number, default: null, required: true },
    country: { type: String, default: null, required: true },
    propertyType: { type: String, default: null, required: true },
    propertyPhoto: { type: String, default: null },
    // propertyImageGallery: { type: Array, default: null },
    beds: { type: String, default: null },
    baths: { type: String, default: null },
    size: { type: String, default: null },
    rent: { type: String, default: null },
    unitInfo: {type: Object,default: null},
    deposit: { type: String, default: null },
    parking: { type: String, default: null },
    laundry: { type: String, default: null },
    airConditioning: { type: String, default: null },
    propertyFeatures: { type: Array, default: null },
    propertyAmenities: { type: Array, default: null },
    propertyAttachments: { type: Array, default: null },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["listed","Unlisted"],
        default: "Unlisted"
    }
}, { timestamps: true });

module.exports = mongoose.model("properties", propertySchema);
