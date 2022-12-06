const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    title: {type: String , required:true},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("issues", issueSchema);
