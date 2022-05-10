const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String },
    image: { type: String, default: "/defaults/default.png" },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    team: { type: mongoose.Types.ObjectId, ref: "User" },
    Private: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
}, { timestamps: true });
const ProjectModel = mongoose.model("Project", ProjectSchema);
module.exports = { ProjectModel };