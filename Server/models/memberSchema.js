const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    First_Name: {
        type: String,
        required: true,
    },
    Last_Name: {
        type: String,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
        minLength: 6,
    },
    Age: {
        type: String,
        required: true,
    },
    Phone_no: {
        type: Number,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Role: {
        type: String,
    },
    Skill: {
        type: String,
    },
    Work: {
        type: Object,
        required: true,
    },
});

module.exports = new mongoose.model("members", memberSchema);
