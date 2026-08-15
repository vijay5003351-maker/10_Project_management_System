const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    project_title: { type: String },
    project_members: { type: Object },
    project_date: { type: String },
    request_list: { type: Array },
});

module.exports = mongoose.model("projects", projectSchema);
