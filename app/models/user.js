const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    profile_image: { type: String, default: "" },
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    roles: { type: [String], default: ["User"] },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: "" },
}, { timestamps: true });
const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel };