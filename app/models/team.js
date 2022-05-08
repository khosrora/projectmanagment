const mongoose = require('mongoose');
const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String },
    users: { type: [mongoose.Types.ObjectId], default: [] },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
const TeamModel = mongoose.model("Team", TeamSchema);
module.exports = { TeamModel };