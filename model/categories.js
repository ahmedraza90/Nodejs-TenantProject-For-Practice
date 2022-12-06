const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    id: {type: Number, unique: true},
    level: {type: Number, default: null},
    name: {type: String, default: null},
    position: {type: Number, default: null},
    parent_id: {type: Number, default: null},
}, {timestamps: true});

module.exports = mongoose.model("Categories", categoriesSchema);
