const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: null,
        trim: true,
        min: 3,
        max: 20,
    },
    lastName: {
        type: String,
        default: null,
        trim: true,
        min: 3,
        max: 20,
    },
    role: {
        type: String,
        enum: ["tenant", "professional", "pro"],
        required: true,
        // default: "user",
    },
    dateOfBirth: {
        type: String,
        default: null,
    },
    age: {
        type: Number,
        default: null,
    },
    gender: {
        type: String,
        // enum: ["male","female","other"],
        default: null,
    },
    email: { type: String, default: null },
    phone: { type: String, default: null },
    address: { type: [Object], default: null },
    streetAddress: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    zip: { type: String, default: null },
    country: { type: String, default: null },
    companyName: { type: String, default: null },
    companyWebsite: { type: String, default: null },
    displayAsCompany: { type: Boolean, default: null },
    emergencyContact: { type: [Object], default: null },
    pets: { type: [Object], default: null },
    vehicle: { type: [Object], default: null },
    notes: { type: [Object], default: null },
    documents: { type: Array, default: null },
    photo: { type: String, default: null },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    categoryId: {
        type: String,
        default: null
    },
    subCategoryId: {
        type: String,
        default: null
    },
},
    { timestamps: true }
);


module.exports = mongoose.model("Contacts", contactSchema);