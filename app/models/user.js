const mongoose = require('mongoose');

const InviteRequest = new mongoose.Schema({
    teamID: { type: mongoose.Types.ObjectId, required: true },
    caller: { type: String, required: true, trim: true },
    requestDate: { type: Date, default: new Date() },
    status: { type: String, default: "pending" }, // accepted , rejected , pending
})

const UserSchema = new mongoose.Schema({
    profile_image: { type: String, default: "" },
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    roles: { type: [String], default: ["User"] },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    teams: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: "" },
    inviteRequest: { type: [InviteRequest] }
}, { timestamps: true });
const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel };