const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
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
    middleName: {
        type: String, default: null, trim: true,
        min: 3,
        max: 20,
    },
    displayAsCompany: { type: Boolean, default: false },
    companyName: { type: String, default: null },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    ssn: { type: Number, default: null },
    gender: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ["New", "Pending", "Approved", "Declined", "Archived"],
        default: "New",
    },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    driverLicense: { type: String, default: null },
    driverLicenseState: { type: String, default: null },
    moveInDate: { type: Date, default: null },
    bio: { type: String, default: null },
    vehicle: { type: [Object], default: null },
    pets: { type: [Object], default: null },
    additionalOccupants: { type: [Object], default: null },
    rentalHistory: { type: [Object], default: null },
    employmentHistory: { type: [Object], default: null },
    additionalIncomes: { type: [Object], default: null },
    emergencyContacts: { type: [Object], default: null },
    references: { type: [Object], default: null },
    applicantPhoto: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("applications", applicationSchema);